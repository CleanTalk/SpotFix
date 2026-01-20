const INDEXED_DB_NAME = 'spotfix-localDB';
const indexedDBVersion = 1;

const TABLE_USERS = 'users';
const TABLE_TASKS = 'tasks';
const TABLE_COMMENTS = 'comments';

const LOCAL_DATA_BASE_TABLE = [
    { name: TABLE_USERS, keyPath: 'user_id' },
    { name: TABLE_TASKS, keyPath: 'taskId' },
    { name: TABLE_COMMENTS, keyPath: 'commentId' },
];

async function openIndexedDB(name, version = indexedDBVersion) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        request.onupgradeneeded = (e) => resolve(request.result);
    });
}

async function deleteDB() {
    try {
        const dbs = await window.indexedDB.databases();
        for (const db of dbs) {
            await new Promise((resolve) => {
                const deleteReq = indexedDB.deleteDatabase(db.name);
                deleteReq.onsuccess = () => resolve();
                deleteReq.onerror = () => resolve();
            });
        }
    } catch (err) {
        console.warn('deleteDB error', err);
    }
}

const spotfixIndexedDB = {
    getIndexedDBName: () =>
        `${INDEXED_DB_NAME}_${localStorage.getItem('spotfix_session_id')}`,

    error: (request, error) => {
        console.error('IndexedDB error', request, error);
    },

    init: async () => {
        if (!localStorage.getItem('spotfix_session_id')) return { needInit: false };
        const dbName = spotfixIndexedDB.getIndexedDBName();

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, indexedDBVersion);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                LOCAL_DATA_BASE_TABLE.forEach((item) => {
                    if (!db.objectStoreNames.contains(item.name)) {
                        const store = db.createObjectStore(item.name, { keyPath: item.keyPath });
                        if (item.name === TABLE_COMMENTS) store.createIndex('taskId', 'taskId');
                        if (item.name === TABLE_TASKS) store.createIndex('userId', 'userId');
                    }
                });
                resolve({ needInit: true });
            };

            request.onsuccess = (e) => {
                const db = e.target.result;
                const missingStores = LOCAL_DATA_BASE_TABLE.filter(
                    (item) => !db.objectStoreNames.contains(item.name)
                );

                if (missingStores.length === 0) {
                    db.close();
                    resolve({ needInit: false });
                } else {
                    const newVersion = db.version + 1;
                    db.close();
                    const upgradeRequest = indexedDB.open(dbName, newVersion);
                    upgradeRequest.onupgradeneeded = (e2) => {
                        const db2 = e2.target.result;
                        missingStores.forEach((item) => {
                            const store = db2.createObjectStore(item.name, { keyPath: item.keyPath });
                            if (item.name === TABLE_COMMENTS) store.createIndex('taskId', 'taskId');
                            if (item.name === TABLE_TASKS) store.createIndex('userId', 'userId');
                        });
                    };
                    upgradeRequest.onsuccess = () => resolve({ needInit: true });
                    upgradeRequest.onerror = (err) => reject(err);
                }
            };

            request.onerror = (err) => reject(err);
        });
    },

    withStore: async (table, mode = 'readwrite', callback) => {
        const dbName = spotfixIndexedDB.getIndexedDBName();
        const db = await openIndexedDB(dbName, indexedDBVersion);
        return new Promise((resolve, reject) => {
            try {
                const transaction = db.transaction(table, mode);
                const store = transaction.objectStore(table);

                const result = callback(store);

                transaction.oncomplete = () => {
                    db.close();
                    resolve(result);
                };
                transaction.onerror = (e) => {
                    db.close();
                    reject(e.target.error);
                };
            } catch (err) {
                db.close();
                reject(err);
            }
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
        return spotfixIndexedDB.withStore(table, 'readwrite', (store) => store.clear());
    },

    clearPut: async (table, data) => {
        await spotfixIndexedDB.clearTable(table);
        await spotfixIndexedDB.put(table, data);
    },

    getAll: async (table, indexName, value) => {
        return spotfixIndexedDB.withStore(table, 'readonly', (store) => {
            return new Promise((resolve, reject) => {
                let request;
                if (indexName && value !== undefined) {
                    request = store.index(indexName).getAll(value);
                } else {
                    request = store.getAll();
                }
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        });
    },

    getTable: async (table) => {
        if (!localStorage.getItem('spotfix_session_id')) return [];
        return spotfixIndexedDB.getAll(table);
    },

    deleteTable: async (table, key) => {
        return spotfixIndexedDB.delete(table, key);
    },
};
