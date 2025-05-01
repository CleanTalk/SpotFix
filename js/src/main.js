var selectedData = {};

/*let cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = '/spotfix/styles/doboard-widget.css';
document.head.appendChild(cssLink);*/

document.addEventListener('DOMContentLoaded', () => {
    new CleanTalkWidgetDoboard('', 'wrap');
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
            openWidget(selectedData, widgetExist, 'create_task');
        }
    }, 1000);
});

/**
 * Open the widget to create a task.
 * @param {*} selectedText
 */
function openWidget(selectedData, widgetExist, type) {
    if (selectedData && !widgetExist) {
        new CleanTalkWidgetDoboard(selectedData, type);
    }
}

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

function taskAnalysis(taskSelectedData) {
    const nodePath = taskSelectedData.nodePath;
    return retrieveNodeFromPath(nodePath);
}
