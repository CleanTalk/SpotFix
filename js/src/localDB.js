const SPOTFIX_INDEXED_DB_NAME = 'spotfix-localDB';
const spotfixIndexedDBVersion = 2;

const SPOTFIX_TABLE_USERS = 'users';
const SPOTFIX_TABLE_TASKS = 'tasks';
const SPOTFIX_TABLE_COMMENTS = 'comments';
const SPOTFIX_TABLE_ATTACHMENT = 'attachment';

const LOCAL_DATA_BASE_TABLE = [
    { name: SPOTFIX_TABLE_USERS, keyPath: 'user_id' },
    { name: SPOTFIX_TABLE_TASKS, keyPath: 'taskId' },
    { name: SPOTFIX_TABLE_COMMENTS, keyPath: 'commentId' },
    { name: SPOTFIX_TABLE_ATTACHMENT, keyPath: 'attachmentId' },
];

const SPOTFIX_LAST_DB_KEY = 'spotfix_last_db_key';

const SPOTFIX_DB_OPEN_TIMEOUT = 3000;
const SPOTFIX_DB_RETRY_DELAY = 30000;

let dbPromise = null;
let dbPromiseKey = null;
let dbFailedAt = 0;
const spotfixMemoryTables = new Map();

function getTableKeyPath(table) {
    return LOCAL_DATA_BASE_TABLE.find((item) => item.name === table)?.keyPath;
}

function getRowsWithKey(table, data) {
    const keyPath = getTableKeyPath(table);
    const rows = Array.isArray(data) ? data : [data];
    return rows.filter((row) => row && row[keyPath] !== undefined && row[keyPath] !== null);
}

function getCurrentMemoryTables() {
    const dbKey = getSpotfixDBKey();
    [...spotfixMemoryTables.keys()]
        .filter((key) => key !== dbKey)
        .forEach((key) => spotfixMemoryTables.delete(key));
    if (!spotfixMemoryTables.has(dbKey)) {
        spotfixMemoryTables.set(dbKey, new Map());
    }
    return spotfixMemoryTables.get(dbKey);
}

function writeMemoryTable(dbKey, table, rows, isReplace) {
    if (dbKey !== getSpotfixDBKey()) {
        return;
    }
    const tables = getCurrentMemoryTables();
    const keyPath = getTableKeyPath(table);
    const memoryTable = (!isReplace && tables.get(table)) || new Map();
    rows.forEach((row) => memoryTable.set(row[keyPath], row));
    tables.set(table, memoryTable);
}

function getSpotfixDBKey() {
    const sessionId = spotfixStorage.getItem('spotfix_session_id');
    const projectToken = spotfixStorage.getItem('spotfix_project_token');

    if (sessionId) return `session:${sessionId}`;
    if (projectToken) return `project:${projectToken}`;

    return null;
}

function getDBNameByKey(dbKey) {
    return `${SPOTFIX_INDEXED_DB_NAME}_${dbKey}`;
}

function openIndexedDB(name, version) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('IndexedDB open timeout')), SPOTFIX_DB_OPEN_TIMEOUT);
        const request = indexedDB.open(name, version);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            LOCAL_DATA_BASE_TABLE.forEach((item) => {
                if (!db.objectStoreNames.contains(item.name)) {
                    const store = db.createObjectStore(item.name, {
                        keyPath: item.keyPath,
                    });

                    if (item.name === SPOTFIX_TABLE_COMMENTS) {
                        store.createIndex('taskId', 'taskId');
                    }
                    if (item.name === SPOTFIX_TABLE_TASKS) {
                        store.createIndex('userId', 'userId');
                    }
                }
            });
        };

        request.onsuccess = () => {
            clearTimeout(timer);
            const db = request.result;
            db.onclose = () => {
                dbPromise = null;
            };
            db.onversionchange = () => {
                db.close();
                dbPromise = null;
            };
            resolve(db);
        };
        request.onerror = () => {
            clearTimeout(timer);
            reject(request.error);
        };
    });
}

function getDB() {
    const dbKey = getSpotfixDBKey();
    if (dbPromise && dbPromiseKey !== dbKey) {
        dbPromise = null;
    }

    if (!dbPromise) {
        if (!dbKey) return null;

        if (Date.now() - dbFailedAt < SPOTFIX_DB_RETRY_DELAY) {
            return Promise.reject(new Error('IndexedDB is unavailable'));
        }

        dbPromiseKey = dbKey;
        dbPromise = openIndexedDB(
            getDBNameByKey(dbKey),
            spotfixIndexedDBVersion
        ).catch((error) => {
            dbPromise = null;
            dbFailedAt = Date.now();
            throw error;
        });
    }
    return dbPromise;
}

async function deleteDBByKey(dbKey) {
    return new Promise((resolve) => {
        const req = indexedDB.deleteDatabase(getDBNameByKey(dbKey));
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
        req.onblocked = () => resolve();
    });
}

const spotfixIndexedDB = {
    init: async () => {
        const currentKey = getSpotfixDBKey();

        if (!currentKey) {
            return { needInit: false };
        }

        const lastKey = spotfixStorage.getItem(SPOTFIX_LAST_DB_KEY);

        try {
            if (lastKey && lastKey !== currentKey) {
                await deleteDBByKey(lastKey);
            }

            spotfixStorage.setItem(SPOTFIX_LAST_DB_KEY, currentKey);

            dbPromise = null;
            await getDB();
        } catch (error) {
            console.error('SpotFix IndexedDB init error:', error);
        }

        return { needInit: true };
    },

    withStore: async (table, mode = 'readwrite', callback, isRetry = false, dbKey = getSpotfixDBKey()) => {
        const db = await getDB();
        if (dbKey !== getSpotfixDBKey()) {
            throw new Error('The session was changed during the database operation');
        }
        if (!db) return;

        let tx;
        try {
            tx = db.transaction(table, mode);
        } catch (error) {
            dbPromise = null;
            if (isRetry) throw error;
            return spotfixIndexedDB.withStore(table, mode, callback, true, dbKey);
        }

        return new Promise((resolve, reject) => {
            const store = tx.objectStore(table);

            const result = callback(store);
            Promise.resolve(result).catch(() => {});

            tx.oncomplete = () => resolve(result);
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted'));
        });
    },

    put: async (table, data) => {
        const dbKey = getSpotfixDBKey();
        const rows = getRowsWithKey(table, data);
        try {
            await spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
                rows.forEach((item) => store.put(item));
            });
            if (getCurrentMemoryTables().has(table)) {
                writeMemoryTable(dbKey, table, rows, false);
            }
        } catch (error) {
            console.error('SpotFix IndexedDB write error:', error);
            if (!getCurrentMemoryTables().has(table)) {
                writeMemoryTable(dbKey, table, await spotfixIndexedDB.getAll(table), false);
            }
            writeMemoryTable(dbKey, table, rows, false);
        }
    },

    delete: async (table, key) => {
        getCurrentMemoryTables().get(table)?.delete(key);
        try {
            await spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
                store.delete(key);
            });
        } catch (error) {
            console.error('SpotFix IndexedDB delete error:', error);
        }
    },

    clearTable: async (table) => {
        getCurrentMemoryTables().delete(table);
        try {
            await spotfixIndexedDB.withStore(table, 'readwrite', (store) =>
                store.clear()
            );
        } catch (error) {
            console.error('SpotFix IndexedDB clear error:', error);
        }
    },

    clearPut: async (table, data) => {
        const dbKey = getSpotfixDBKey();
        const rows = getRowsWithKey(table, data);
        try {
            await spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
                store.clear();
                rows.forEach((item) => store.put(item));
            });
            if (dbKey === getSpotfixDBKey()) {
                getCurrentMemoryTables().delete(table);
            }
        } catch (error) {
            console.error('SpotFix IndexedDB write error:', error);
            writeMemoryTable(dbKey, table, rows, true);
        }
    },

    getAll: async (table, indexName, value) => {
        const memoryTable = getCurrentMemoryTables().get(table);
        if (memoryTable) {
            const memoryRows = [...memoryTable.values()];
            return indexName && value !== undefined
                ? memoryRows.filter((row) => row[indexName] === value)
                : memoryRows;
        }

        try {
            const rows = await spotfixIndexedDB.withStore(table, 'readonly', (store) => {
                return new Promise((resolve, reject) => {
                    const req =
                        indexName && value !== undefined
                            ? store.index(indexName).getAll(value)
                            : store.getAll();

                    req.onsuccess = () => resolve(req.result);
                    req.onerror = () => reject(req.error);
                });
            });
            return rows || [];
        } catch (error) {
            console.error('SpotFix IndexedDB read error:', error);
            return [];
        }
    },

    getTable: async (table) => {
        if (!getSpotfixDBKey()) {
            return [];
        }
        return spotfixIndexedDB.getAll(table);
    },
};
