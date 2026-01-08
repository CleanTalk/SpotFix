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
    srcVariables = {};

    /**
     * Constructor
     */
    constructor(selectedData, type) {
        this.selectedData = selectedData || '';
        this.selectedText = selectedData?.selectedText || '';
        this.init(type);
        this.srcVariables = {
            buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
            iconEllipsesMore: SpotFixSVGLoader.getAsDataURI('iconEllipsesMore'),
            iconPlus: SpotFixSVGLoader.getAsDataURI('iconPlus'),
            iconMaximize: SpotFixSVGLoader.getAsDataURI('iconMaximize'),
            chevronBack: SpotFixSVGLoader.getAsDataURI('chevronBack'),
            buttonPaperClip: SpotFixSVGLoader.getAsDataURI('buttonPaperClip'),
            buttonSendMessage: SpotFixSVGLoader.getAsDataURI('buttonSendMessage'),
            logoDoBoardGreen: SpotFixSVGLoader.getAsDataURI('logoDoBoardGreen'),
            logoDoBoardWrap: SpotFixSVGLoader.getAsDataURI('logoDoBoardWrap'),
            iconSpotWidgetWrapPencil: SpotFixSVGLoader.getAsDataURI('iconSpotWidgetWrapPencil'),
            iconMarker: SpotFixSVGLoader.getAsDataURI('iconMarker'),
            iconSpotPublic: SpotFixSVGLoader.getAsDataURI('iconSpotPublic'),
            iconSpotPrivate: SpotFixSVGLoader.getAsDataURI('iconSpotPrivate'),
            iconLinkChain: SpotFixSVGLoader.getAsDataURI('iconLinkChain'),
        };
        this.fileUploader = new FileUploader(this.escapeHtml);
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
            const isWidgetClosed = localStorage.getItem('spotfix_widget_is_closed');
            if((isWidgetClosed && !this.selectedText) || !isWidgetClosed){
                this.allTasksData = await getAllTasks(this.params);
            }
        }

        // Check if any task has updates
        let taskHasSiteOwnerUpdate;

        if (storageTasksHasUnreadUpdates()) {
            taskHasSiteOwnerUpdate = true;
        } else {
            if (type === 'wrap_review') {
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
        const script = document.querySelector(`script[src*="doboard-widget-bundle."]`);
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
                submitButton.innerText = ksesFilter('Creating spot...');

                let taskDetails = {
                    taskTitle: taskTitle,
                    taskDescription: taskDescription,
                    //typeSend: typeSend,
                    selectedData: this.selectedData,
                    projectToken: this.params.projectToken,
                    projectId: this.params.projectId,
                    accountId: this.params.accountId,
                    taskMeta: JSON.stringify(this.selectedData ? this.selectedData : { pageURL: window.location.href }),
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

    bindShowLoginFormEvents() {
        const showLoginButton = document.getElementById('doboard_task_widget-show_login_form');
        const showPhantomLoginButton = document.getElementById('doboard_task_widget-on_phantom_login_page');
        const forgotPasswordButton = document.getElementById('doboard_task_widget-forgot_password');
        const forgotPasswordButtonBlack = document.getElementById('doboard_task_widget-forgot_password-black');
        const loginButton = document.getElementById('doboard_task_widget-login_button');
        const restorePasswordButton = document.getElementById('doboard_task_widget-restore_password_button');

        if (showLoginButton) {
            showLoginButton.addEventListener('click', async () => {
                const loginContainer = document.querySelector('.doboard_task_widget-input-container-login');
                const phantomContainer = document.querySelector('.doboard_task_widget-input-container-phantom');
                if (loginContainer) {
                    loginContainer.classList.toggle('doboard_task_widget-hidden');
                }
                if (phantomContainer) {
                    phantomContainer.classList.toggle('doboard_task_widget-hidden');
                }
            })
        }
        if (showPhantomLoginButton) {
            showPhantomLoginButton.addEventListener('click', async () => {
                const loginContainer = document.querySelector('.doboard_task_widget-input-container-login');
                const phantomContainer = document.querySelector('.doboard_task_widget-input-container-phantom');
                if (loginContainer) {
                    loginContainer.classList.toggle('doboard_task_widget-hidden');
                }
                if (phantomContainer) {
                    phantomContainer.classList.toggle('doboard_task_widget-hidden');
                }
            })
        }
        if (forgotPasswordButton) {
            forgotPasswordButton.addEventListener('click', async () => {
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.getElementById('doboard_task_widget-input-container-login');
                
                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.remove('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.add('doboard_task_widget-hidden');
                }
            })

            forgotPasswordButtonBlack.addEventListener('click', async () => {
                const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
                const loginContainer = document.getElementById('doboard_task_widget-input-container-login');

                if (forgotPasswordForm) {
                    forgotPasswordForm.classList.add('doboard_task_widget-hidden');
                }
                if (loginContainer) {
                    loginContainer.classList.remove('doboard_task_widget-hidden');
                }
            })
        }
        if (loginButton) {
            loginButton.addEventListener('click', async () => {
                const userEmailElement = document.getElementById('doboard_task_widget-login_email');
                const userPasswordElement = document.getElementById('doboard_task_widget-login_password');
                document.querySelector('.doboard_task_widget-login-is-invalid').classList.add('doboard_task_widget-hidden');

                const userEmail = userEmailElement.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!userEmail) {
                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();
                    userEmailElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                } else if (!emailRegex.test(userEmail)) {
                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();
                    userEmailElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }

                const userPassword = userPasswordElement.value;
                if (!userPassword) {
                    userPasswordElement.style.borderColor = 'red';
                    userPasswordElement.focus();
                    userPasswordElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                } else if (userPassword.length < 6) {
                    userPasswordElement.style.borderColor = 'red';
                    userPasswordElement.focus();
                    userPasswordElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                }

                try {
                    await loginUser({
                        userEmail: userEmail,
                        userPassword: userPassword
                    })(this.registrationShowMessage);
                } catch (error) {
                    document.querySelector('.doboard_task_widget-login-is-invalid').classList.remove('doboard_task_widget-hidden');
                }
                const sessionIdExists = !!localStorage.getItem('spotfix_session_id');
                const email = localStorage.getItem('spotfix_email');
                if (sessionIdExists && email && !email.includes('spotfix_')) {
                    document.querySelector('.doboard_task_widget-login').classList.add('doboard_task_widget-hidden');
                } else {
                    document.querySelector('.doboard_task_widget-login-is-invalid').classList.remove('doboard_task_widget-hidden');
                }
            })
        }
        const passwordToggle = document.getElementById('doboard_task_widget-password-toggle');
        const passwordInput = document.getElementById('doboard_task_widget-login_password');
        
        if (passwordToggle && passwordInput) {
            passwordToggle.addEventListener('click', function() {
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                this.classList.toggle('doboard_task_widget-bottom-eye-off-icon');
                this.classList.toggle('doboard_task_widget-bottom-eye-icon');
            });
        }
        if (restorePasswordButton) {
            restorePasswordButton.addEventListener('click', async () => {
                const userEmailElement = document.getElementById('doboard_task_widget-forgot_password_email');
                const userEmail = userEmailElement.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!userEmail) {
                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();
                    userEmailElement.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                    return;
                } else if (!emailRegex.test(userEmail)) {

                    userEmailElement.style.borderColor = 'red';
                    userEmailElement.focus();

                    return;
                }

                try {
                    await forgotPassword(userEmail)(this.registrationShowMessage);
                } catch (error) {
                    this.registrationShowMessage(error.message, 'error');
                }
            })
        }
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
    async createWidgetElement(type, showOnlyCurrentPage = false) {
        const widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
        widgetContainer.className = 'doboard_task_widget';
        widgetContainer.innerHTML = ksesFilter('');
        widgetContainer.removeAttribute('style');

        let templateName = '';
        let tasksFullDetails;

        let templateVariables = {};

        const config = window.SpotfixWidgetConfig;
        const position = {
            compact: '0vh',
            short: '20vh',
            regular: '45vh',
            tall: '60vh',
            extra: '85vh',
        };

        switch (type) {
            case 'create_issue':
                templateName = 'create_issue';
                this.type_name = templateName;
                templateVariables = {
                    selectedText: this.selectedText,
                    currentDomain: document.location.hostname || '',
                    buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
                    iconMaximize: SpotFixSVGLoader.getAsDataURI('iconMaximize'),
                    iconEllipsesMore: SpotFixSVGLoader.getAsDataURI('iconEllipsesMore'),
                    ...this.srcVariables
                };
                storageGetUserIsDefined() && storageSetWidgetIsClosed(false);
                break;
            case 'wrap':
                if (storageGetWidgetIsClosed()) {
                    return;
                }

                templateName = 'wrap';
                templateVariables = {position: position[config?.verticalPosition] || position.compact, ...this.srcVariables};
                break;
            case 'wrap_review':
                templateName = 'wrap_review';
                templateVariables = {position: position[config?.verticalPosition] || position.compact, ...this.srcVariables};
                break;
            case 'all_issues':
                templateName = 'all_issues';
                this.type_name = templateName;
                templateVariables = {...this.srcVariables};
                break;
            case 'user_menu':
                templateName = 'user_menu';
                const versionFromLS = localStorage.getItem('spotfix_app_version');
                templateVariables = {
                    spotfixVersion: versionFromLS ? 'Spotfix version ' + versionFromLS + '.' : '',
                    avatar: SpotFixSVGLoader.getAsDataURI('iconAvatar'),
                    iconEye: SpotFixSVGLoader.getAsDataURI('iconEye'),
                    iconDoor: SpotFixSVGLoader.getAsDataURI('iconDoor'),
                    chevronBackDark: SpotFixSVGLoader.getAsDataURI('chevronBackDark'),
                    buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
                    userName: 'Guest',
                    email: localStorage.getItem('spotfix_email') || '',
                    ...this.srcVariables};
                break;
            case 'concrete_issue':
                templateName = 'concrete_issue';
                this.type_name = templateName;
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

                templateVariables = {
                    issueTitle: '...',
                    issueComments: [],
                    issuesCounter: getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll),
                    ...this.srcVariables,
                };
                break;
            default:
                break;
        }
        widgetContainer.innerHTML = this.loadTemplate(templateName, templateVariables);
        document.body.appendChild(widgetContainer);

        // remove highlights before any screen called
        spotFixRemoveHighlights();
        const container = document.querySelector('.doboard_task_widget-container');
        switch (type) {
            case 'create_issue':

                if(container && +localStorage.getItem('maximize')){
                    container.classList.add('doboard_task_widget-container-maximize');
                } else if(container) {
                    container.classList.remove('doboard_task_widget-container-maximize');
                }
                // highlight selected item during task creation
                const selection = window.getSelection();
                const sessionIdExists = !!localStorage.getItem('spotfix_session_id');
                const email = localStorage.getItem('spotfix_email');

                if (sessionIdExists && email && !email.includes('spotfix_')) {
                    document.querySelector('.doboard_task_widget-login').classList.add('hidden');
                }
                if (
                    selection.type === 'Range'
                ) {
                    const selectedData = spotFixGetSelectedData(selection);
                    spotFixScrollToNodePath(selectedData.nodePath);
                    this.positionWidgetContainer();
                }
                // bind creation events
                this.bindCreateTaskEvents();
                this.bindShowLoginFormEvents();
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
            case 'wrap_review':
                document.querySelector('#doboard_task_widget_button').addEventListener('click', (e) => {
                    spotFixOpenWidget(this.selectedData, 'create_issue');
                });
                break;
            case 'all_issues':
                    changeSize(container);

                    spotFixRemoveHighlights();
                let issuesQuantityOnPage = 0;
                if (!this.allTasksData?.length) {
                    this.allTasksData = await getAllTasks(this.params);
                }
                const tasks = this.allTasksData;
                tasksFullDetails = await getTasksFullDetails(this.params, tasks, this.currentActiveTaskId);
                let spotsToBeHighlighted = [];
                if (tasks.length > 0) {
                    const currentURL = window.location.href;
                    const sortedTasks = tasks.sort((a, b) => {
                        const aIsHere = JSON.parse(a.taskMeta).pageURL === currentURL ? 1 : 0;
                        const bIsHere = JSON.parse(b.taskMeta).pageURL === currentURL ? 1 : 0;
                        return bIsHere - aIsHere;
                    });

                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';

                    for (let i = 0; i < sortedTasks.length; i++) {
                        const elTask = sortedTasks[i];

                        // Data from api
                        const taskId = elTask.taskId;
                        const taskTitle = elTask.taskTitle;
                        const taskMetaString = elTask.taskMeta;
                        let taskData = null;
                        if (taskMetaString) {
                            try {
                                taskData = JSON.parse(taskMetaString);
                                taskData.isFixed = elTask.taskStatus === 'DONE';
                                taskData.taskId = elTask.taskId;
                            } catch (error) {
                                taskData = null;
                            }
                        }
                        const currentPageURL = taskData ? taskData.pageURL : '';
                        const taskNodePath = taskData ? taskData.nodePath : '';

                        // Define publicity details
                        let taskPublicStatusImgSrc = '';
                        let taskPublicStatusHint = 'Task publicity is unknown'
                        if (taskData && taskData.isPublic !== undefined) {
                            if (taskData.isPublic) {
                                taskPublicStatusImgSrc = this.srcVariables.iconSpotPublic;
                                taskPublicStatusHint = 'The task is public';
                            } else {
                                taskPublicStatusImgSrc = this.srcVariables.iconSpotPrivate;
                                taskPublicStatusHint = 'The task is private and visible only for registered DoBoard users';
                            }
                        }

                        if(currentPageURL === window.location.href){
                            issuesQuantityOnPage++;
                        }

                        if (!showOnlyCurrentPage || currentPageURL === window.location.href) {

                            const taskFullDetails = getTaskFullDetails(tasksFullDetails, taskId)

                            const avatarData = getAvatarData(taskFullDetails);
                            const listIssuesTemplateVariables = {
                                taskTitle: taskTitle || '',
                                taskAuthorAvatarImgSrc: taskFullDetails.taskAuthorAvatarImgSrc,
                                taskAuthorName: taskFullDetails.taskAuthorName,
                                taskPublicStatusImgSrc: taskPublicStatusImgSrc,
                                taskPublicStatusHint: taskPublicStatusHint,
                                taskLastMessage: ksesFilter(taskFullDetails.lastMessageText),
                                taskPageUrl: currentPageURL,
                                iconLinkChain: this.srcVariables.iconLinkChain,
                                taskFormattedPageUrl: spotFixSplitUrl(currentPageURL),
                                taskLastUpdate: taskFullDetails.lastMessageTime,
                                nodePath: this.sanitizeNodePath(taskNodePath),
                                taskId: taskId,
                                avatarCSSClass: avatarData.avatarCSSClass,
                                avatarStyle: avatarData.avatarStyle,
                                taskAuthorInitials: avatarData.taskAuthorInitials,
                                initialsClass: avatarData.initialsClass,
                                classUnread: '',
                                elementBgCSSClass: elTask.taskStatus !== 'DONE' ? '' : 'doboard_task_widget-task_row-green',
                                statusFixedHtml: elTask.taskStatus !== 'DONE' ? '' : this.loadTemplate('fixedHtml'),
                            };

                            const taskOwnerReplyIsUnread = storageProvidedTaskHasUnreadUpdates(taskFullDetails.taskId);
                            if (taskOwnerReplyIsUnread) {
                                listIssuesTemplateVariables.classUnread = 'unread';
                            }
                            document.querySelector(".doboard_task_widget-all_issues-container").innerHTML += this.loadTemplate('list_issues', listIssuesTemplateVariables);

                            if ( this.isSpotHaveToBeHighlighted(taskData) ) {
                                spotsToBeHighlighted.push(taskData);
                            }
                        }
                    }
                    this.savedIssuesQuantityOnPage = issuesQuantityOnPage;
                    this.savedIssuesQuantityAll = tasks.length;
                    spotFixHighlightElements(spotsToBeHighlighted, this);
                    document.querySelector('.doboard_task_widget-header span').innerHTML += ksesFilter(' ' + getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll));
                }

                if (tasks.length === 0) {
                    document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = ksesFilter('<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>');
                }

                // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
                this.bindIssuesClick();
                hideContainersSpinner(false);
                break;
        case 'user_menu':

                setToggleStatus(this);
                checkLogInOutButtonsVisible();

                const user = await getUserDetails(this.params);
                const gitHubAppVersion = await getReleaseVersion();
                let spotfixVersion = '';
                const version = localStorage.getItem('spotfix_app_version') || gitHubAppVersion;
                spotfixVersion = version ? `Spotfix version ${version}.` : '';

                templateVariables.spotfixVersion = spotfixVersion || '';

                if(user){
                    templateVariables.userName = user.name || 'Guest';
                    templateVariables.email = user.email || localStorage.getItem('spotfix_email') || '';
                    if(user?.avatar?.s) templateVariables.avatar = user?.avatar?.s;
                }

                widgetContainer.innerHTML = this.loadTemplate('user_menu', templateVariables);
                document.body.appendChild(widgetContainer);
                setToggleStatus(this);
                checkLogInOutButtonsVisible();
                this.bindShowLoginFormEvents();
                this.bindWidgetInputsInteractive();

                break;
        case 'concrete_issue':
                changeSize(container);
                tasksFullDetails = await getTasksFullDetails(this.params, this.allTasksData, this.currentActiveTaskId);
                const taskDetails = await getTaskFullDetails(tasksFullDetails, this.currentActiveTaskId);
                // Update issue title in the interface
                const issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                if (issueTitleElement) {
                    issueTitleElement.innerText = ksesFilter(taskDetails.issueTitle);
                }

                templateVariables.issueTitle = taskDetails?.issueTitle;
                templateVariables.issueComments = taskDetails?.issueComments;


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

            templateVariables.taskPageUrl = meta.pageURL;
            const taskFormattedPageUrl = meta.pageURL.replace(window.location.origin, '');
            templateVariables.taskFormattedPageUrl = taskFormattedPageUrl.length < 2
                ? meta.pageURL.replace(window.location.protocol + '/', '') : taskFormattedPageUrl;
            templateVariables.contenerClasess = +localStorage.getItem('maximize')
                ? 'doboard_task_widget-container-maximize doboard_task_widget-container' : 'doboard_task_widget-container'
            widgetContainer.innerHTML = this.loadTemplate('concrete_issue', templateVariables);
            document.body.appendChild(widgetContainer);

                    // remove old highlights before adding new ones
                    spotFixRemoveHighlights();

                    if (meta && nodePath) {
                        // Pass the task meta object as an array
                        spotFixHighlightElements([meta], this);
                        if (typeof spotFixScrollToNodePath === 'function') {
                            spotFixScrollToNodePath(nodePath);
                        }
                    }

                const issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
                let dayMessagesData = [];
                const initIssuerID = localStorage.getItem('spotfix_user_id');
                let userIsIssuer = false;
                if ( taskDetails.issueComments.length > 0 ) {
                    storageRemoveUnreadUpdateForTaskID(taskDetails.taskId);
                    issuesCommentsContainer.innerHTML = ksesFilter('');
                    for (const comment of taskDetails.issueComments) {
                        userIsIssuer = Number(initIssuerID) === Number(comment.commentUserId);
                        const avatarData = getAvatarData({
                            taskAuthorAvatarImgSrc: comment.commentAuthorAvatarSrc,
                            taskAuthorName: comment.commentAuthorName,
                        });
                        const commentData = {
                            commentAuthorName: comment.commentAuthorName,
                            commentBody: comment.commentBody,
                            commentDate: comment.commentDate,
                            commentTime: comment.commentTime,
                            issueTitle: templateVariables.issueTitle,
                            avatarCSSClass: avatarData.avatarCSSClass,
                            avatarStyle: avatarData.avatarStyle,
                            taskAuthorInitials: avatarData.taskAuthorInitials,
                            initialsClass: avatarData.initialsClass,
                            issueMessageClassOwner: userIsIssuer ? 'owner' : 'guest',
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
                            let currentMessageTemplateVariables = currentDayMessages[messageId];
                            dayMessagesWrapperHTML += this.loadTemplate('concrete_issue_messages', currentMessageTemplateVariables);
                        }
                        daysWrapperHTML += this.loadTemplate('concrete_issue_day_content',
                            {
                                dayContentMonthDay: day,
                                dayContentMessages: dayMessagesWrapperHTML,
                                statusFixedHtml: tasksFullDetails?.taskStatus !== 'DONE' ? '' : this.loadTemplate('fixedTaskHtml')
                            },
                        );
                    }
                    issuesCommentsContainer.innerHTML = daysWrapperHTML;
                } else {
                    issuesCommentsContainer.innerHTML = ksesFilter('No comments');
                }

                // textarea (new comment) behaviour
                const textarea = document.querySelector('.doboard_task_widget-send_message_input');
                if (textarea) {
                    function handleTextareaChange() {
                        const triggerChars = 40;

                        if (this.value.length > triggerChars) {
                            this.classList.add('high');
                        } else {
                            this.classList.remove('high');
                        }
                    }
                    textarea.addEventListener('input', handleTextareaChange)
                    textarea.addEventListener('change', handleTextareaChange)
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

                const sendButton = document.querySelector('.doboard_task_widget-send_message_button');
                if (sendButton) {
                    this.fileUploader.init();
                    let widgetClass = this;
                    sendButton.addEventListener('click', async (e) => {
                        e.preventDefault();

                        const sendMessageContainer = sendButton.closest('.doboard_task_widget-send_message');
                        const input = sendMessageContainer.querySelector('.doboard_task_widget-send_message_input');

                        const commentText = input.value.trim();
                        if (!commentText) return;

                        // Add other fields handling here

                        input.disabled = true;
                        sendButton.disabled = true;

                        let newCommentResponse = null;

                        try {
                            newCommentResponse = await addTaskComment(this.params, this.currentActiveTaskId, commentText);
                            input.value = '';
                            await this.createWidgetElement('concrete_issue');
                            hideContainersSpinner(false);
                        } catch (err) {
                            alert('Error when adding a comment: ' + err.message);
                        }

                        if (widgetClass.fileUploader.hasFiles() && newCommentResponse !== null && newCommentResponse.hasOwnProperty('commentId')) {
                            const sessionId = localStorage.getItem('spotfix_session_id');
                            const attachmentsSendResult = await widgetClass.fileUploader.sendAttachmentsForComment(widgetClass.params, sessionId, newCommentResponse.commentId);
                            if (!attachmentsSendResult.success) {
                                widgetClass.fileUploader.showError('Some files where no sent, see details in the console.');
                                const toConsole = JSON.stringify(attachmentsSendResult);
                                console.log(toConsole);
                            }
                        }

                        input.disabled = false;
                        sendButton.disabled = false;
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
            this.fileUploader.bindPaperClipAction(paperclipController);
        }

        document.querySelector('.doboard_task_widget-close_btn')?.addEventListener('click', (e) => {
            this.hide();
        }) || '';

        document.querySelector('#openUserMenuButton')?.addEventListener('click', () => {
            this.createWidgetElement('user_menu')
        }) || '';

        document.querySelector('#doboard_task_widget-user_menu-logout_button')?.addEventListener('click', () => {
            logoutUserDoboard(this.params.accountId);
        }) || '';

        document.getElementById('addNewTaskButton')?.addEventListener('click', () => {
            spotFixShowWidget();
        }) || '';

        document.getElementById('maximizeWidgetContainer')?.addEventListener('click', () => {
            const container = document.querySelector('.doboard_task_widget-container');

            if(+localStorage.getItem('maximize') && container.classList.contains('doboard_task_widget-container-maximize')){
                localStorage.setItem('maximize', '0');
                container.classList.remove('doboard_task_widget-container-maximize');
            } else {
                localStorage.setItem('maximize', '1');
                container.classList.add('doboard_task_widget-container-maximize');
            }
        }) || '';

        document.querySelector('#doboard_task_widget-user_menu-signlog_button')?.addEventListener('click', () => {
            spotFixShowWidget();
        }) || '';

        document.querySelector('#spotfix_back_button')?.addEventListener('click', () => {
            this.createWidgetElement(this.type_name)
        }) || '';

        return widgetContainer;
    }

    bindIssuesClick() {
        document.querySelectorAll('.issue-item').forEach(item => {
            item.addEventListener('click', async () => {
                let nodePath = null;
                try {
                    nodePath = JSON.parse(item.getAttribute('data-node-path'));
                } catch (error) {
                    nodePath = null;
                }
                if (nodePath) {
                    spotFixScrollToNodePath(nodePath);
                }
                this.currentActiveTaskId = item.getAttribute('data-task-id');
                await this.showOneTask();
            });
        });
    }

    /**
     * Show one task
     *
     * @return {Promise<void>}
     *
     */
    async showOneTask() {
        await this.createWidgetElement('concrete_issue');
        const taskHighlightData = this.getTaskHighlightData(this.currentActiveTaskId)

        if (taskHighlightData) {
            spotFixRemoveHighlights();
            spotFixHighlightElements([taskHighlightData], this)
            this.positionWidgetContainer();
        }

        hideContainersSpinner(false);
    }

    /**
     * Load the template
     *
     * @param templateName
     * @param variables
     * @return {string}
     * @ToDo have to refactor templates loaded method: need to be templates included into the bundle
     *
     */
    loadTemplate(templateName, variables = {}) {
        let template = SpotFixTemplatesLoader.getTemplateCode(templateName);

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            let replacement;

            // 1) For attributes we MUST use escapeHtml!
            // 2) Only for HTML inserts we must clean data by ksesFilter
            // Check if placeholder is used in an attribute context
            if (this.isPlaceholderInAttribute(template, placeholder)) {
                // For attributes, use escapeHtml to prevent XSS
                replacement = this.escapeHtml(String(value));
            } else {
                // For HTML content, use ksesFilter to sanitize HTML
                replacement = ksesFilter(String(value), {template: templateName, imgFilter: true});
            }

            template = template.replaceAll(placeholder, replacement);
        }

        return ksesFilter(template, {template: templateName});
    }

    /**
     * Check if a placeholder is used inside an HTML attribute
     * @param {string} template - The template string
     * @param {string} placeholder - The placeholder to check (e.g., "{{key}}")
     * @return {boolean} - True if placeholder is in an attribute context
     */
    isPlaceholderInAttribute(template, placeholder) {
        // Escape special regex characters in placeholder
        const escapedPlaceholder = placeholder.replace(/[{}]/g, '\\$&');

        // Pattern to match attribute="..." or attribute='...' containing the placeholder
        // This regex looks for: word characters (attribute name) = " or ' followed by content including the placeholder
        // Matches patterns like: src="{{key}}", class="{{key}}", style="{{key}}", etc.
        const attributePattern = new RegExp(
            `[\\w-]+\\s*=\\s*["'][^"']*${escapedPlaceholder}[^"']*["']`,
            'g'
        );

        // Check if placeholder appears in any attribute context
        // If it does, we'll use escapeHtml for all occurrences (safer approach)
        return attributePattern.test(template);
    }

    escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    async getTaskCount() {
        if (!localStorage.getItem('spotfix_session_id')) {
            return {};
        }

        const projectToken = this.params.projectToken;
        const sessionId = localStorage.getItem('spotfix_session_id');

        const tasksCountLS = localStorage.getItem('spotfix_tasks_count');

        let tasksCount;

        if(tasksCountLS !== 0 && !tasksCountLS){
            const tasks = await getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
            const filteredTasks = tasks.filter(task => {
                return task.taskMeta;
            });
            tasksCount = filteredTasks.length;
        } else tasksCount = tasksCountLS;

        const taskCountElement = document.getElementById('doboard_task_widget-task_count');
        if ( taskCountElement ) {
            taskCountElement.innerText = ksesFilter(tasksCount);
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
        spotFixRemoveHighlights();
        this.createWidgetElement('wrap');

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
            let currentTaskSpotData = null;
            try {
                currentTaskSpotData = JSON.parse(currentTaskData.taskMeta);
            } catch (error) {
                currentTaskSpotData = null;
            }
            if (currentTaskSpotData !== null && typeof currentTaskSpotData === 'object') {
                return currentTaskSpotData;
            }
        }
        return null;
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
            const context = this;
            accordionController.addEventListener('click', function() {
                this.closest('.doboard_task_widget-login').classList.toggle('active');
                // Scroll
                context.positionWidgetContainer();
                setTimeout(() => {
                    const contentContainer = document.querySelector('.doboard_task_widget-content');
                    contentContainer.scrollTo({
                        top: contentContainer.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 0);
            });
        }

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    registrationShowMessage(messageText, type = 'error') {
        const titleSpan = document.getElementById('doboard_task_widget-error_message-header');
        const messageDiv = document.getElementById('doboard_task_widget-error_message');
        const messageWrap = document.querySelector('.doboard_task_widget-message-wrapper');

        if (typeof messageText === 'string' && messageDiv !== null && messageWrap !== null) {
            messageDiv.innerText = ksesFilter(messageText);
            messageWrap.classList.remove('hidden');
            messageDiv.classList.remove('doboard_task_widget-notice_message', 'doboard_task_widget-error_message');
            if (type === 'notice') {
                titleSpan.innerText = ksesFilter('');
                messageWrap.classList.add('doboard_task_widget-notice_message');
                messageDiv.style.color = '#2a5db0';
            } else {
                titleSpan.innerText = ksesFilter('Registration error');
                messageWrap.classList.add('doboard_task_widget-error_message');
                messageDiv.style.color = 'red';
            }
        }
    }

    positionWidgetContainer() {
        const selection = document.querySelector('.doboard_task_widget-text_selection');
        const widget = document.querySelector('.doboard_task_widget')
        const widgetCreateIssue = document.querySelector('.doboard_task_widget-content.doboard_task_widget-create_issue')
        const widgetConcreteIssue = document.querySelector('.doboard_task_widget-concrete_issues-container')
        if ( ! ( ( widgetCreateIssue || widgetConcreteIssue ) && selection ) ) {
            // Skip if the widget is closed or highlight not exist
            return;
        }

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const selectionAbsoluteTop = selection.getBoundingClientRect().top + scrollY;

        const widgetHeight = widget.offsetHeight;

        let top;

        // Check selection position
        if (selectionAbsoluteTop - scrollY < 0) {
            // 1) The selection is above the viewport - stuck the widget on the top
            top = 10;
        } else if (selectionAbsoluteTop - scrollY > viewportHeight) {
            // 2) The selection is below the viewport - stuck the widget on the bottom
            top = viewportHeight - widgetHeight - 10;
        } else {
            // 3) The selection is on viewport - the widget aligned against the selection
            top = selectionAbsoluteTop - scrollY
            if ( selectionAbsoluteTop - scrollY > viewportHeight - widgetHeight ) {
                // 3.1) The selection is on viewport but is below than widget height - stuck the widget on the bottom
                top = viewportHeight - widgetHeight - 10;
            }
        }

        widget.style.top = `${top}px`;
        widget.style.bottom = 'auto';
    }

    handleScroll() {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.positionWidgetContainer();
        }, 10);
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.positionWidgetContainer();
        }, 100);
    }

    /**
     * Check nodePath, selectedData against page source and return is the provided nodePath is correct and can be highlighted
     * @param taskData
     * @return {boolean}
     */
    isSpotHaveToBeHighlighted(taskData) {
        return true;
    }

    sanitizeNodePath(nodePath) {
    let str = Array.isArray(nodePath) ? JSON.stringify(nodePath) : String(nodePath);
    // Allow only digits, commas, spaces, and square brackets
    if (/^[\[\]0-9,\s]*$/.test(str)) {
        return str;
    }
    return '';
}
}
