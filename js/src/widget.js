/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';
    selectedData = {};
    widgetElement = null;

    /**
     * Constructor
     */
    constructor(selectedData, type) {
        this.selectedData = selectedData;
        this.selectedText = selectedData.selectedText;
        this.init(type);
    }

    /**
     * Initialize the widget
     */
    async init(type) {
        this.widgetElement = await this.createWidgetElement(type);
        this.taskDescription = this.widgetElement.querySelector('#doboard_task_description');
        this.submitButton = this.widgetElement.querySelector('#doboard_task_widget-submit_button');
    }

    bindAuthEvents() {
        const authWidget = document.querySelector('.doboard_task_widget-authorization');
        if (authWidget) {
            const loginInput = document.getElementById('doboard_task_widget_login');
            const passwordInput = document.getElementById('doboard_task_widget_password');
            const submitButton = document.getElementById('doboard_task_widget-submit_button');

            submitButton.addEventListener('click', () => {
                const login = loginInput.value;
                const password = passwordInput.value;

                console.log('Login:', login);
                console.log('Password:', password);

                // Устанавливаем куку авторизации
                document.cookie = "doboard_task_widget_user_authorized=true; path=/";

                console.log('Authorization cookie set.');

                // Закрываем виджет после авторизации
                this.hide();
            });
        }
    }

    /**
     * Binding events to create a task
     */
    bindCreateTaskEvents() {
        const submitButton = document.getElementById('doboard_task_widget-submit_button');
        if (submitButton) {
            submitButton.addEventListener('click', () => {
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
        }
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
    async createWidgetElement(type) {
        const widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
        widgetContainer.className = 'doboard_task_widget';
        widgetContainer.innerHTML = '';
        let tasks = this.getTasks();

        switch (type) {
            case 'create_issue':
                templateName = 'create_issue';
                variables = {
                    selectedText: this.selectedText,
                    themeUrl: themeData?.themeUrl || '',
                    currentDomain: document.location.hostname || ''
                };
                break;
            case 'wrap':
                templateName = 'wrap';
                variables = { themeUrl: themeData?.themeUrl || '' };
                break;
            case 'auth':
                templateName = 'auth';
                variables = { themeUrl: themeData?.themeUrl || '' };
                break;
            case 'all_issues':
                templateName = 'all_issues';                
                variables = {
                    themeUrl: themeData?.themeUrl || '',
                };
                break;

            default:
                break;
        }
        widgetContainer.innerHTML = await this.loadTemplate(templateName, variables);
        document.body.appendChild(widgetContainer);


        switch (type) {
            case 'create_issue':
                this.bindCreateTaskEvents();
                break;
            case 'wrap':
                document.querySelector('.doboard_task_widget-wrap').addEventListener('click', () => {
                    if (!isUserAuthorized()) {
                        this.createWidgetElement('auth');
                    } else {
                        this.createWidgetElement('all_issues');
                    }
                });
                break;
            case 'auth':
                this.bindAuthEvents(); // Binding events for authorization
                break;
            case 'all_issues':
                let issuesQuantityOnPage = 0;
                if (tasks.length > 0) {
                    for (let i = 0; i < tasks.length; i++) {
                        const elTask = tasks[i];
                        const taskTitle = elTask.taskTitle;
                        const taskDescription = elTask.taskDescription;
                        const currentPageURL = elTask.selectedData.pageURL;
                        const selectedPageURL = window.location.href;

                        if (currentPageURL == selectedPageURL) {
                            issuesQuantityOnPage++;
                            variables = {
                                taskTitle: taskTitle || '',
                                taskDescription: taskDescription || '',
                                themeUrl: themeData?.themeUrl || '',
                                avatarImg: '/spotfix/img/empty_avatar.png'
                            };
                            document.querySelector(".doboard_task_widget-all_issues-container").innerHTML += await this.loadTemplate('list_issues', variables);

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
                    }
                }
                if (tasks.length == 0 || issuesQuantityOnPage == 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
                }
                break;

            default:
                break;
        }

        document.querySelector('.doboard_task_widget-close_btn')?.addEventListener('click', () => {
            this.hide();
        }) || '';
        return widgetContainer;
    }

    /**
     * Load the template
     * @param {string} templateName
     * @param {object} variables
     * @return {string} template
     */
    async loadTemplate(templateName, variables = {}) {
        const response = await fetch(`/wp-content/themes/twentytwentyfourspotfix/spotfix/templates/${templateName}.html`);
        let template = await response.text();
    
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
            //this.taskInput.value = ''; We need to clear the fields
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
