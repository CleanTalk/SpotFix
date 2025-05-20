var selectedData = {};
var widgetTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    new CleanTalkWidgetDoboard({}, 'wrap');
});

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
            openWidget(selectedData, widgetExist, 'create_issue');
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
 * Scroll to an element by tag, class, and text content
 * @param {string} path - The path to the element
 * @return {boolean} - True if the element was found and scrolled to, false otherwise
 */
function scrollToNodePath(path) {
    const node = retrieveNodeFromPath(path);
    if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
    }
    return false;
}
