/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';
    selectedData = {};
    widgetElement = null;
    params = {};
    currentActiveTaskId = 0;

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
                let userPassword = '';
                const loginSectionElement = document.querySelector('.doboard_task_widget-login');

                if ( loginSectionElement && loginSectionElement.classList.contains('active') ) {
                    const userEmailElement = document.getElementById('doboard_task_widget-user_email');
                    const userNameElement = document.getElementById('doboard_task_widget-user_name');
                    const userPasswordElement = document.getElementById('doboard_task_widget-user_password');

                    userEmail = userEmailElement.value;
                    if ( ! userEmail ) {
                        userEmailElement.style.borderColor = 'red';
                        userEmailElement.focus();
                        userEmailElement.addEventListener('input', function() {
                            this.style.borderColor = '';
                        });
                        return;
                    }

                    // This is the registration request
                    if ( userEmailElement && userNameElement ) {
                        userName = userNameElement.value;
                        if ( ! userName ) {
                            userNameElement.style.borderColor = 'red';
                            userNameElement.focus();
                            userNameElement.addEventListener('input', function() {
                                this.style.borderColor = '';
                            });
                            return;
                        }
                    }

                    // This is the login request
                    if ( userEmailElement && userPasswordElement && ! userNameElement ) {
                        userPassword = userPasswordElement.value;
                        if ( ! userPassword ) {
                            userPasswordElement.style.borderColor = 'red';
                            userPasswordElement.focus();
                            userPasswordElement.addEventListener('input', function() {
                                this.style.borderColor = '';
                            });
                            return;
                        }
                    }

                }

                // If it is the login request
                const userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userEmail = userEmailElement.value;

                // Make the submit button disable with spinner
                const submitButton = document.getElementById('doboard_task_widget-submit_button');
                submitButton.disabled = true;
                submitButton.style.cursor = 'waiting';

                let taskDetails = {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    //typeSend: typeSend,
                    selectedData: this.selectedData,
                    projectToken: this.params.projectToken,
                    projectId: this.params.projectId,
                    accountId: this.params.accountId,
                };
                if ( userEmail ) {
                    taskDetails.userEmail = userEmail
                }
                if ( userName ) {
                    taskDetails.userName = userName
                }
                if ( userPassword ) {
                    taskDetails.userPassword = userPassword
                }
                const submitTaskResult = await this.submitTask(taskDetails);

                // Return the submit button normal state
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';

                if ( submitTaskResult.needToLogin ) {
                    // @ToDo Do not know what to de here: throw an error or pass log message?
                    return;
                }

                if ( submitTaskResult.isPublic !== undefined ) {
                    this.selectedData.isPublic = submitTaskResult.isPublic
                }

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
    async createWidgetElement(type, showOnlyCurrentPage = false) {
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
            case 'concrete_issue':
                templateName = 'concrete_issue';
                // todo: this is call duplicate!
                const taskDetails = await getTaskFullDetails(this.params, this.currentActiveTaskId);
                variables = {
                    issueTitle: taskDetails.issueTitle,
                    issueComments: taskDetails.issueComments,
                    issuesCounter: getIssuesCounterString(),
                    paperclipImgSrc: '/spotfix/img/send-message--paperclip.svg',
                    sendButtonImgSrc: '/spotfix/img/send-message--button.svg',
                    msgFieldBackgroundImgSrc: '/spotfix/img/send-message--input-background.svg',
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
                this.getTaskCount();
                document.querySelector('.doboard_task_widget-wrap').addEventListener('click', () => {
                    this.createWidgetElement('all_issues');
                });
                break;
            case 'all_issues':
                let issuesQuantityOnPage = 0;
                //let tasks = await getUserTasks(this.params);
                let tasks = await getAllTasks(this.params);
                saveUserData(tasks);
                if (tasks.length > 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';
                    for (let i = 0; i < tasks.length; i++) {
                        const elTask = tasks[i];

                        // Data from api
                        const taskId = elTask.taskId;
                        const taskTitle = elTask.taskTitle;
                        const { time: lastMessageTime } = formatDate(elTask.taskLastUpdate);

                        // Data from local storage
                        const taskDataString = localStorage.getItem(`spotfix_task_data_${taskId}`);
                        const taskData = taskDataString ? JSON.parse(taskDataString) : null;
                        const currentPageURL = taskData ? taskData.pageURL : '';
                        const taskNodePath = taskData ? taskData.nodePath : '';

                        // Define publicity details
                        let taskPublicStatusImgSrc = '';
                        let taskPublicStatusHint = 'Task publicity is unknown'
                        if (taskData && taskData.isPublic !== undefined) {
                            if (taskData.isPublic) {
                                taskPublicStatusImgSrc = '/spotfix/img/public.svg';
                                taskPublicStatusHint = 'The task is public';
                            } else {
                                taskPublicStatusImgSrc = '/spotfix/img/private.svg';
                                taskPublicStatusHint = 'The task is private and visible only for registered DoBoard users';
                            }
                        }

                        if (!showOnlyCurrentPage || currentPageURL === window.location.href) {
                            issuesQuantityOnPage++;
                            //define last message and update time
                            /* let lastMessageDetails = await getTaskLastMessageDetails(this.params, taskId);
                            const authorDetails = getTaskAuthorDetails(this.params, '1'); // todo MOCK! */
                            const taskFullDetails = await getTaskFullDetails(this.params, taskId);
                            const variables = {
                                taskTitle: taskTitle || '',
                                taskAuthorAvatarImgSrc: taskFullDetails.taskAuthorAvatarImgSrc,
                                taskAuthorName: taskFullDetails.taskAuthorName,
                                taskPublicStatusImgSrc: taskPublicStatusImgSrc,
                                taskPublicStatusHint: taskPublicStatusHint,
                                taskLastMessage: taskFullDetails.lastMessageText,
                                taskLastUpdate: lastMessageTime,
                                nodePath: taskNodePath,
                                taskId: taskId
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
                    document.querySelector('.doboard_task_widget-header span').innerText += ' (' + issuesQuantityOnPage + ')';
                }
                if (tasks.length === 0 || issuesQuantityOnPage === 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
                }

                // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
                this.bindIssuesClick();
                break;

            case 'concrete_issue':
                const taskDetails = await getTaskFullDetails(this.params, this.currentActiveTaskId);
	            console.log(taskDetails);

                variables = {
                    issueTitle: taskDetails.issueTitle,
                    issueComments: taskDetails.issueComments,
                    issuesCounter: getIssuesCounterString(),
                    chevronBackTitle: 'Back to all issues',
                };
                const issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
                let dayMessagesData = [];
                const initIssuerID = localStorage.getItem('spotfix_user_id');
                console.table('initIssuerID',initIssuerID)
                let userIsIssuer = false;
                if ( taskDetails.issueComments.length > 0 ) {
                    issuesCommentsContainer.innerHTML = '';
                    for (const comment of taskDetails.issueComments) {
                        userIsIssuer = Number(initIssuerID) === Number(comment.commentUserId);
                        const commentData = {
                            commentAuthorAvatarSrc: comment.commentAuthorAvatarSrc,
                            commentAuthorName: comment.commentAuthorName,
                            commentBody: comment.commentBody,
                            commentDate: comment.commentDate,
                            commentTime: comment.commentTime,
                            issueTitle: variables.issueTitle,
                            issuesCounter: variables.issuesCounter,
                            commentContainerBackgroundSrc: userIsIssuer
                                ? '/spotfix/img/comment-self-background.png'
                                : '/spotfix/img/comment-other-background.png',
                            additionalClasses: userIsIssuer
                                ? 'doboard_task_widget-hidden_element'
                                : ''
                        };
                        if (dayMessagesData[comment.commentDate] === undefined) {
                            dayMessagesData[comment.commentDate] = [];
                            dayMessagesData[comment.commentDate].push(commentData);
                        } else {
                            dayMessagesData[comment.commentDate].push(commentData);
                        }
                    }
                    let daysWrapperHTML = '';
                    for (const day in dayMessagesData) {
                        let currentDayMessages = dayMessagesData[day];
                        let dayMessagesWrapperHTML = '';
                        currentDayMessages.sort((a, b) => a.commentTime.localeCompare(b.commentTime));
                        for (const messageId in currentDayMessages) {
                            let currentMessageData = currentDayMessages[messageId];
                            dayMessagesWrapperHTML += await this.loadTemplate('concrete_issue_messages', currentMessageData);
                        }
                        daysWrapperHTML += await this.loadTemplate('concrete_issue_day_content', {dayContentMonthDay: day, dayContentMessages: dayMessagesWrapperHTML});
                    }
                    issuesCommentsContainer.innerHTML = daysWrapperHTML;
                } else {
                    issuesCommentsContainer.innerHTML = 'No comments';
                }

                const sendForm = document.querySelector('.doboard_task_widget-send_message form');
                if (sendForm) {
                    sendForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const input = sendForm.querySelector('.doboard_task_widget-send_message_input');
                        const commentText = input.value.trim();
                        if (!commentText) return;
                        input.disabled = true;
                        try {
                            await addTaskComment(this.params, this.currentActiveTaskId, commentText);
                            input.value = '';
                            await this.createWidgetElement('concrete_issue');
                        } catch (err) {
                            alert('Error when adding a comment: ' + err.message);
                        }
                        input.disabled = false;
                    });
                }
                break;

            default:
                break;
        }

        const backToAllIssuesController = document.querySelector('.doboard_task_widget_return_to_all');
        if ( backToAllIssuesController ) {
            const widgetClass = this;
            backToAllIssuesController.addEventListener('click', function(e, self = widgetClass) {
                self.createWidgetElement('all_issues');
            });
        }

        const paperclipController = document.querySelector('.doboard_task_widget-send_message_paperclip');
        if ( paperclipController ) {
            paperclipController.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('click')
                alert('This action is not implemented yet..');
            });
        }

        document.querySelector('.doboard_task_widget-close_btn')?.addEventListener('click', () => {
            this.hide();
        }) || '';
        return widgetContainer;
    }

    bindIssuesClick() {
        document.querySelectorAll('.issue-item').forEach(item => {
            item.addEventListener('click', async () => {
                const nodePath = JSON.parse(item.getAttribute('data-node-path'));
                scrollToNodePath(nodePath);
                this.currentActiveTaskId = item.getAttribute('data-task-id');
                await this.createWidgetElement('concrete_issue');
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

    async getTaskCount() {
        if (!localStorage.getItem('spotfix_session_id')) {
            return {};
        }

        const projectToken = this.params.projectToken;
        const sessionId = localStorage.getItem('spotfix_session_id');

        const tasks = await getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
        const taskCountElement = document.getElementById('doboard_task_widget-task_count');
        if ( taskCountElement ) {
            taskCountElement.innerText = tasks.length;
            taskCountElement.classList.remove('hidden');
        }
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

            if ( taskDetails.userPassword ) {
                await this.loginUser(taskDetails);
            }
        }

        const sessionId = localStorage.getItem('spotfix_session_id');

        if ( ! sessionId ) {
            // @ToDo move this return in register block code
            return {needToLogin: true};
        }
        return await handleCreateTask(sessionId, taskDetails);
    }

    registerUser(taskDetails) {
        const userEmail = taskDetails.userEmail;
        const userName = taskDetails.userName;
        const projectToken = taskDetails.projectToken;
        const accountId = taskDetails.accountId;

        return registerUser(projectToken, accountId, userEmail, userName)
            .then(response => {
                if (response.accountExists) {
                    document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container").innerText = 'Account already exists. Please, login usin your password.';
                    document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container.hidden").classList.remove('hidden');
                    document.getElementById("doboard_task_widget-user_password").focus();
                } else if (response.sessionId) {
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

    loginUser(taskDetails) {
        const userEmail = taskDetails.userEmail;
        const userPassword = taskDetails.userPassword;

        return loginUser(userEmail, userPassword)
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
