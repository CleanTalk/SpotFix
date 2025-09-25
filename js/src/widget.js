/**
 * Widget class to create a task widget
 */
class CleanTalkWidgetDoboard {
    selectedText = '';
    selectedData = {};
    widgetElement = null;
    params = {};
    currentActiveTaskId = 0;
    savedIssuesQuantityOnPage = 0;
    savedIssuesQuantityAll = 0;
    allTasksData = {};

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

        // Check if email_confirmation_token is in URL
        const urlParams = new URLSearchParams(window.location.search);
        const emailToken = urlParams.get('email_confirmation_token');
        if (emailToken) {
            try {
                // Confirm email and create task
                const createdTask = await confirmUserEmail(emailToken, this.params);
                this.allTasksData = await getAllTasks(this.params);
                // Open task interface
                this.currentActiveTaskId = createdTask.taskId;
                type = 'concrete_issue';
                storageSetWidgetIsClosed(false);
                // Clear email_confirmation_token from URL
                urlParams.delete('email_confirmation_token');
                const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.history.replaceState({}, document.title, newUrl);
            } catch (err) {
                this.registrationShowMessage('Error confirming email: ' + err.message, 'error');
            }
        } else {
            // Load all tasks
            this.allTasksData = await getAllTasks(this.params);
        }

        // Check if any task has updates
        let taskHasSiteOwnerUpdate;

        if (storageTasksHasUnreadUpdates()) {
            taskHasSiteOwnerUpdate = true;
        } else {
            if (type === 'wrap') {
                taskHasSiteOwnerUpdate = await checkIfTasksHasSiteOwnerUpdates(
                    this.allTasksData,
                    this.params
                );
            }
        }
        storageSaveTasksUpdateData(this.allTasksData);
        //check to hide on first run
        if (!storageWidgetCloseIsSet()) {
            storageSetWidgetIsClosed(true);
        }
        //check to show if any task has site owner updates
        if (taskHasSiteOwnerUpdate) {
            storageSetWidgetIsClosed(false);
        }
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
                submitButton.innerText = 'Creating spot...';

                let taskDetails = {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    //typeSend: typeSend,
                    selectedData: this.selectedData,
                    projectToken: this.params.projectToken,
                    projectId: this.params.projectId,
                    accountId: this.params.accountId,
                    taskMeta: JSON.stringify(this.selectedData),
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

                // Save pending task in LS
                localStorage.setItem('spotfix_pending_task', JSON.stringify({
                    ...this.selectedData,
                    description: taskDescription
                }));

                let submitTaskResult;
                try {
                    submitTaskResult = await this.submitTask(taskDetails);
                } catch (error) {
                    this.registrationShowMessage(error.message);
                    return;
                }

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

                // refersh tasks list after creation
                this.allTasksData = await getAllTasks(this.params);
                // save updates
                storageSaveTasksUpdateData(this.allTasksData);

                this.selectedData = {};
                await this.createWidgetElement('all_issues');
                storageSetWidgetIsClosed(false);
                hideContainersSpinner(false);
            });
        }
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
    async createWidgetElement(type, showOnlyCurrentPage = true) {
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
                storageGetUserIsDefined() && storageSetWidgetIsClosed(false);
                break;
            case 'wrap':
                if (storageGetWidgetIsClosed()) {
                    return;
                }
                templateName = 'wrap';
                break;
            case 'all_issues':
                templateName = 'all_issues';
                break;
            case 'concrete_issue':
                templateName = 'concrete_issue';
                // Update the number of tasks
                this.savedIssuesQuantityAll = Array.isArray(this.allTasksData) ? this.allTasksData.length : 0;
                // Calculate the number of issues on the current page
                this.savedIssuesQuantityOnPage = Array.isArray(this.allTasksData)
                    ? this.allTasksData.filter(task => {
                        try {
                            const meta = task.taskMeta ? JSON.parse(task.taskMeta) : {};
                            return meta.pageURL === window.location.href;
                        } catch (e) { return false; }
                    }).length
                    : 0;
                variables = {
                    issueTitle: '...',
                    issuesCounter: getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll),
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

        // remove highlights before any screen called
        this.removeHighlights();

        switch (type) {
            case 'create_issue':
                // highlight selected item during task creation
                const selection = window.getSelection();
                if (
                    selection.type === 'Range'
                ) {
                    const selectedData = getSelectedData(selection);
                    this.highlightElements([selectedData]);
                }
                // bind creation events
                this.bindCreateTaskEvents();
                break;
            case 'wrap':
                await this.getTaskCount();
                document.querySelector('.doboard_task_widget-wrap').addEventListener('click', (e) => {
                    const widgetElementClasses = e.currentTarget.classList;
                    if (widgetElementClasses && !widgetElementClasses.contains('hidden')) {
                        this.createWidgetElement('all_issues');
                    }
                });
                hideContainersSpinner(false);
                break;
            case 'all_issues':
                this.removeHighlights();
                let issuesQuantityOnPage = 0;
                let tasks = this.allTasksData;
                let spotsToBeHighlighted = [];
                if (tasks.length > 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';
                    for (let i = 0; i < tasks.length; i++) {
                        const elTask = tasks[i];

                        // Data from api
                        const taskId = elTask.taskId;
                        const taskTitle = elTask.taskTitle;
                        const taskMetaString = elTask.taskMeta;
                        const taskData = taskMetaString ? JSON.parse(taskMetaString) : null;
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
                            const taskFullDetails = await getTaskFullDetails(this.params, taskId);

                            const avatarData = getAvatarData(taskFullDetails);
                            const variables = {
                                taskTitle: taskTitle || '',
                                taskAuthorAvatarImgSrc: taskFullDetails.taskAuthorAvatarImgSrc,
                                taskAuthorName: taskFullDetails.taskAuthorName,
                                taskPublicStatusImgSrc: taskPublicStatusImgSrc,
                                taskPublicStatusHint: taskPublicStatusHint,
                                taskLastMessage: taskFullDetails.lastMessageText,
                                taskLastUpdate: taskFullDetails.lastMessageTime,
                                nodePath: taskNodePath,
                                taskId: taskId,
                                avatarCSSClass: avatarData.avatarCSSClass,
                                avatarStyle: avatarData.avatarStyle,
                                taskAuthorInitials: avatarData.taskAuthorInitials,
                                initialsClass: avatarData.initialsClass,
                                classUnread: ''
                            };
                            const taskOwnerReplyIsUnread = storageProvidedTaskHasUnreadUpdates(taskFullDetails.taskId);
                            if (taskOwnerReplyIsUnread) {
                                variables.classUnread = 'unread';
                            }
                            document.querySelector(".doboard_task_widget-all_issues-container").innerHTML += await this.loadTemplate('list_issues', variables);

                            spotsToBeHighlighted.push(taskData);
                        }
                    }
                    this.savedIssuesQuantityOnPage = issuesQuantityOnPage;
                    this.savedIssuesQuantityAll = tasks.length;
                    this.highlightElements(spotsToBeHighlighted);
                    document.querySelector('.doboard_task_widget-header span').innerText += ' ' + getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll);
                }
                if (tasks.length === 0 || issuesQuantityOnPage === 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
                }

                // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
                this.bindIssuesClick();
                hideContainersSpinner(false);
                break;

            case 'concrete_issue':

                const taskDetails = await getTaskFullDetails(this.params, this.currentActiveTaskId);

                // Update issue title in the interface
                const issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                if (issueTitleElement) {
                    issueTitleElement.innerText = taskDetails.issueTitle;
                }

                variables = {
                    issueTitle: taskDetails.issueTitle,
                    issueComments: taskDetails.issueComments,
                    issuesCounter: getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll),
                    paperclipImgSrc: '/spotfix/img/send-message--paperclip.svg',
                    sendButtonImgSrc: '/spotfix/img/send-message--button.svg',
                    msgFieldBackgroundImgSrc: '/spotfix/img/send-message--input-background.svg',
                };

                widgetContainer.innerHTML = await this.loadTemplate('concrete_issue', variables);
                document.body.appendChild(widgetContainer);

                // Highlight the task's selected text
                let nodePath = null;
                    const currentTaskData = this.allTasksData.find((element) => String(element.taskId) === String(taskDetails.taskId));
                    let meta = null;
                    if (currentTaskData && currentTaskData.taskMeta) {
                        try {
                            meta = JSON.parse(currentTaskData.taskMeta);
                            nodePath = meta.nodePath || null;
                        } catch (e) { nodePath = null; meta = null; }
                    }
                    // remove old highlights before adding new ones
                    this.removeHighlights();
                    if (meta && nodePath) {
                        // Pass the task meta object as an array
                        this.highlightElements([meta]);
                        if (typeof scrollToNodePath === 'function') {
                            scrollToNodePath(nodePath);
                        }
                    }

                const issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
                let dayMessagesData = [];
                const initIssuerID = localStorage.getItem('spotfix_user_id');
                let userIsIssuer = false;
                if ( taskDetails.issueComments.length > 0 ) {
                    storageRemoveUnreadUpdateForTaskID(taskDetails.taskId);
                    issuesCommentsContainer.innerHTML = '';
                    for (const comment of taskDetails.issueComments) {
                        userIsIssuer = Number(initIssuerID) === Number(comment.commentUserId);
                        const avatarData = getAvatarData({
                            taskAuthorAvatarImgSrc: comment.commentAuthorAvatarSrc,
                            taskAuthorName: comment.commentAuthorName,
                            userIsIssuer: userIsIssuer
                        });
                        const commentData = {
                            commentAuthorName: comment.commentAuthorName,
                            commentBody: comment.commentBody,
                            commentDate: comment.commentDate,
                            commentTime: comment.commentTime,
                            issueTitle: variables.issueTitle,
                            commentContainerBackgroundSrc: userIsIssuer
                                ? '/spotfix/img/comment-self-background.png'
                                : '/spotfix/img/comment-other-background.png',
                            avatarCSSClass: avatarData.avatarCSSClass,
                            avatarStyle: avatarData.avatarStyle,
                            taskAuthorInitials: avatarData.taskAuthorInitials,
                            initialsClass: avatarData.initialsClass
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

                // Hide spinner preloader
                hideContainersSpinner();

                // Scroll to the bottom comments
                setTimeout(() => {
                    const contentContainer = document.querySelector('.doboard_task_widget-content');
                    contentContainer.scrollTo({
                        top: contentContainer.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 0);

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
                            hideContainersSpinner(false);
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
        const widgetClass = this;
        if ( backToAllIssuesController ) {
            backToAllIssuesController.addEventListener('click', function(e, self = widgetClass) {
                self.createWidgetElement('all_issues');
            });
        }

        const paperclipController = document.querySelector('.doboard_task_widget-send_message_paperclip');
        if ( paperclipController ) {
            paperclipController.addEventListener('click', function(e) {
                e.preventDefault();
                alert('This action is not implemented yet..');
            });
        }

        document.querySelector('.doboard_task_widget-close_btn')?.addEventListener('click', () => {
            this.hide();
        }) || '';

        document.querySelector('#doboard_task_widget-task_count')?.addEventListener('click', () => {
            const widget = document.querySelector('.doboard_task_widget-wrap');
            widget.classList.add('hidden');
            storageSetWidgetIsClosed(true);
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

                const taskHighlightData = this.getTaskHighlightData(this.currentActiveTaskId)

                if (taskHighlightData) {
                    this.removeHighlights();
                    this.highlightElements([taskHighlightData])
                }

                hideContainersSpinner(false);
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

        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            template = template.replaceAll(placeholder, escapeHtml(String(value)));
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
        const filteredTasks = tasks.filter(task => {
            return task.taskMeta;
        });
        const taskCountElement = document.getElementById('doboard_task_widget-task_count');
        if ( taskCountElement ) {
            taskCountElement.innerText = filteredTasks.length;
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
            await registerUser(taskDetails)(this.registrationShowMessage);
            if ( taskDetails.userPassword ) {
                await loginUser(taskDetails)(this.registrationShowMessage);
            }
        }

        const sessionId = localStorage.getItem('spotfix_session_id');

        if ( ! sessionId ) {
            // @ToDo move this return in register block code
            return {needToLogin: true};
        }
        return await handleCreateTask(sessionId, taskDetails);
    }

    /**
     * Hide the widget
     */
    hide() {
        this.removeHighlights();
        this.createWidgetElement('wrap');
    }

    removeHighlights() {
        const textSelectionclassName = 'doboard_task_widget-text_selection';
        const spans = document.querySelectorAll('.' + textSelectionclassName);
        const affectedParents = new Set(); // Track unique parents

        spans.forEach(span => {
            const parent = span.parentNode;
            affectedParents.add(parent); // Mark parent as affected

            // Move all child nodes out of the span and into the parent
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        });

        // Normalize all affected parents to merge adjacent text nodes
        affectedParents.forEach(parent => parent.normalize());
    }

    wrapElementWithSpotfixHighlight(element) {
        const newElement = element.cloneNode();
        const wrapper = document.createElement('span');
        wrapper.className = 'doboard_task_widget-text_selection image-highlight';

        element.insertAdjacentElement('beforebegin', wrapper);
        wrapper.appendChild(newElement);

        return wrapper;
    }

    /**
     * Get task spot data for highlighting.
     * @param {string|int} taskIdToSearch
     * @returns {object|null}
     */
    getTaskHighlightData(taskIdToSearch) {
        const currentTaskData = this.allTasksData.find((element) => element.taskId.toString() === taskIdToSearch.toString());
        if (currentTaskData && currentTaskData.taskMeta !== undefined) {
            const currentTaskSpotData = JSON.parse(currentTaskData.taskMeta);
            if (currentTaskSpotData !== null && typeof currentTaskSpotData === 'object') {
                return currentTaskSpotData;
            }
        }
        return null;
    }

    /**
     * Highlight elements.
     * @param {[object]} spotsToBeHighlighted
     */
    highlightElements(spotsToBeHighlighted) {


        if (spotsToBeHighlighted.length === 0) return;

        const elementsMap = new Map();

        // Gropuing elements
        spotsToBeHighlighted.forEach(spot => {
            const element = retrieveNodeFromPath(spot.nodePath);
            if (!element) return;

            if (!elementsMap.has(element)) {
                elementsMap.set(element, []);
            }
            elementsMap.get(element).push(spot);
        });

        elementsMap.forEach((spots, element) => {
            const spotfixHighlightOpen = '<span class="doboard_task_widget-text_selection">';
            const spotfixHighlightClose = '</span>';

            const imgType = spots[0].isTagOfImageType;

            if (imgType !== false) {
                if (
                    imgType === 'IMG'
                ) {
                    const wrappedElement = this.wrapElementWithSpotfixHighlight(element);
                    element.replaceWith(wrappedElement);
                }
            }

            let text = element.textContent;
            const markers = [];

            // Mark positions for inserting
            spots.forEach(spot => {
                if (spot.isWholeTagSelected) {
                    markers.push({ position: 0, type: 'start' });
                    markers.push({ position: text.length, type: 'end' });
                } else {
                    markers.push({ position: spot.startSelectPosition, type: 'start' });
                    markers.push({ position: spot.endSelectPosition, type: 'end' });
                }
            });

            // Sort markers backward
            markers.sort((a, b) => b.position - a.position);

            let result = text;
            markers.forEach(marker => {
                const insertText = marker.type === 'start'
                    ? spotfixHighlightOpen
                    : spotfixHighlightClose;

                result = result.slice(0, marker.position) + insertText + result.slice(marker.position);
            });

            element.innerHTML = result;
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

    registrationShowMessage(messageText, type = 'error') {
        const titleSpan = document.getElementById('doboard_task_widget-error_message-header');
        const messageDiv = document.getElementById('doboard_task_widget-error_message');
        const messageWrap = document.querySelector('.doboard_task_widget-message-wrapper');

        if (typeof messageText === 'string' && messageDiv !== null && messageWrap !== null) {
            messageDiv.innerText = messageText;
            messageWrap.classList.remove('hidden');
            messageDiv.classList.remove('doboard_task_widget-notice_message', 'doboard_task_widget-error_message');
            if (type === 'notice') {
                titleSpan.innerText = 'Notice';
                messageWrap.classList.add('doboard_task_widget-notice_message');
                messageDiv.style.color = '#2a5db0';
            } else {
                titleSpan.innerText = 'Registration error';
                messageWrap.classList.add('doboard_task_widget-error_message');
                messageDiv.style.color = 'red';
            }
        }
    }
}
