const spotfixStorage = (() => {
    const memory = new Map();
    let storage = null;

    try {
        storage = window.localStorage;
    } catch (error) {
        storage = null;
    }

    return {
        getItem(key) {
            if (memory.has(key)) {
                return memory.get(key);
            }
            try {
                return storage.getItem(key);
            } catch (error) {
                return null;
            }
        },

        setItem(key, value) {
            try {
                storage.setItem(key, value);
                memory.delete(key);
            } catch (error) {
                memory.set(key, String(value));
            }
        },

        removeItem(key) {
            memory.delete(key);
            try {
                storage.removeItem(key);
            } catch (error) {
            }
        },
    };
})();
