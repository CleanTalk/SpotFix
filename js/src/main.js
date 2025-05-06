var selectedData = {};

/*let cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = '/spotfix/styles/doboard-widget.css';
document.head.appendChild(cssLink);*/

document.addEventListener('DOMContentLoaded', () => {
    if (!isUserAuthorized()) {
        new CleanTalkWidgetDoboard({}, 'auth');
    } else {
        new CleanTalkWidgetDoboard({}, 'wrap');
    }
});


let widgetTimeout;
document.addEventListener('selectionchange', function(e) {
    if (widgetTimeout) {
        clearTimeout(widgetTimeout);
    }

    widgetTimeout = setTimeout(() => {
        const selection = window.getSelection();
        if (
            selection.type === 'Range'
        ) {
            const selectedData = getSelectedData(selection);
            let widgetExist = document.querySelector('.task-widget');

            if (!isUserAuthorized()) {
                openWidget(selectedData, widgetExist, 'auth');
            } else {
                openWidget(selectedData, widgetExist, 'create_issue');
            }
        }
    }, 1000);
});

/**
 * Open the widget to create a task.
 * @param {*} selectedText
 * @param {*} widgetExist
 * @param {*} type
 */
function openWidget(selectedData, widgetExist, type) {    
    if (selectedData && !widgetExist) {
        new CleanTalkWidgetDoboard(selectedData, type);
    }
}

/**
 * Get the selected data from the DOM
 * @param {Selection} selectedData
 * @returns {Object}
 */
function getSelectedData(selectedData) {
    let pageURL = window.location.href;
    let selectedText = selectedData.toString();
    return {
        startSelectPosition: selectedData.anchorOffset,
        endSelectPosition: selectedData.focusOffset,
        selectedText: selectedText,
        pageURL: pageURL,
        nodePath: calculateNodePath(selectedData.focusNode.parentNode),
    };
}

/**
 * Calculate the path of a DOM node
 *
 * @param {Node} node
 * @return {int[]}
 */
function calculateNodePath(node) {
    let path = [];
    while (node) {
        let index = 0;
        let sibling = node.previousSibling;
        while (sibling) {
            if (sibling.nodeType === 1) {
                index++;
            }
            sibling = sibling.previousSibling;
        }
        path.unshift(index);
        node = node.parentNode;
    }

    // Hard fix - need to remove first element to work correctly
    path.shift();

    return path;
}

/**
 * Retrieve a DOM node from a path
 *
 * @param {int[]} path
 * @return {*|null}
 */
function retrieveNodeFromPath(path) {
    // @ToDo check if the path is correct
    if ( ! path ) {
        return null;
    }

    let node = document;
    for (let i = 0; i < path.length; i++) {
        node = node.children[path[i]];
        if ( ! node ) {
            return null;
        }
    }
    return node;
}

/**
 * Analyze the task selected data
 * @param {Object} taskSelectedData
 * @return {Element|null}
 */
function taskAnalysis(taskSelectedData) {
    const nodePath = taskSelectedData.nodePath;
    return retrieveNodeFromPath(nodePath);
}

/**
 * Get the value of a cookie by name
 * @param {string} name
 * @return {string|null}
 */
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

/**
 * Set a cookie with specified parameters
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {Date} expires - Expiration date of the cookie
 */
function setCookie(name, value, expires) {
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; Secure; SameSite=Strict`;
}


/**
 * Check if the user is authorized
 * @return {boolean}
 */
function isUserAuthorized() {
    const session_id = getCookie('doboard_task_widget_session_id');
    const user_token = getCookie('doboard_task_widget_user_token');
    return session_id && user_token; ;
}