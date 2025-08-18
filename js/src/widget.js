/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';
    selectedData = {};
    widgetElement = null;
    params = {};

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
        this.params = this.getParams();
        this.widgetElement = await this.createWidgetElement(type);
        this.bindWidgetInputsInteractive();
    }

    getParams() {
        const script = document.querySelector(`script[src*="doboard-widget-bundle.min.js"]`);
        if ( ! script || ! script.src ) {
            throw new Error('Script not provided');
        }

        const url = new URL(script.src);
        let params = Object.fromEntries(url.searchParams.entries());
        if ( ! params ) {
            throw new Error('Script params not provided');
        }
        if ( ! params.projectToken || ! params.accountId || ! params.projectId ) {
            throw new Error('Necessary script params not provided');

        }
        return params;
    }

    /**
     * Binding events to create a task
     */
    bindCreateTaskEvents() {
        const submitButton = document.getElementById('doboard_task_widget-submit_button');

        if (submitButton) {
            submitButton.addEventListener('click', async () => {
                // Check required fields: Report about and Description
                const taskTitleElement = document.getElementById('doboard_task_widget-title');
                const taskTitle = taskTitleElement.value;
                if ( ! taskTitle ) {
                    taskTitleElement.style.borderColor = 'red';
                    taskTitleElement.focus();
                    taskTitleElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }
                const taskDescriptionElement = document.getElementById('doboard_task_widget-description')
                const taskDescription = taskDescriptionElement.value;
                if ( ! taskDescription ) {
                    taskDescriptionElement.style.borderColor = 'red';
                    taskDescriptionElement.focus();
                    taskDescriptionElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }

                // If login section is open, check required fields: Nickname, Email
                let userName = '';
                let userEmail = '';
                const loginSectionElement = document.querySelector('.doboard_task_widget-login')
                if ( loginSectionElement.classList.contains('active') ) {
                    const userNameElement = document.getElementById('doboard_task_widget-user_name');
                    userName = userNameElement.value;
                    if ( ! userName ) {
                        userNameElement.style.borderColor = 'red';
                        userNameElement.focus();
                        userNameElement.addEventListener('input', function() {
                            this.style.borderColor = '';
                        });
                        return;
                    }
                    const userEmailElement = document.getElementById('doboard_task_widget-user_email');
                    userEmail = userEmailElement.value;
                    if ( ! userEmail ) {
                        userEmailElement.style.borderColor = 'red';
                        userEmailElement.focus();
                        userEmailElement.addEventListener('input', function() {
                            this.style.borderColor = '';
                        });
                        return;
                    }
                }

                // Make the submit button disable with spinner
                target.disabled = true;
                target.style.cursor = 'waiting';

                const taskDetails = {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    //typeSend: typeSend,
                    selectedData: this.selectedData,
                    userName: userName,
                    userEmail: userEmail,
                    projectToken: this.params.projectToken,
                    projectId: this.params.projectId,
                    accountId: this.params.accountId,
                };
                const submitTaskResult = await this.submitTask(taskDetails);

                // Return the submit button normal state
                target.disabled = false;
                target.style.cursor = 'pointer';

                localStorage.setItem(`spotfix_task_data_${submitTaskResult.taskId}`, JSON.stringify(this.selectedData));
                this.selectedData = {};
                await this.createWidgetElement('all_issues');
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

        let templateName = '';
        let variables = {};

        switch (type) {
            case 'create_issue':
                templateName = 'create_issue';
                variables = {
                    selectedText: this.selectedText,
                    currentDomain: document.location.hostname || ''
                };
                break;
            case 'wrap':
                templateName = 'wrap';
                break;
            case 'all_issues':
                templateName = 'all_issues';
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
                let tasks = await this.getTasks();
                if (tasks.length > 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';
                    for (let i = 0; i < tasks.length; i++) {
                        const elTask = tasks[i];

                        // Data from api
                        const taskId = elTask.taskId;
                        const taskTitle = elTask.taskTitle;

                        // Data from local storage
                        const taskDataString = localStorage.getItem(`spotfix_task_data_${taskId}`);
                        const taskData = taskDataString ? JSON.parse(taskDataString) : null;
                        const currentPageURL = taskData.pageURL;
                        const taskNodePath = taskData.nodePath;

                        if (currentPageURL === window.location.href) {
                            issuesQuantityOnPage++;
                            const variables = {
                                taskTitle: taskTitle || '',
                                taskDescription: taskDescription || '',
                                avatarImg: '/spotfix/img/empty_avatar.png',
                                nodePath: taskNodePath,
                            };
                            document.querySelector(".doboard_task_widget-all_issues-container").innerHTML += await this.loadTemplate('list_issues', variables);

                            let taskElement = taskAnalysis(taskData);
                            if (taskElement) {
                                if ( taskData.startSelectPosition !== undefined && taskData.endSelectPosition !== undefined ) {
                                    let text = taskElement.innerHTML;
                                    let start = taskData.startSelectPosition;
                                    let end = taskData.endSelectPosition;
                                    let selectedText = text.substring(start, end);
                                    let beforeText = text.substring(0, start);
                                    let afterText = text.substring(end);
                                    taskElement.innerHTML = beforeText + '<span class="doboard_task_widget-text_selection">' + selectedText + '</span>' + afterText;
                                }
                            }
                        }
                    }
                }
                if (tasks.length === 0 || issuesQuantityOnPage === 0) {
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
     *
     * @param templateName
     * @param variables
     * @return {Promise<string>}
     * @ToDo have to refactor templates loaded method: need to be templates included into the bundle
     *
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
    async submitTask(taskDetails) {

        if (!localStorage.getItem('spotfix_session_id')) {
            await this.registerUser(taskDetails);
        }

        const sessionId = localStorage.getItem('spotfix_session_id');
        return await this.createTask(sessionId, taskDetails);
    }

    /**
     * Create a task
     * @param {*} taskDetails
     * @param {string} sessionId
     */
    createTask(sessionId, taskDetails) {
        return createTaskDoboard(sessionId, taskDetails)
            .then(response => {
                return response;
            });
    }

    registerUser(taskDetails) {
        const userEmail = taskDetails.userEmail;
        const userName = taskDetails.userName;
        const projectToken = taskDetails.projectToken;
        const accountId = taskDetails.accountId;

        return registerUser(projectToken, accountId, userEmail, userName)
            .then(response => {
                if (response.sessionId) {
                    localStorage.setItem('spotfix_session_id', response.sessionId);
                    localStorage.setItem('spotfix_user_id', response.userId);
                    localStorage.setItem('spotfix_email', response.email);
                } else {
                    throw new Error('Session ID not found in response');
                }
            })
            .catch(error => {
                throw error;
            });
    }

    /**
     * Get the task
     *
     * @return {any|Promise<*|undefined>|{}}
     */
    getTasks() {
        if (!localStorage.getItem('spotfix_session_id')) {
            return {};
        }

        const projectToken = this.params.projectToken;
        const sessionId = localStorage.getItem('spotfix_session_id');

        return getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
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

    bindWidgetInputsInteractive() {
        // Customising placeholders
        const inputs = document.querySelectorAll('.doboard_task_widget-field');
        inputs.forEach(input => {
            if (input.value) {
                input.classList.add('has-value');
            }

            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.classList.remove('has-value');
                }
            });
        });

        // Customising accordion dropdown
        const accordionController = document.querySelector('.doboard_task_widget-login span');
        if ( accordionController ) {
            accordionController.addEventListener('click', function() {
                this.closest('.doboard_task_widget-login').classList.toggle('active');
            });
        }
    }
}
