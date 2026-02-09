const SPOTFIX_INDEXED_DB_NAME = 'spotfix-localDB';
const spotfixIndexedDBVersion = 1;

export const SPOTFIX_TABLE_USERS = 'users';
export const SPOTFIX_TABLE_TASKS = 'tasks';
export const SPOTFIX_TABLE_COMMENTS = 'comments';

const LOCAL_DATA_BASE_TABLE = [
    { name: SPOTFIX_TABLE_USERS, keyPath: 'user_id' },
    { name: SPOTFIX_TABLE_TASKS, keyPath: 'taskId' },
    { name: SPOTFIX_TABLE_COMMENTS, keyPath: 'commentId' },
];

const SPOTFIX_LAST_DB_KEY = 'spotfix_last_db_key';

let dbPromise = null;

function getSpotfixDBKey() {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const projectToken = localStorage.getItem('spotfix_project_token');

    if (sessionId) return `session:${sessionId}`;
    if (projectToken) return `project:${projectToken}`;

    return null;
}

function getDBNameByKey(dbKey) {
    return `${SPOTFIX_INDEXED_DB_NAME}_${dbKey}`;
}

function openIndexedDB(name, version) {
    return new Promise((resolve, reject) => {
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

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getDB() {
    if (!dbPromise) {
        const dbKey = getSpotfixDBKey();
        if (!dbKey) return null;

        dbPromise = openIndexedDB(
            getDBNameByKey(dbKey),
            spotfixIndexedDBVersion
        );
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

export const spotfixIndexedDB = {
    init: async () => {
        const currentKey = getSpotfixDBKey();

        if (!currentKey) {
            return { needInit: false };
        }

        const lastKey = localStorage.getItem(SPOTFIX_LAST_DB_KEY);

        if (lastKey && lastKey !== currentKey) {
            await deleteDBByKey(lastKey);
        }

        localStorage.setItem(SPOTFIX_LAST_DB_KEY, currentKey);

        dbPromise = null;
        await getDB();

        return { needInit: true };
    },

    withStore: async (table, mode = 'readwrite', callback) => {
        const db = await getDB();
        if (!db) return;

        return new Promise((resolve, reject) => {
            const tx = db.transaction(table, mode);
            const store = tx.objectStore(table);

            const result = callback(store);

            tx.oncomplete = () => resolve(result);
            tx.onerror = () => reject(tx.error);
        });
    },

    put: async (table, data) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
            if (Array.isArray(data)) {
                data.forEach((item) => store.put(item));
            } else {
                store.put(data);
            }
        });
    },

    delete: async (table, key) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
            store.delete(key);
        });
    },

    clearTable: async (table) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) =>
            store.clear()
        );
    },

    clearPut: async (table, data) => {
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => {
            store.clear();
            if (Array.isArray(data)) {
                data.forEach((item) => store.put(item));
            } else {
                store.put(data);
            }
        });
    },

    getAll: async (table, indexName, value) => {
        return spotfixIndexedDB.withStore(table, 'readonly', (store) => {
            return new Promise((resolve, reject) => {
                const req =
                    indexName && value !== undefined
                        ? store.index(indexName).getAll(value)
                        : store.getAll();

                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
        });
    },

    getTable: async (table) => {
        if (!getSpotfixDBKey()) {
            return [];
        }
        return spotfixIndexedDB.getAll(table);
    },
};
