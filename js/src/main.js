var selectedData = {};

let cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = '/spotfix/styles/doboard-widget.css';
document.head.appendChild(cssLink);

document.addEventListener('DOMContentLoaded', () => {
    new CleanTalkWidgetDoboard('', 'wrap');
});

document.addEventListener('mouseup', function(e) {
    if (e.target.parentElement && e.target.parentElement.className.indexOf('doboard_task_widget') < 0) {
        selectedData = getSelectedData(window.getSelection(), e.target);
        let widgetExist = document.querySelector('.task-widget');
        openWidget(selectedData, widgetExist, 'create_task');
    }
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

function getSelectedData(selectedData, selectedTarget) {
    let pageURL = window.location.href;
    let selectedTagName = selectedTarget.tagName;
    let selectedText = selectedData.toString();
    let selectedDataObj = {
        startSelectPosition: selectedData.anchorOffset,
        endSelectPosition: selectedData.focusOffset,
        selectedText: selectedText,
        pageURL: pageURL,
        selectedTagName: selectedTagName,
        selectedClassName: selectedTarget.className,
        selectedParentClassName: selectedTarget.parentNode.className,
    }

    return selectedDataObj;
}

function findSelectElem(elem, parentClassName, tagName, selectedText) {
    let taskElement = '';
    if (elem.length > 0) {
        for (let i = 0; i < elem.length; i++) {
            const el = elem[i];
            if (
                (el.parentNode.className == parentClassName) &&
                (el.tagName == tagName) &&
                (el.outerHTML.match(selectedText))
            ) {
                taskElement = el;
            } else {
                console.log('Not match element');
            }
        };
    } else {
        console.log('Empty element');
    }

    return taskElement;
}

function taskAnalysis(task) {
    const className = task.selectedClassName;
    const parentClassName = task.selectedParentClassName;
    const tagName = task.selectedTagName;
    const selectedText = task.selectedText;

    let taskElement = '';
    console.log(task);

    if (className && parentClassName) {
        let elemByClassName = document.getElementsByClassName(className);
        taskElement = findSelectElem(elemByClassName, parentClassName, tagName, selectedText);
    }

    if (!className && parentClassName) {
        let elemByparentClassName = document.getElementsByClassName(parentClassName);

        for (let i = 0; i < elemByparentClassName.length; i++) {
            const childrenEl = elemByparentClassName[i].children;
            taskElement = findSelectElem(childrenEl, parentClassName, tagName, selectedText);
        }
    }

    return taskElement;
}
