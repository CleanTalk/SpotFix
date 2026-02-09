import {wsSpotfix} from "../network/websocket";

/**
 * Return bool if widget is closed in local storage
 * @returns {boolean}
 */
export function storageGetWidgetIsClosed() {
    return localStorage.getItem('spotfix_widget_is_closed') === '1';
}

/**
 * Return bool if widget closed state is defined in local storage
 * @returns {boolean}
 */
export function storageWidgetCloseIsSet() {
    return localStorage.getItem('spotfix_widget_is_closed') !== null;
}

/**
 * Save widget closed state
 * @param visible
 */
export function storageSetWidgetIsClosed(visible) {
    localStorage.setItem('spotfix_widget_is_closed', visible ? '1' : '0');
    if(visible) {
        wsSpotfix.close();
    } else {
        wsSpotfix.connect();
        wsSpotfix.subscribe();
    }
}

/**
 * Return bool if user is defined in local storage
 * @returns {boolean}
 */
export function storageGetUserIsDefined() {
    return localStorage.getItem('spotfix_user_id') !== null;
}

/**
 * Save data for updates check
 * @param tasks
 */
export function storageSaveTasksUpdateData(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
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

    localStorage.setItem('spotfix_task_updates', JSON.stringify(storedTasks));
}

export function storageSaveTasksCount(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    const count = tasks.filter(task => {
        return task.taskMeta;
    })?.length;

    localStorage.setItem('spotfix_tasks_count', `${count}`);
}

/**
 * Check if a specific task has been updated since last check
 * @param taskId
 * @param currentLastUpdate
 * @returns {boolean|null}
 */
export function storageCheckTaskUpdate(taskId, currentLastUpdate) {
    if (!taskId || !currentLastUpdate) {
        return null;
    }

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
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
export function storageAddUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    if (!storedUnread.includes(taskId)) {
        storedUnread.push(taskId);
    }

    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Remove unread update for a specific task
 * @param taskId
 */
export function storageRemoveUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }
    storedUnread = storedUnread.filter(id => id !== taskId);
    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Check if there are any unread updates
 * @returns {boolean}
 */
export function storageTasksHasUnreadUpdates() {
    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
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
export function storageProvidedTaskHasUnreadUpdates(taskId) {
    if (!taskId) {
        return false;
    }

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    return storedUnread.includes(taskId.toString());
}

export function storageSaveSpotfixVersion (version) {
    if(version) {
        localStorage.setItem('spotfix_app_version', `${version}`);
    } else {
        localStorage.setItem('spotfix_app_version', '');
    }
}

export function clearLocalstorageOnLogout () {
    localStorage.removeItem('spotfix_email');
    localStorage.removeItem('spotfix_session_id');
    localStorage.removeItem('spotfix_user_id');
    localStorage.removeItem('spotfix_accounts');
    localStorage.setItem('spotfix_widget_is_closed', '1');
    wsSpotfix.close();
}
