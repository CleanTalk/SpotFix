/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';

    /**
     * Constructor
     */
    constructor(selectedData, type) {
        this.selectedText = selectedData.selectedText;
        this.widgetElement = this.createWidgetElement(type);
        this.taskDescription = this.widgetElement.querySelector('#doboard_task_description');
        this.submitButton = this.widgetElement.querySelector('#doboard_task_widget-submit_button');
        //this.bindEvents();
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
    createWidgetElement(type) {
        let auth = true;
        if (!auth) {
            type = 'auth';
        }

        const widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
        widgetContainer.className = 'doboard_task_widget';
        widgetContainer.innerHTML = '';
        switch (type) {
            case 'create_task':
                widgetContainer.innerHTML = `
                    <div class="doboard_task_widget-container doboard_task_widget-create">
                        <div class="doboard_task_widget-close_btn">X</div>
                        <h2>Doboard</h2>
                        <input id="doboard_task_widget-title" class="doboard_task_widget-title-input" name="title" placeholder="Title...">
                        <textarea id="doboard_task_widget-description" class="doboard_task_widget-description-textarea" name="description" placeholder="Task description...">${this.selectedText}</textarea>
                        <button id="doboard_task_widget-submit_button" class="doboard_task_widget-submit_button">Create Task</button>
                    </div>
                `;
                break;

            case 'wrap':
                widgetContainer.innerHTML = `
                    <div class="doboard_task_widget-container doboard_task_widget-wrap">
                        <img src="/spotfix/img/doboard-widget-logo.svg" alt="Doboard logo">
                    </div>
                `;
                break;

            case 'auth':
                widgetContainer.innerHTML = `
                    <div class="doboard_task_widget-container doboard_task_widget-authorization">
                        <div class="doboard_task_widget-close_btn">X</div>
                        <h2>Doboard</h2>
                        <input id="doboard_task_login" name="login" placeholder="Login or email">
                        <input id="doboard_task_password" name="password" placeholder="Password">
                        <button id="doboard_task_widget-submit_button" class="doboard_task_widget-submit_button">Authorization</button>
                    </div>
                `;
                break;
            case 'task_list':
                widgetContainer.innerHTML = `
                    <div class="doboard_task_widget-container doboard_task_widget-task_list">
                        <div class="doboard_task_widget-close_btn">X</div>
                        <h2>Doboard</h2>
                        <div class="doboard_task_widget-task_list-container"></div>
                    </div>
                `;
                break;

            default:

                break;
        }

        document.body.appendChild(widgetContainer);

        switch (type) {
            case 'create_task':
                document.getElementById('doboard_task_widget-submit_button').addEventListener('click', () => {
                    const taskTitle = document.getElementById('doboard_task_widget-title').value;
                    const taskDescription = document.getElementById('doboard_task_widget-description').value;
                    const typeSend = 'private';
                    const taskDetails = {
                        taskTitle: taskTitle,
                        taskDescription: taskDescription,
                        typeSend: typeSend,
                        selectedData: selectedData,
                    };
                    this.submitTask(taskDetails);
                    selectedData = {};
                });
                document.querySelector('.doboard_task_widget-close_btn').addEventListener('click', () => {
                    this.hide();
                });
                break;
            case 'wrap':
                document.querySelector('.doboard_task_widget-wrap').addEventListener('click', () => {
                    this.createWidgetElement('task_list');
                });
                break;
            case 'auth':
                document.querySelector('.doboard_task_widget-close_btn').addEventListener('click', () => {
                    this.hide();
                });
                break;
            case 'task_list':
                let tasks = this.getTasks();
                for (let i = 0; i < tasks.length; i++) {
                    const elTask = tasks[i];
                    const taskTitle = elTask.taskTitle;
                    const taskDescription = elTask.taskDescription;
                    const currentPageURL = elTask.selectedData.pageURL;
                    const selectedPageURL = window.location.href;
                    //console.log(elTask);

                    if (currentPageURL == selectedPageURL) {
                        document.querySelector(".doboard_task_widget-task_list-container").innerHTML += `
                        <div class="doboard_task_widget-task_row">
                            <div class="doboard_task_widget-task_title">
                                <span class="doboard_task_widget-task-text_bold">Title: </span>
                                <span>${taskTitle}</span>
                            </div>
                            <div class="doboard_task_widget-task_description">
                                <span class="doboard_task_widget-task-text_bold">Description: </span>
                                <span>${taskDescription}</span>
                            </div>
                        </div>
                        `;

                        let taskElement = taskAnalysis(elTask.selectedData);
                        if (taskElement) {
                            taskElement.classList.add('doboard_task_widget-text_selection');
                        }
                    }
                };
                document.querySelector('.doboard_task_widget-close_btn').addEventListener('click', () => {
                    this.hide();
                });
                break;

            default:
                break;
        }


        return widgetContainer;
    }

    /**
     * Bind events to the widget
     */
    /*bindEvents() {
        this.submitButton.addEventListener('click', () => this.submitTask());
    }*/

    /**
     * Submit the task
     */
    submitTask(taskDetails) {

        if (taskDetails && taskDetails.taskTitle) {
            this.createTask(taskDetails);
            //this.taskInput.value = ''; нужна очистка полей
            this.hide();
        } else {
            alert('Please enter task title.');
        }
    }

    /**
     * Create a task
     * @param {*} taskDetails
     */
    createTask(taskDetails) {
        // Call the API to create a task
        // This function should be implemented in api.js
        if (taskDetails.typeSend == 'private') {
            createTaskLS(taskDetails);
        } else {
            createTaskDoboard(taskDetails);
        }
    }

    /**
     * Get the task
     * @return {JSON}
     */
    getTasks() {
        //let tasksDoboard = getTasksDoboard();
        let tasksLS = getTasksLS();

        return tasksLS;
    }

    /**
     * Hide the widget
     */
    hide() {
        this.createWidgetElement('wrap');

        const textSelectionclassName = 'doboard_task_widget-text_selection';
        document.querySelectorAll('.' + textSelectionclassName).forEach(n => {
            n.classList.remove(textSelectionclassName);
        });
    }
}
