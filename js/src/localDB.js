async function deleteDB () {
    try {
        const dbs = await window.indexedDB.databases();
        for (const db of dbs) {
            closeAndDeleteDatabase(db.name).catch(() => {});
        }
    } catch (error) {}
}

const closeAndDeleteDatabase = (dbName) => {
    return new Promise((resolve, reject) => {
        const openReq = indexedDB.open(dbName);

        openReq.onsuccess = () => {
            const db = openReq.result;
            db.close();
            const deleteReq = indexedDB.deleteDatabase(dbName);
            deleteReq.onsuccess = () => {
                resolve();
            };
            deleteReq.onerror = (event) => {
                reject(event.target.error);
            };
        };

        openReq.onerror = () => {
            const deleteReq = indexedDB.deleteDatabase(dbName);
            deleteReq.onsuccess = () => {
                resolve();
            };
            deleteReq.onerror = (event) => {
                reject(event.target.error);
            };
        };
    });
};

function putHandler(item, store, e) {
    if (item?.user_id || item?.taskId || item?.comment_id) {
        const request = store?.put(item);
        if (request) {
            request.onsuccess = function() {
                e.target.result.close();
            };
            request.onerror = function() {
                e.target.result.close();
                spotfixIndexedDB.error(request, e);
            };
        }
    }
}

const INDEXED_DB_NAME = 'spotfix-localDB';
const indexedDBVersion = 1;

const TABLE_USERS = 'users';
const TABLE_TASKS = 'tasks';
const TABLE_COMMENTS = 'comments';

const LOCAL_DATA_BASE_TABLE = [
    {name: TABLE_USERS, keyPath: 'user_id'},
    {name: TABLE_TASKS, keyPath: 'taskId'},
    {name: TABLE_COMMENTS, keyPath: 'commentId'},
];

const spotfixIndexedDB = {
    init: async () => {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('spotfix_session_id')) {
                resolve({ needInit: false });
                return;
            }

            const indexedDBName = spotfixIndexedDB.getIndexedDBName();
            const request = window.indexedDB.open(indexedDBName, indexedDBVersion);

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

                const missingStores = LOCAL_DATA_BASE_TABLE.filter(item => !db.objectStoreNames.contains(item.name));
                if (missingStores.length === 0) {
                    db.close();
                    resolve({ needInit: false });
                } else {
                    const newVersion = db.version + 1;
                    db.close();
                    const upgradeRequest = window.indexedDB.open(indexedDBName, newVersion);
                    upgradeRequest.onupgradeneeded = (e2) => {
                        const db2 = e2.target.result;
                        missingStores.forEach(item => {
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
    put: async (table, data) => {
        const indexedDBName = spotfixIndexedDB.getIndexedDBName();
        const indexedDB = await window.indexedDB.open(indexedDBName, indexedDBVersion);

        indexedDB.onsuccess = function(e) {
            let transaction;
            try {
                transaction = e.target.result.transaction(table, 'readwrite');
            } catch (e) {}
            const store = transaction?.objectStore(table);
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    putHandler(item, store, e);
                });
            } else {
                putHandler(data, store, e);
            }
        };
    },

    delete: async (table, id) => {
        const indexedDBName = spotfixIndexedDB.getIndexedDBName();
        const indexedDB = await window.indexedDB.open(indexedDBName, indexedDBVersion);

        indexedDB.onsuccess = function(e) {
            let transaction;
            try {
                transaction = e.target.result.transaction(table, 'readwrite');
            } catch (e) {}
            const store = transaction?.objectStore(table);
            store.delete(id);
        };
    },

    getAll: async (table, indexName, value) => {
        const indexedDBName = spotfixIndexedDB.getIndexedDBName();
        const indexedDB = await window.indexedDB.open(indexedDBName, indexedDBVersion);

        return await new Promise(
            (resolve, reject) => {
                indexedDB.onsuccess = function(e) {
                    let transaction;
                    try {
                        transaction = e.target.result.transaction(table, 'readwrite');
                    } catch (e) {}
                    const store = transaction?.objectStore(table);
                    if (store) {
                        if (indexName && value) {
                            let index = store.index(indexName);
                            let request = index.getAll(value);
                            request.onsuccess = function() {
                                resolve(request.result);
                            };
                            // eslint-disable-next-line prefer-promise-reject-errors
                            request.onerror = () => reject('Err');
                        } else {
                            let request = store.getAll();
                            request.onsuccess = function() {
                                resolve(request.result);
                            };
                            // eslint-disable-next-line prefer-promise-reject-errors
                            request.onerror = () => reject('Err');
                        }
                    }
                };
                // eslint-disable-next-line prefer-promise-reject-errors
                indexedDB.onerror = () => reject('Err');
            },
        );
    },

    clearPut: async (table, data) => {
        await spotfixIndexedDB.clearTable(table, data);
        spotfixIndexedDB.put(table, data);
    },

    clearTable: async (table) => {
        const indexedDBName = spotfixIndexedDB.getIndexedDBName();
        const indexedDB = await window.indexedDB.open(indexedDBName, indexedDBVersion);

        indexedDB.onsuccess = function(e) {
            let transaction;
            try {
                transaction = e.target.result.transaction(table, 'readwrite');
            } catch (e) {}
            const store = transaction?.objectStore(table);
            const request = store?.clear();
            if (request) {
                request.onsuccess = function() {
                    e.target.result.close();
                };
                request.onerror = function() {
                    e.target.result.close();
                    spotfixIndexedDB.error(request, e);
                };
            }
        };
    },

    getTable: async (table) => {
        return new Promise((resolve) => {
            if (!localStorage.getItem('spotfix_session_id')) {
                resolve();
            } else {
                const indexedDBName = spotfixIndexedDB.getIndexedDBName();
                window.indexedDB.open(indexedDBName, indexedDBVersion).onsuccess = function(e) {
                    let transaction;
                    try {
                        transaction = e.target.result.transaction(table);
                    } catch (e) {
                    }
                    const store = transaction?.objectStore(table);
                    const request = store?.getAll();
                    if (request) {
                        request.onsuccess = (event) => {
                            e.target.result.close();
                            resolve(event.target.result);
                        };
                        request.onerror = function() {
                            e.target.result.close();
                            spotfixIndexedDB.error(request, e);
                        };
                    }
                };
            }
        });
    },

    deleteTable: async (table, index) => {
        const indexedDBName = spotfixIndexedDB.getIndexedDBName();
        return window.indexedDB.open(indexedDBName, indexedDBVersion).onsuccess = function(e) {
            const transaction = e.target.result.transaction(table, 'readwrite');
            const store = transaction?.objectStore(table);
            const request = store.delete(index);
            request.onsuccess = () => {
                e.target.result.close();
            };
            request.onerror = function() {
                e.target.result.close();
                spotfixIndexedDB.error(request, e);
            };
        };
    },

    getIndexedDBName: () => {
        return `${INDEXED_DB_NAME}_${localStorage.getItem('spotfix_session_id')}`;
    },
    error: (request, error) => {
        console.error('IndexedDB', request, error);
    },
};
