/**
 * Return bool if widget is closed in local storage
 * @returns {boolean}
 */
function storageGetWidgetIsClosed() {
    return spotfixStorage.getItem('spotfix_widget_is_closed') === '1';
}

/**
 * Return bool if widget closed state is defined in local storage
 * @returns {boolean}
 */
function storageWidgetCloseIsSet() {
    return spotfixStorage.getItem('spotfix_widget_is_closed') !== null;
}

/**
 * Save widget closed state
 * @param visible
 */
function storageSetWidgetIsClosed(visible) {
    spotfixStorage.setItem('spotfix_widget_is_closed', visible ? '1' : '0');
    if(visible) {
        wsSpotfix.close();
    } else {
        wsSpotfix.connect();
        wsSpotfix.subscribe();
    }
}

function storageResetLegacyWidgetHiddenState() {
    if (spotfixStorage.getItem('spotfix_widget_hidden_state_reset')) {
        return;
    }
    spotfixStorage.setItem('spotfix_widget_hidden_state_reset', '1');
    if (storageGetWidgetIsClosed()) {
        spotfixStorage.setItem('spotfix_widget_is_closed', '0');
    }
}

/**
 * Return bool if user is defined in local storage
 * @returns {boolean}
 */
function storageGetUserIsDefined() {
    return spotfixStorage.getItem('spotfix_user_id') !== null;
}

/**
 * Save data for updates check
 * @param tasks
 */
function storageSaveTasksUpdateData(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(spotfixStorage.getItem('spotfix_task_updates') || '{}');
    } catch (error) {
        storedTasks = {};
    }

    tasks.forEach(task => {
        if (task.taskId && task.taskLastUpdate) {
            storedTasks[task.taskId] = {
                taskId: task.taskId,
                taskLastUpdate: task.taskLastUpdate
            };
        }
    });

    spotfixStorage.setItem('spotfix_task_updates', JSON.stringify(storedTasks));
}

function storageSaveTasksCount(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    const count = tasks.filter(task => {
        return task.taskMeta;
    })?.length;

    spotfixStorage.setItem('spotfix_tasks_count', `${count}`);
}

/**
 * Check if a specific task has been updated since last check
 * @param taskId
 * @param currentLastUpdate
 * @returns {boolean|null}
 */
function storageCheckTaskUpdate(taskId, currentLastUpdate) {
    if (!taskId || !currentLastUpdate) {
        return null;
    }

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(spotfixStorage.getItem('spotfix_task_updates') || '{}');
    } catch (error) {
        storedTasks = {};
    }
    const storedTask = storedTasks[taskId];

    if (!storedTask) {
        return false;
    }

    const storedUpdate = new Date(storedTask.taskLastUpdate);
    const currentUpdate = new Date(currentLastUpdate);
    return currentUpdate > storedUpdate;
}

/**
 * Add unread update for a specific task
 * @param taskId
 */
function storageAddUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(spotfixStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    if (!storedUnread.includes(taskId)) {
        storedUnread.push(taskId);
    }

    spotfixStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Remove unread update for a specific task
 * @param taskId
 */
function storageRemoveUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(spotfixStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }
    storedUnread = storedUnread.filter(id => id !== taskId);
    spotfixStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Check if there are any unread updates
 * @returns {boolean}
 */
function storageTasksHasUnreadUpdates() {
    let storedUnread = [];
    try {
        storedUnread = JSON.parse(spotfixStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    return storedUnread.length > 0;
}

/**
 *  Check if a specific task has unread updates
 * @param taskId
 * @returns {boolean}
 */
function storageProvidedTaskHasUnreadUpdates(taskId) {
    if (!taskId) {
        return false;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(spotfixStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    return storedUnread.includes(taskId.toString());
}

function storageSaveSpotfixVersion (version) {
    if(version) {
        spotfixStorage.setItem('spotfix_app_version', `${version}`);
    } else {
        spotfixStorage.setItem('spotfix_app_version', '');
    }
}

function clearLocalstorageOnLogout () {
    spotfixStorage.removeItem('spotfix_email');
    spotfixStorage.removeItem('spotfix_session_id');
    spotfixStorage.removeItem('spotfix_user_id');
    spotfixStorage.removeItem('spotfix_accounts');
    wsSpotfix.close();
}


/**
 * Email validator for spotfix_email in localStorage
 * @param {string} email 
 * @returns {boolean} 
 */
function isValidSpotfixEmail(email) {
    if (!email || typeof email !== 'string') return false;
    if (email === 'undefined') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 
 * @returns {string|null}
 */
function getSpotfixEmail() {
    const email = spotfixStorage.getItem('spotfix_email');
    return isValidSpotfixEmail(email) ? email : null;
}

/**
 * 
 * @param {string} email 
 */
function setSpotfixEmail(email) {
    if (isValidSpotfixEmail(email)) {
        spotfixStorage.setItem('spotfix_email', email);
    } else {
        spotfixStorage.removeItem('spotfix_email');
    }
}