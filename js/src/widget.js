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

    /**
     * Binding events to create a task
     */
    bindCreateTaskEvents() {
        const submitButton = document.getElementById('doboard_task_widget-submit_button');
        const checkbox = document.getElementById('doboard_task_widget-switch');
        const label = document.getElementById('doboard_task_widget-switch-label');
        const img = document.getElementById('doboard_task_widget-switch-img');
        const desc = document.getElementById('doboard_task_widget-switch-desc');

        const updateSwitch = () => {
            if (checkbox.checked) {
                label.textContent = 'Public';
                img.src = '/spotfix/img/public.svg';
                if (desc) desc.textContent = 'Anyone can see this conversation.';
            } else {
                label.textContent = 'Private';
                img.src = '/spotfix/img/private.svg';
                if (desc) desc.textContent = 'This conversation can see only you and support';
            }
        };

        if (checkbox && label && img) {
            checkbox.addEventListener('change', updateSwitch);
            updateSwitch();
        }

        if (submitButton) {
            submitButton.addEventListener('click', () => {
                const taskTitle = document.getElementById('doboard_task_widget-title').value;
                const taskDescription = document.getElementById('doboard_task_widget-description').value;
                const userName = document.getElementById('doboard_task_widget-user_name').value;
                const userEmail = document.getElementById('doboard_task_widget-user_email').value;
                const typeSend = checkbox && !checkbox.checked ? 'private' : 'public';
                const taskDetails = {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    typeSend: typeSend,
                    selectedData: this.selectedData,
                    userName: userName,
                    userEmail: userEmail,
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
                    this.createWidgetElement('all_issues');
                });
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
                        const taskNodePath = elTask.selectedData.nodePath;

                        if (currentPageURL == selectedPageURL) {
                            issuesQuantityOnPage++;
                            variables = {
                                taskTitle: taskTitle || '',
                                taskDescription: taskDescription || '',
                                themeUrl: themeData?.themeUrl || '',
                                avatarImg: '/spotfix/img/empty_avatar.png',
                                nodePath: taskNodePath,
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

                // Bind the click event to the task elements for scrolling to the selected text
                this.bindIssuesScroll();
                break;

            default:
                break;
        }

        document.querySelector('.doboard_task_widget-close_btn')?.addEventListener('click', () => {
            this.hide();
        }) || '';
        return widgetContainer;
    }

    bindIssuesScroll() {
        document.querySelectorAll('.issue-item').forEach(item => {
            item.addEventListener('click', function() {
                const nodePath = JSON.parse(this.getAttribute('data-node-path'));
                scrollToNodePath(nodePath);
            });
        });
    }

    /**
     * Load the template
     * @param {string} templateName
     * @param {object} variables
     * @return {string} template
     */
    async loadTemplate(templateName, variables = {}) {
        const response = await fetch(`/spotfix/templates/${templateName}.html`);
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

        if (
            taskDetails &&
            taskDetails.taskTitle &&
            taskDetails.taskDescription &&
            taskDetails.userName &&
            taskDetails.userEmail
        ) {
            this.createTask(taskDetails);
            //this.taskInput.value = ''; We need to clear the fields
            this.hide();
        } else {
            alert('Please fill in all fields.');
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
