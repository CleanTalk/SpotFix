/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';
    selectedData = {};

    /**
     * Constructor
     */
    constructor(selectedData, type) {
        this.selectedData = selectedData;
        this.selectedText = selectedData.selectedText;
        this.widgetElement = null; // Инициализируем как null
        this.init(type); // Вызываем метод инициализации
    }

    /**
     * Initialize the widget
     */
    async init(type) {
        this.widgetElement = await this.createWidgetElement(type); // Дожидаемся создания виджета
        this.taskDescription = this.widgetElement.querySelector('#doboard_task_description');
        this.submitButton = this.widgetElement.querySelector('#doboard_task_widget-submit_button');
        // Здесь можно вызвать bindEvents или другие методы
    }


    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
    async createWidgetElement(type) {
        let auth = true;
        if (!auth) {
            type = 'auth';
        }

        const widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
        widgetContainer.className = 'doboard_task_widget';
        widgetContainer.innerHTML = '';
        switch (type) {
            case 'create_task':
                templateName = 'create_task';
                variables = { selectedText: this.selectedText };
                break;
            case 'wrap':
                templateName = 'wrap';
                variables = { themeUrl: themeData?.themeUrl || '' };
                break;
            case 'auth':
                templateName = 'auth';
                variables = {};
                break;
            case 'task_list':
                templateName = 'task_list';
                variables = {};
                break;

            default:
                break;
        }
        widgetContainer.innerHTML = await this.loadTemplate(templateName, variables);
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
                        selectedData: this.selectedData,
                    };
                    this.submitTask(taskDetails);
                    this.selectedData = {};
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

                        const taskSelectedData = elTask.selectedData;
                        let taskElement = taskAnalysis(taskSelectedData);
                        if (taskElement) {
                            if ( taskSelectedData.startSelectPosition && taskSelectedData.endSelectPosition ) {
                                let text = taskElement.innerHTML;
                                let start = taskSelectedData.startSelectPosition;
                                let end = taskSelectedData.endSelectPosition;
                                let selectedText = text.substring(start, end);
                                let beforeText = text.substring(0, start);
                                let afterText = text.substring(end);
                                taskElement.innerHTML = beforeText + '<span class="doboard_task_widget-text_selection">' + selectedText + '</span>' + afterText;
                            }
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

    async loadTemplate(templateName, variables = {}) {
        // Загружаем HTML-шаблон
        const response = await fetch(`/wp-content/themes/twentytwentyfourspotfix/spotfix/templates/${templateName}.html`);
        let template = await response.text();
    
        // Заменяем плейсхолдеры на значения переменных
        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            template = template.replaceAll(placeholder, value);
        }
    
        return template;
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
     * @return {[]}
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
        const spans = document.querySelectorAll('.' + textSelectionclassName);
        spans.forEach(span => {
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        });
    }
}
