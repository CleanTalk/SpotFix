const SPOTFIX_INDEXED_DB_NAME = 'spotfix-localDB';
const spotfixIndexedDBVersion = 1;

const SPOTFIX_TABLE_USERS = 'users';
const SPOTFIX_TABLE_TASKS = 'tasks';
const SPOTFIX_TABLE_COMMENTS = 'comments';

const LOCAL_DATA_BASE_TABLE = [
    { name: SPOTFIX_TABLE_USERS, keyPath: 'user_id' },
    { name: SPOTFIX_TABLE_TASKS, keyPath: 'taskId' },
    { name: SPOTFIX_TABLE_COMMENTS, keyPath: 'commentId' },
];

let dbPromise = null;

function getDBName() {
    return `${SPOTFIX_INDEXED_DB_NAME}_${
        localStorage.getItem('spotfix_session_id') ||
        localStorage.getItem('spotfix_project_token')
    }`;
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
        dbPromise = openIndexedDB(getDBName(), spotfixIndexedDBVersion);
    }
    return dbPromise;
}

async function deleteCurrentDB() {
    const name = getDBName();
    return new Promise((resolve) => {
        const req = indexedDB.deleteDatabase(name);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
        req.onblocked = () => {
            console.warn('IndexedDB delete blocked');
            resolve();
        };
    });
}

const spotfixIndexedDB = {
    init: async () => {
        const sessionId = localStorage.getItem('spotfix_session_id');
        const projectToken = localStorage.getItem('spotfix_project_token');

        if (!sessionId && !projectToken) {
            return { needInit: false };
        }

        await deleteCurrentDB();

        dbPromise = null;

        await getDB();
        return { needInit: true };
    },

    withStore: async (table, mode = 'readwrite', callback) => {
        const db = await getDB();

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
        if (
            !localStorage.getItem('spotfix_session_id') &&
            !localStorage.getItem('spotfix_project_token')
        ) {
            return [];
        }
        return spotfixIndexedDB.getAll(table);
    },
};
