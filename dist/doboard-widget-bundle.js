const DOBOARD_API_URL = 'https://api-next.doboard.com';

const userConfirmEmailDoboard = async (emailConfirmationToken) => {
    const response = await fetch(
        `${DOBOARD_API_URL}/user_confirm_email?email_confirmation_token=${encodeURIComponent(emailConfirmationToken)}`,
        { method: 'GET' }
    );
    if (!response.ok) {
        throw new Error('Email confirmation failed');
    }
    const responseBody = await response.json();
    if (!responseBody || !responseBody.data) {
        throw new Error('Invalid response from server');
    }
    if (responseBody.data.operation_status !== 'CONFIRMED') {
        throw new Error('Email not confirmed');
    }
    return {
        sessionId: responseBody.data.session_id,
        userId: responseBody.data.user_id,
        email: responseBody.data.email,
        accounts: responseBody.data.accounts,
        operationStatus: responseBody.data.operation_status
    };
};

const createTaskDoboard = async (sessionId, taskDetails) => {
    const accountId = taskDetails.accountId;
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('project_token', taskDetails.projectToken);
    formData.append('project_id', taskDetails.projectId);
    formData.append('user_id', localStorage.getItem('spotfix_user_id'));
    formData.append('name', taskDetails.taskTitle);
    formData.append('comment', taskDetails.taskDescription);
    formData.append('meta', taskDetails.taskMeta);
    formData.append('task_type', 'PUBLIC');
    const response = await fetch(DOBOARD_API_URL + '/' + accountId + '/task_add', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    const responseBody = await response.json();

    if ( ! responseBody || ! responseBody.data ) {
        throw new Error('Invalid response from server');
    }
    if ( responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if ( responseBody.data.operation_status === 'SUCCESS' ) {
        return {
            taskId: responseBody.data.task_id,
            isPublic: 1, //todo MOCK!
        }
    }
    throw new Error('Unknown error occurred during creating task');
};

const createTaskCommentDoboard = async (accountId, sessionId, taskId, comment, projectToken, status = 'ACTIVE') => {
    const response = await fetch(
        DOBOARD_API_URL + '/' + accountId + '/comment_add' +
        '?session_id=' + sessionId +
        '&task_id=' + taskId +
        '&comment=' + comment +
        '&project_token=' + projectToken +
        '&status=' + status,
    {
        method: 'GET',
    });


    if (!response.ok) {
        throw new Error('Failed to create task comment');
    }

    const responseBody = await response.json();

    if (!responseBody || !responseBody.data) {
        throw new Error('Invalid response from server');
    }
    if (responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if (responseBody.data.operation_status === 'SUCCESS') {
        return {
            commentId: responseBody.data.comment_id,
        };
    }
    throw new Error('Unknown error occurred during creating task comment');
};

const registerUserDoboard = async (projectToken, accountId, email, nickname, pageURL) => {
    const formData = new FormData();
    formData.append('project_token', projectToken);
    formData.append('account_id', accountId);
    formData.append('confirmation_url', pageURL);
    if (email && nickname) {
        formData.append('email', email);
        formData.append('name', nickname);
    }

    const response = await fetch(DOBOARD_API_URL + '/user_registration', {
        method: 'POST',
        body: formData,
    });

    if ( ! response.ok ) {
        throw new Error('Registration failed');
    }

    const responseBody = await response.json();

    if ( ! responseBody || ! responseBody.data ) {
        throw new Error('Invalid response from server');
    }
    if ( responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if ( responseBody.data.operation_status === 'SUCCESS' ) {
        const result = {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: responseBody.data.email,
            accountExists: responseBody.data.user_email_confirmed === 1 ? true : false,
            operationMessage: responseBody.data.operation_message,
            operationStatus: responseBody.data.operation_status,
            userEmailConfirmed: responseBody.data.user_email_confirmed,
        };
        return result;
    }
    throw new Error('Unknown error occurred during registration');
};

const loginUserDoboard = async (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(DOBOARD_API_URL + '/user_authorize', {
        method: 'POST',
        body: formData,
    });

    if ( ! response.ok ) {
        throw new Error('Authorization failed');
    }

    const responseBody = await response.json();

    if ( ! responseBody || ! responseBody.data ) {
        throw new Error('Invalid response from server');
    }
    if ( responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if ( responseBody.data.operation_status === 'SUCCESS' ) {
        return {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: responseBody.data.email,
            accountExists: responseBody.data.user_email_confirmed === 1 ? true : false,
            operationMessage: responseBody.data.operation_message,
            operationStatus: responseBody.data.operation_status,
            userEmailConfirmed: responseBody.data.user_email_confirmed,
        }
    }
    throw new Error('Unknown error occurred during registration');
}

const getTasksDoboard = async (projectToken, sessionId, accountId, projectId, userId) => {
    const formData = new FormData();
    formData.append('project_token', projectToken);
    formData.append('session_id', sessionId);
    formData.append('project_id', projectId);
    formData.append('status', 'ACTIVE');
    formData.append('task_type', 'PUBLIC');
    if ( userId ) {
        formData.append('user_id', userId);
    }
    const response = await fetch(DOBOARD_API_URL + '/' + accountId + '/task_get', {
        method: 'POST',
        body: formData,
    });

    if ( ! response.ok ) {
        throw new Error('Getting tasks failed');
    }

    const responseBody = await response.json();

    if ( ! responseBody || ! responseBody.data ) {
        throw new Error('Invalid response from server');
    }
    if ( responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if ( responseBody.data.operation_status === 'SUCCESS' ) {
        return responseBody.data.tasks.map(task => ({
            taskId: task.task_id,
            taskTitle: task.name,
            taskLastUpdate: task.updated,
            taskCreated: task.created,
            taskCreatorTaskUser: task.creator_user_id,
            taskMeta: task.meta,
        }))
    }
    throw new Error('Unknown error occurred during getting tasks');
}


const getTasksCommentsDoboard = async (sessionId, accountId, projectToken, status = 'ACTIVE') => {
    let url = DOBOARD_API_URL + '/' + accountId + '/comment_get' +
        '?session_id=' + sessionId +
        '&status=' + status +
        '&project_token=' + projectToken;
    const response = await fetch(url, {method: 'GET',});

    if ( ! response.ok ) {
        throw new Error('Getting logs failed');
    }

    const responseBody = await response.json();

    if ( ! responseBody || ! responseBody.data ) {
        throw new Error('Invalid response from server');
    }
    if ( responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if ( responseBody.data.operation_status === 'SUCCESS' ) {
        return responseBody.data.comments.map(comment => ({
            taskId: comment.task_id,
            commentId: comment.comment_id,
            userId: comment.user_id,
            comment: comment.comment,
            commentBody: comment.comment_text,
            commentDate: comment.updated,
            status: comment.status,
            issueTitle: comment.task_name,
        }));
    }
    throw new Error('Unknown error occurred during getting comments');
};

const getUserDoboard = async (sessionId, projectToken, accountId) => {
    const response = await fetch(DOBOARD_API_URL + '/' + accountId + '/user_get' +
        '?session_id=' + sessionId +
        '&project_token=' + projectToken, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Getting user failed');
    }

    const responseBody = await response.json();

    if (!responseBody) {
        throw new Error('Invalid response from server');
    }
    // Format 1: users inside data
    if (responseBody.data && responseBody.data.operation_status) {
        if (responseBody.data.operation_status === 'FAILED') {
            throw new Error(responseBody.data.operation_message);
        }
        if (responseBody.data.operation_status === 'SUCCESS') {
            if (Array.isArray(responseBody.data.users)) {
                return responseBody.data.users;
            }
            return [];
        }
    }
    // Format 2: users at the top level
    if (responseBody.operation_status) {
        if (responseBody.operation_status === 'FAILED') {
            throw new Error(responseBody.operation_message);
        }
        if (responseBody.operation_status === 'SUCCESS') {
            if (Array.isArray(responseBody.users)) {
                return responseBody.users;
            }
            return [];
        }
    }
    throw new Error('Unknown error occurred during getting user');
};

const userUpdateDoboard = async (projectToken, accountId, sessionId, userId, timezone) => {
    const response = await fetch(DOBOARD_API_URL + '/' + accountId + '/user_update' +
        '?session_id=' + sessionId +
        '&project_token=' + projectToken +
        '&user_id=' + userId +
        '&timezone=' + timezone, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('User update failed');
    }

    const responseBody = await response.json();

    if (!responseBody || !responseBody.data) {
        throw new Error('Invalid response from server');
    }
    if (responseBody.data.operation_status === 'FAILED') {
        throw new Error(responseBody.data.operation_message);
    }
    if (responseBody.data.operation_status === 'SUCCESS') {
        return {
            success: true
        };
    }
    throw new Error('Unknown error occurred during user update');
}

async function confirmUserEmail(emailConfirmationToken, params) {
	const result = await userConfirmEmailDoboard(emailConfirmationToken);
	// Save session data to LS
	localStorage.setItem('spotfix_email', result.email);
	localStorage.setItem('spotfix_session_id', result.sessionId);
	localStorage.setItem('spotfix_user_id', result.userId);

	// Get pending task from LS
	const pendingTaskRaw = localStorage.getItem('spotfix_pending_task');
	if (!pendingTaskRaw) throw new Error('No pending task data');
	const pendingTask = JSON.parse(pendingTaskRaw);

	// Form taskDetails for task creation
	const taskDetails = {
		taskTitle: pendingTask.selectedText || 'New Task',
		taskDescription: pendingTask.description || '',
		selectedData: pendingTask,
		projectToken: params.projectToken,
		projectId: params.projectId,
		accountId: params.accountId,
		taskMeta: JSON.stringify(pendingTask)
	};

	// Create task
	const createdTask = await handleCreateTask(result.sessionId, taskDetails);
	// Clear pending task
	localStorage.removeItem('spotfix_pending_task');

	// Return created task
	return createdTask;
}

async function getTasksFullDetails(params, tasks) {
    if (tasks.length > 0) {
        const sessionId = localStorage.getItem('spotfix_session_id');
        const comments = await getTasksCommentsDoboard(sessionId, params.accountId, params.projectToken);
        const users = await getUserDoboard(sessionId, params.projectToken, params.accountId);

        return {
            comments: comments,
            users: users,
        };
    }
}

async function handleCreateTask(sessionId, taskDetails) {
	try {
		const result = await createTaskDoboard(sessionId, taskDetails);
		if (result && result.taskId && taskDetails.taskDescription) {
			await addTaskComment({
				projectToken: taskDetails.projectToken,
				accountId: taskDetails.accountId
			}, result.taskId, taskDetails.taskDescription);
		}
		return result;
	} catch (err) {
		throw err;
	}
}

async function addTaskComment(params, taskId, commentText) {
	const sessionId = localStorage.getItem('spotfix_session_id');
	if (!sessionId) throw new Error('No session');
	if (!params.projectToken || !params.accountId) throw new Error('Missing params');
	return await createTaskCommentDoboard(params.accountId, sessionId, taskId, commentText, params.projectToken);
}

function getUserTasks(params) {
	if (!localStorage.getItem('spotfix_session_id')) {
		return {};
	}
	const projectToken = params.projectToken;
	const sessionId = localStorage.getItem('spotfix_session_id');
	const userId = localStorage.getItem('spotfix_user_id');
	return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId, userId);
}

async function getAllTasks(params) {
	if (!localStorage.getItem('spotfix_session_id')) {
		return {};
	}
	const projectToken = params.projectToken;
	const sessionId = localStorage.getItem('spotfix_session_id');
	const tasksData = await getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);

    // Get only tasks with metadata
	const filteredTaskData =  tasksData.filter(task => {
        return task.taskMeta;
    });

    return filteredTaskData;
}

function formatDate(dateStr) {
	 const months = [
	 	"January", "February", "March", "April", "May", "June",
	 	"July", "August", "September", "October", "November", "December"
	 ];
	 // dateStr expected format: 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DDTHH:mm:ssZ'
	 if (!dateStr) return { date: '', time: '' };
	 let dateObj;
	 if (dateStr.includes('T')) {
	  dateObj = new Date(dateStr);
	 } else if (dateStr.includes(' ')) {
	  dateObj = new Date(dateStr.replace(' ', 'T'));
	 } else {
	  dateObj = new Date(dateStr);
	 }
	 if (isNaN(dateObj.getTime())) return { date: '', time: '' };

	 // Adjust to local timezone
	 const offsetMinutes = dateObj.getTimezoneOffset();
	 let localDateObj = new Date(dateObj.getTime() - offsetMinutes * 60000);

	 const month = months[localDateObj.getMonth()];
	 const day = localDateObj.getDate();
	 const date = `${month} ${day}`;
	 const hours = localDateObj.getHours().toString().padStart(2, '0');
	 const minutes = localDateObj.getMinutes().toString().padStart(2, '0');
	 const time = `${hours}:${minutes}`;
	 return { date, time };
}

function getTaskAuthorDetails(params, taskId) {
	const sessionId = localStorage.getItem('spotfix_session_id');
	const mockUsersData =
		[
			{
				'taskId': '1',
				'taskAuthorAvatarImgSrc': 'https://s3.eu-central-1.amazonaws.com/cleantalk-ctask-atts/accounts/1/avatars/081a1b65d20fe318/m.jpg',
				'taskAuthorName': 'Test All Issues Single Author Name'
			}
		]

	const defaultData =
		{
			'taskId': null,
			'taskAuthorAvatarImgSrc': null,
			'taskAuthorName': 'Task Author'
		};

	const data = mockUsersData.find((element) => element.taskId === taskId);
	return data === undefined ? defaultData : data;
}

function getIssuesCounterString(onPageSpotsCount, totalSpotsCount) {
	return `(${onPageSpotsCount}/${totalSpotsCount})`;
}

// Get the author's avatar
function getAvatarSrc(author) {
	if (author && author.avatar) {
		if (typeof author.avatar === 'object' && author.avatar.m) {
			return author.avatar.m;
		} else if (typeof author.avatar === 'string') {
			return author.avatar;
		}
	}
	return null;
}

// Get the author's name
function getAuthorName(author) {
	if (author) {
		if (author.name && author.name.trim().length > 0) {
			return author.name;
		} else if (author.email && author.email.trim().length > 0) {
			return author.email;
		}
	}
	return 'Unknown Author';
}

function registerUser(taskDetails) {
	const userEmail = taskDetails.userEmail;
	const userName = taskDetails.userName;
	const projectToken = taskDetails.projectToken;
	const accountId = taskDetails.accountId;
	const pageURL = taskDetails.selectedData.pageURL ? taskDetails.selectedData.pageURL : window.location.href;

	const resultRegisterUser = (showMessageCallback) => registerUserDoboard(projectToken, accountId, userEmail, userName, pageURL)
		.then(response => {
			if (response.accountExists) {
				document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container").innerText = 'Account already exists. Please, login usin your password.';
				document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container.hidden").classList.remove('hidden');
				document.getElementById("doboard_task_widget-user_password").focus();
			} else if (response.sessionId) {
				localStorage.setItem('spotfix_session_id', response.sessionId);
				localStorage.setItem('spotfix_user_id', response.userId);
				localStorage.setItem('spotfix_email', response.email);
				userUpdate(projectToken, accountId);
			} else if (response.operationStatus === 'SUCCESS' && response.operationMessage && response.operationMessage.length > 0) {
				if (response.operationMessage == 'Waiting for email confirmation') {
					response.operationMessage = 'Waiting for an email confirmation. Please check your Inbox.';
				}
				if (typeof showMessageCallback === 'function') {
					showMessageCallback(response.operationMessage, 'notice');
				}
			} else {
				throw new Error('Session ID not found in response');
			}
		})
		.catch(error => {
			throw error;
		});

		return resultRegisterUser;
}

function loginUser(taskDetails) {
	const userEmail = taskDetails.userEmail;
	const userPassword = taskDetails.userPassword;

	return (showMessageCallback) => loginUserDoboard(userEmail, userPassword)
		.then(response => {
			if (response.sessionId) {
				localStorage.setItem('spotfix_session_id', response.sessionId);
				localStorage.setItem('spotfix_user_id', response.userId);
				localStorage.setItem('spotfix_email', response.email);
			}  else if (response.operationStatus === 'SUCCESS' && response.operationMessage && response.operationMessage.length > 0) {
				if (typeof showMessageCallback === 'function') {
					showMessageCallback(response.operationMessage, 'notice');
				}
			} else {
				throw new Error('Session ID not found in response');
			}
		})
		.catch(error => {
			throw error;
		});
}

function userUpdate(projectToken, accountId) {
	const sessionId = localStorage.getItem('spotfix_session_id');
	const userId = localStorage.getItem('spotfix_user_id');
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	return userUpdateDoboard(projectToken, accountId, sessionId, userId, timezone);
}

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
        this.selectedData = selectedData;
        this.selectedText = selectedData.selectedText;
        this.init(type);
        this.srcVariables = {
            buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
            chevronBack: SpotFixSVGLoader.getAsDataURI('chevronBack'),
            buttonPaperClip: SpotFixSVGLoader.getAsDataURI('buttonPaperClip'),
            buttonSendMessage: SpotFixSVGLoader.getAsDataURI('buttonSendMessage'),
            backgroundInputMessage: SpotFixSVGLoader.getAsDataURI('backgroundInputMessage'),
            logoDoBoardWhite: SpotFixSVGLoader.getAsDataURI('logoDoBoardWhite'),
            logoDoBoardWrap: SpotFixSVGLoader.getAsDataURI('logoDoBoardWrap'),
            iconSpotPublic: SpotFixSVGLoader.getAsDataURI('iconSpotPublic'),
            iconSpotPrivate: SpotFixSVGLoader.getAsDataURI('iconSpotPrivate'),
            backgroundCloudCommentSelf: SpotFixSVGLoader.getAsDataURI('backgroundCloudCommentSelf'),
            backgroundCloudCommentOthers: SpotFixSVGLoader.getAsDataURI('backgroundCloudCommentOthers'),
        };
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
        widgetContainer.removeAttribute('style');

        let templateName = '';
        let tasksFullDetails;

        let templateVariables = {};

        switch (type) {
            case 'create_issue':
                templateName = 'create_issue';
                templateVariables = {
                    selectedText: this.selectedText,
                    currentDomain: document.location.hostname || '',
                    ...this.srcVariables
                };
                storageGetUserIsDefined() && storageSetWidgetIsClosed(false);
                break;
            case 'wrap':
                if (storageGetWidgetIsClosed()) {
                    return;
                }
                templateName = 'wrap';
                templateVariables = {...this.srcVariables};
                break;
            case 'all_issues':
                templateName = 'all_issues';
                templateVariables = {...this.srcVariables};
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
                    scrollToNodePath(selectedData.nodePath);
                    this.positionWidgetContainer();
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
                tasksFullDetails = await getTasksFullDetails(this.params, tasks);
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
                                taskPublicStatusImgSrc = this.srcVariables.iconSpotPublic;
                                taskPublicStatusHint = 'The task is public';
                            } else {
                                taskPublicStatusImgSrc = this.srcVariables.iconSpotPrivate;
                                taskPublicStatusHint = 'The task is private and visible only for registered DoBoard users';
                            }
                        }

                        if (!showOnlyCurrentPage || currentPageURL === window.location.href) {
                            issuesQuantityOnPage++;

                            const taskFullDetails = getTaskFullDetails(tasksFullDetails, taskId)

                            const avatarData = getAvatarData(taskFullDetails);
                            const listIssuesTemplateVariables = {
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
                                classUnread: '',
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

                tasksFullDetails = await getTasksFullDetails(this.params, this.allTasksData);
                const taskDetails = await getTaskFullDetails(tasksFullDetails, this.currentActiveTaskId);

                // Update issue title in the interface
                const issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                if (issueTitleElement) {
                    issueTitleElement.innerText = taskDetails.issueTitle;
                }

                templateVariables.issueTitle = taskDetails.issueTitle;
                templateVariables.issueComments = taskDetails.issueComments;

                widgetContainer.innerHTML = this.loadTemplate('concrete_issue', templateVariables);
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
                            commentBody: this.escapeHtml(comment.commentBody),
                            commentDate: comment.commentDate,
                            commentTime: comment.commentTime,
                            issueTitle: templateVariables.issueTitle,
                            commentContainerBackgroundSrc: userIsIssuer
                                ? this.srcVariables.backgroundCloudCommentSelf
                                : this.srcVariables.backgroundCloudCommentOthers,
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
                            let currentMessageTemplateVariables = currentDayMessages[messageId];
                            dayMessagesWrapperHTML += this.loadTemplate('concrete_issue_messages', currentMessageTemplateVariables);
                        }
                        daysWrapperHTML += this.loadTemplate('concrete_issue_day_content',
                            {
                                dayContentMonthDay: day,
                                dayContentMessages: dayMessagesWrapperHTML,
                            },
                        );
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
                    this.positionWidgetContainer();
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
     * @return {string}
     * @ToDo have to refactor templates loaded method: need to be templates included into the bundle
     *
     */
    loadTemplate(templateName, variables = {}) {
        let template = SpotFixTemplatesLoader.getTemplateCode(templateName);

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            let replacement = this.escapeHtml(String(value));
            if ( templateName === 'concrete_issue_messages' || templateName === 'concrete_issue_day_content' ) {
                replacement = value;
            }
            template = template.replaceAll(placeholder, replacement);
        }

        return template;
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

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
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
                titleSpan.innerText = '';
                messageWrap.classList.add('doboard_task_widget-notice_message');
                messageDiv.style.color = '#2a5db0';
            } else {
                titleSpan.innerText = 'Registration error';
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
}

var widgetTimeout = null;

if( document.readyState !== 'loading' ) {
    document.addEventListener('spotFixLoaded', spotFixInit);
} else {
    document.addEventListener('DOMContentLoaded', spotFixInit);
}

function spotFixInit() {
    new SpotFixSourcesLoader();
    new CleanTalkWidgetDoboard({}, 'wrap');
}

document.addEventListener('selectionchange', function(e) {
    if (widgetTimeout) {
        clearTimeout(widgetTimeout);
    }

    widgetTimeout = setTimeout(() => {
        const selection = window.getSelection();
        if (
            selection.type === 'Range' &&
            isSelectionCorrect(selection)
        ) {
            // Check if selection is inside the widget
            let anchorNode = selection.anchorNode;
            let focusNode = selection.focusNode;
            if (isInsideWidget(anchorNode) || isInsideWidget(focusNode)) {
                return;
            }
            const selectedData = getSelectedData(selection);
            openWidget(selectedData, 'create_issue');
        }
    }, 1000);
});

/**
 * Check if a node is inside the task widget.
 * @param {*} node
 * @returns {boolean}
 */
function isInsideWidget(node) {
    if (!node) return false;
    let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    while (el) {
        if (el.classList && el.classList.contains('doboard_task_widget')) {
            return true;
        }
        el = el.parentElement;
    }
    return false;
}

/**
 * Open the widget to create a task.
 * @param {*} selectedData
 * @param {*} widgetExist
 * @param {*} type
 */
function openWidget(selectedData, type) {
    if (selectedData) {
        new CleanTalkWidgetDoboard(selectedData, type);
    }
}

/**
 * Analyze the task selected data
 * @param {Object} taskSelectedData
 * @return {Element|null}
 */
function taskAnalysis(taskSelectedData) {
    const nodePath = taskSelectedData ? taskSelectedData.nodePath : '';
    return retrieveNodeFromPath(nodePath);
}

/**
 * Scroll to an element by tag, class, and text content
 * @param {string} path - The path to the element
 * @return {boolean} - True if the element was found and scrolled to, false otherwise
 */
function scrollToNodePath(path) {
    const node = retrieveNodeFromPath(path);
    if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
    }
    return false;
}

function hideContainersSpinner() {
    const spinners = document.getElementsByClassName('doboard_task_widget-spinner_wrapper_for_containers');
    if (spinners.length > 0) {
        for (let i = 0; i < spinners.length ; i++) {
            spinners[i].style.display = 'none';
        }
    }
    const containerClassesToShow = ['doboard_task_widget-all_issues-container', 'doboard_task_widget-concrete_issues-container'];
    for (let i = 0; i < containerClassesToShow.length ; i++) {
        const containers = document.getElementsByClassName(containerClassesToShow[i]);
        if (containers.length > 0) {
            for (let i = 0; i < containers.length ; i++) {
                containers[i].style.display = 'block';
            }
        }
    }
}

function getTaskFullDetails(tasksDetails, taskId) {
    const comments = tasksDetails.comments.filter(comment => {
        return comment.taskId.toString() === taskId.toString()
    });
    const users = tasksDetails.users;
    // Last comment
    let lastComment = comments.length > 0 ? comments[0] : null;
    // Author of the last comment
    let author = null;
    if (lastComment && users && users.length > 0) {
        author = users.find(u => String(u.user_id) === String(lastComment.userId));
    }
    // Format date
    let date = '', time = '';
    if (lastComment) {
        const dt = formatDate(lastComment.commentDate);
        date = dt.date;
        time = dt.time;
    }
    // Get the avatar and the name through separate functions
    let avatarSrc = getAvatarSrc(author);
    let authorName = getAuthorName(author);

    return {
        taskId: taskId,
        taskAuthorAvatarImgSrc: avatarSrc,
        taskAuthorName: authorName,
        lastMessageText: lastComment ? lastComment.commentBody : 'No messages yet',
        lastMessageTime: time,
        issueTitle: comments.length > 0 ? comments[0].issueTitle : 'No Title',
        issueComments: comments
            .sort((a, b) => {
                return new Date(a.commentDate) - new Date(b.commentDate);
            })
            .map(comment => {
                const {date, time} = formatDate(comment.commentDate);
                let author = null;
                if (users && users.length > 0) {
                    author = users.find(u => String(u.user_id) === String(comment.userId));
                }
                return {
                    commentAuthorAvatarSrc: getAvatarSrc(author),
                    commentAuthorName: getAuthorName(author),
                    commentBody: comment.commentBody,
                    commentDate: date,
                    commentTime: time,
                    commentUserId: comment.userId || 'Unknown User',
                };
            })
    };
}

function getAvatarData(authorDetails) {
    let avatarStyle;
    let avatarCSSClass;
    let taskAuthorInitials = authorDetails.taskAuthorName && authorDetails.taskAuthorName != 'Anonymous' ? authorDetails.taskAuthorName.trim().charAt(0).toUpperCase() : null;
    let hideAvatar = authorDetails.hasOwnProperty('userIsIssuer') && authorDetails.userIsIssuer === true;
    let initialsClass = 'doboard_task_widget-avatar-initials';
    if (authorDetails.taskAuthorAvatarImgSrc === null && taskAuthorInitials !== null) {
        avatarStyle = 'display: flex;background-color: #f8de7e;justify-content: center;align-items: center;';
        avatarCSSClass = 'doboard_task_widget-avatar_container';
    }
    if (authorDetails.taskAuthorAvatarImgSrc === null && taskAuthorInitials === null) {
        avatarStyle = `background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMt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');`;
        avatarCSSClass = 'doboard_task_widget-avatar_container';
        initialsClass += ' doboard_task_widget-hidden_element';
    }
    if (authorDetails.taskAuthorAvatarImgSrc !== null) {
        avatarStyle = `background-image:url(\'${authorDetails.taskAuthorAvatarImgSrc}\');`;
        avatarCSSClass = 'doboard_task_widget-avatar_container';
        initialsClass = 'doboard_task_widget-hidden_element';
    }
    return {
        avatarStyle: avatarStyle,
        avatarCSSClass: avatarCSSClass,
        taskAuthorInitials: taskAuthorInitials,
        initialsClass: initialsClass
    }
}

/**
 * Return first found updated task ID or false if no tasks were updated
 * @param allTasksData
 * @returns {string[]|false}
 */
function isAnyTaskUpdated(allTasksData) {
    let result = false;

    const updatedtasksIDS = [];

    for (let i = 0; i < allTasksData.length; i++) {
        const currentStateOfTask = allTasksData[i];
        const issuerId = localStorage.getItem('spotfix_user_id');
        if (
            currentStateOfTask.taskId &&
            currentStateOfTask.taskLastUpdate &&
            currentStateOfTask.taskCreatorTaskUser.toString() === issuerId.toString()
        ) {
            result = storageCheckTaskUpdate(currentStateOfTask.taskId, currentStateOfTask.taskLastUpdate);
            if (result) {
                updatedtasksIDS.push(currentStateOfTask.taskId.toString());
            }
        }
    }

    return updatedtasksIDS.length === 0 ? false : updatedtasksIDS;
}

/**
 * Check if any of the tasks has updates from site owner (not from the current user and not anonymous)
 * @returns {Promise<boolean>}
 */
async function checkIfTasksHasSiteOwnerUpdates(allTasksData, params) {
    const updatedTaskIDs = isAnyTaskUpdated(allTasksData);
    let result = false;
    if (!updatedTaskIDs) {
        return false;
    }
    for (let i = 0; i < updatedTaskIDs.length; i++) {
        const updatedTaskId = updatedTaskIDs[i];
        if (typeof updatedTaskId === 'string') {
            const updatedTaskData =  await getTasksFullDetails(params, [updatedTaskId]);
            if (updatedTaskData.comments) {
                const lastMessage = updatedTaskData.comments[0];
                if (
                    lastMessage.commentUserId !== undefined &&
                    lastMessage.commentUserId !== localStorage.getItem('spotfix_user_id') &&
                    lastMessage.commentAuthorName !== 'Anonymous'
                ) {
                    storageAddUnreadUpdateForTaskID(updatedTaskId);
                    result = true;
                }
            }
        }
    }
    return result;
}

/**
 * Check if the selection is correct - do not allow to select all page, or several different nesting nodes, or something else
 * @param selection
 * @return {boolean}
 */
function isSelectionCorrect(selection) {
    return true;
}

/**
 * Try to find selected image in selection.
 * @param selection
 * @returns {Node|*|null}
 */
function getSelectedImage(selection) {

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return null;
    }

    const range = selection.getRangeAt(0);

    // Is current end container IMG
    if (range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.ELEMENT_NODE &&
        range.startContainer.tagName === 'IMG') {
        return range.startContainer;
    }

    // Get img in the range
    const walker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: function(node) {
                return node.tagName === 'IMG' &&
                isElementInRange(node, range) ?
                    NodeFilter.FILTER_ACCEPT :
                    NodeFilter.FILTER_REJECT;
            }
        }
    );

    let imgNode = walker.nextNode();
    if (imgNode) {
        return imgNode;
    }

    // start/end containers
    const startElement = getElementFromNode(range.startContainer);
    const endElement = getElementFromNode(range.endContainer);

    // If selection starts on image
    if (startElement && startElement.tagName === 'IMG' &&
        isElementPartiallySelected(startElement, range)) {
        return startElement;
    }

    if (endElement && endElement.tagName === 'IMG' &&
        isElementPartiallySelected(endElement, range)) {
        return endElement;
    }

    // 4. Get closest IMG
    const nearbyElements = findNearbyElements(range);
    for (const element of nearbyElements) {
        if (element.tagName === 'IMG') {
            return element;
        }
    }

    return null;
}


function isElementInRange(element, range) {
    const elementRange = document.createRange();
    elementRange.selectNode(element);
    return range.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
}

function isElementPartiallySelected(element, range) {
    const elementRect = element.getBoundingClientRect();
    const rangeRect = range.getBoundingClientRect();

    //  bounding rectangles is crossed
    return !(elementRect.right < rangeRect.left ||
        elementRect.left > rangeRect.right ||
        elementRect.bottom < rangeRect.top ||
        elementRect.top > rangeRect.bottom);
}

function getElementFromNode(node) {
    return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
}

/**
 * Find nearby elements in the range.
 * @param range
 * @returns {*[]}
 */
function findNearbyElements(range) {
    const elements = [];
    const container = range.commonAncestorContainer;

    // search elements
    const previousElement = container.previousElementSibling;
    const nextElement = container.nextElementSibling;

    if (previousElement) {
        elements.push(previousElement);
    }
    if (nextElement) {
        elements.push(nextElement);
    }

    // Also check child container
    if (container.nodeType === Node.ELEMENT_NODE) {
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            if (isElementPartiallySelected(children[i], range)) {
                elements.push(children[i]);
            }
        }
    }

    return elements;
}


/**
 * Extracts selection data from DOM Selection object
 * @param {Selection} selection - The DOM Selection object
 * @returns {Object} Selection data with text, positions, URL and node path
 */
function getSelectedData(selection) {
    const {
        anchorOffset,
        focusOffset,
    } = selection;

    let selectedText = selection.toString();
    let isTagOfImageType = false;
    const selectedImage = getSelectedImage(selection);
    const pageURL = window.location.href;

    if ( ! selectedText ) {
        if (selectedImage === null) {
            return createEmptySelectionData(pageURL);
        } else {
            selectedText = `${selectedImage.tagName.toUpperCase()} ${selection.anchorNode.offsetHeight.toString()} * ${selection.anchorNode.offsetWidth.toString()}`
        }
    }

    if ( selectedImage ) {
        isTagOfImageType = selectedImage.tagName;
    }

    const isWholeTagSelected = anchorOffset === 0 &&
        focusOffset === 0 &&
        selectedText.length > 0;

    const targetNode = determineTargetNode(
        selection,
        isWholeTagSelected,
        isTagOfImageType,
        selectedImage
    );

    return {
        startSelectPosition: Math.min(anchorOffset, focusOffset),
        endSelectPosition: Math.max(anchorOffset, focusOffset),
        selectedText: selectedText,
        pageURL: pageURL,
        nodePath: calculateNodePath(targetNode),
        isTagOfImageType: isTagOfImageType,
        isWholeTagSelected: isWholeTagSelected
    };
}

/**
 * Determines the target node for path calculation
 * @param {Selection} selection - DOM Selection object
 * @param {boolean} isWholeTagSelected - is entire tag selected
 * @param {boolean} isTagOfImageType - is tag of image type
 * @param {Node|null} selectedImage - if predefined image node exists
 * @returns {Node} Target DOM node
 */
function determineTargetNode(selection, isWholeTagSelected = false,  isTagOfImageType = false, selectedImage = null) {
    const { focusNode, anchorNode } = selection;

    if (isWholeTagSelected) {
        return anchorNode.parentElement;
    }

    if (isTagOfImageType && selectedImage) {
        return selectedImage;
    }

    return focusNode.nodeName !== '#text' ? focusNode : focusNode.parentNode;
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

/**
 * Creates empty selection data object
 * @param {string} pageURL - Current page URL
 * @returns {Object} Empty selection data
 */
function createEmptySelectionData(pageURL) {
    return {
        startSelectPosition: 0,
        endSelectPosition: 0,
        selectedText: '',
        pageURL: pageURL,
        nodePath: '',
        isWholeTagSelected: false,
        isTagOfImageType: false,
    };
}

let spotFixCSS = `.doboard_task_widget *{font-family:Inter,sans-serif;font-weight:400;font-size:14px;line-height:130%;color:#40484F}.doboard_task_widget-header *{color:#FFF;margin:0}.doboard_task_widget a{text-decoration:underline;color:#2F68B7}.doboard_task_widget a:hover{text-decoration:none}.doboard_task_widget{position:fixed;right:50px;bottom:20px;z-index:9999;vertical-align:middle;transition:top .1s;transform:translateZ(0);-webkit-transform:translateZ(0);will-change:transform}.doboard_task_widget_cursor-pointer{cursor:pointer}.doboard_task_widget-container{width:360px;max-height:calc(100vh - 40px);display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-header{display:flex;height:41px;min-height:41px;padding:8px 16px;background:#1C7857;border-radius:8px 8px 0 0;justify-content:space-between;align-items:center;color:#FFF}.doboard_task_widget-content{flex:1;overflow-y:auto;padding:10px 16px 5px;background:#FFF;border-radius:0 0 8px 8px;border:1px #BBC7D1;border-style:none solid solid;box-shadow:0 4px 15px 8px #CACACA40;scrollbar-width:none;max-height:60vh}.doboard_task_widget-element-container{margin-bottom:30px}.doboard_task_widget-wrap{width:auto;background:0 0;border:none;box-shadow:none;padding:0}.doboard_task_widget-wrap.hidden{display:none}#doboard_task_widget-task_count{position:absolute;top:0;right:0;width:22px;height:22px;opacity:1;background:#ef8b43;border-radius:50%;color:#FFF;text-align:center;line-height:22px}#doboard_task_widget-task_count:hover{background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmb3JlaWduT2JqZWN0IHg9Ii00IiB5PSItNCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIj48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iYmFja2Ryb3AtZmlsdGVyOmJsdXIoMnB4KTtjbGlwLXBhdGg6dXJsKCNiZ2JsdXJfMF8xODk4OV8yODI2X2NsaXBfcGF0aCk7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJSI+PC9kaXY+PC9mb3JlaWduT2JqZWN0PjxwYXRoIGRhdGEtZmlnbWEtYmctYmx1ci1yYWRpdXM9IjQiIGQ9Ik0xMSAyMkMxNy4wNzUxIDIyIDIyIDE3LjA3NTEgMjIgMTFDMjIgNC45MjQ4NyAxNy4wNzUxIDAgMTEgMEM0LjkyNDg3IDAgMCA0LjkyNDg3IDAgMTFDMCAxNy4wNzUxIDQuOTI0ODcgMjIgMTEgMjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjciLz4KICAgIDxwYXRoIGQ9Ik0xNiA2TDYgMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik02IDZMMTYgMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgIDxkZWZzPgogICAgICAgIDxjbGlwUGF0aCBpZD0iYmdibHVyXzBfMTg5ODlfMjgyNl9jbGlwX3BhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNCkiPjxwYXRoIGQ9Ik0xMSAyMkMxNy4wNzUxIDIyIDIyIDE3LjA3NTEgMjIgMTFDMjIgNC45MjQ4NyAxNy4wNzUxIDAgMTEgMEM0LjkyNDg3IDAgMCA0LjkyNDg3IDAgMTFDMCAxNy4wNzUxIDQuOTI0ODcgMjIgMTEgMjJaIi8+CiAgICAgICAgPC9jbGlwUGF0aD48L2RlZnM+Cjwvc3ZnPg==) center no-repeat;cursor:pointer;overflow:hidden;font-size:0}#doboard_task_widget-task_count.hidden{width:0;height:0;opacity:0}.doboard_task_widget-input-container{position:relative;margin-bottom:24px}.doboard_task_widget-input-container.hidden{display:none}.doboard_task_widget-input-container .doboard_task_widget-field{padding:0 8px;border-radius:4px;border:1px solid #BBC7D1;outline:0!important;appearance:none;width:100%;height:40px;background:#FFF;color:#000;max-width:-webkit-fill-available;max-width:-moz-available}.doboard_task_widget-field:focus{border-color:#2F68B7}.doboard_task_widget-input-container textarea.doboard_task_widget-field{height:94px;padding-top:11px;padding-bottom:11px}.doboard_task_widget-field+label{color:#252A2F;background:#fff;position:absolute;top:20px;left:8px;transform:translateY(-50%);transition:all .2s ease-in-out}.doboard_task_widget-field.has-value+label,.doboard_task_widget-field:focus+label{font-size:10px;top:0;left:12px;padding:0 4px;z-index:5}.doboard_task_widget-field:focus+label{color:#2F68B7}.doboard_task_widget-login{background:#F9FBFD;border:1px solid #BBC7D1;border-radius:4px;padding:11px 8px 8px;margin-bottom:40px}.doboard_task_widget-login .doboard_task_widget-accordion{height:0;overflow:hidden;opacity:0;transition:all .2s ease-in-out}.doboard_task_widget-login.active .doboard_task_widget-accordion{height:auto;overflow:visible;opacity:1}.doboard_task_widget-login .doboard_task_widget-input-container:last-child{margin-bottom:0}.doboard_task_widget-login span{display:block;position:relative;padding-right:24px;cursor:pointer}.doboard_task_widget-login.active span{margin-bottom:24px}.doboard_task_widget-login span::after{position:absolute;top:0;right:4px;content:"";display:block;width:10px;height:10px;transform:rotate(45deg);border:2px solid #40484F;border-radius:1px;border-top:none;border-left:none;transition:all .2s ease-in-out}.doboard_task_widget-login.active span::after{transform:rotate(-135deg);top:7px}.doboard_task_widget-login .doboard_task_widget-field+label,.doboard_task_widget-login .doboard_task_widget-input-container .doboard_task_widget-field{background:#F9FBFD}.doboard_task_widget-submit_button{height:48px;width:100%;margin-bottom:10px;color:#FFF;background:#22A475;border:none;border-radius:6px;font-family:Inter,sans-serif;font-weight:700;font-size:16px;line-height:150%;cursor:pointer;transition:all .2s ease-in-out}.doboard_task_widget-submit_button:hover{background:#1C7857;color:#FFF}.doboard_task_widget-submit_button:disabled{background:rgba(117,148,138,.92);color:#FFF;cursor:wait}.doboard_task_widget-issue-title{max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.doboard_task_widget-hidden_element{opacity:0}.doboard_task_widget-message-wrapper{border-radius:4px;padding:8px;margin-bottom:14px;display:grid;justify-items:center}.doboard_task_widget-error_message-wrapper.hidden,.doboard_task_widget-message-wrapper.hidden{display:none}.doboard_task_widget-error_message{background:#fdd;border:1px solid #cf6868}.doboard_task_widget-notice_message{background:#dde9ff;border:1px solid #68a6cf}#doboard_task_widget-error_message-header{font-weight:600}#doboard_task_widget-error_message{text-align:center}.doboard_task_widget-task_row{display:flex;max-height:55px;padding-bottom:4px;margin-bottom:20px;cursor:pointer;align-items:center;justify-content:space-between}.doboard_task_widget-task_row:last-child{margin-bottom:0}.doboard_task_widget-task-text_bold{font-weight:700}.doboard_task_widget-text_selection,.doboard_task_widget-text_selection.image-highlight>img{background:rgba(208,213,127,.68)}.doboard_task_widget-issues_list_empty{text-align:center;margin:20px 0}.doboard_task_widget-avatar_container{display:flex;height:44px;width:44px;border-radius:50%;background-repeat:no-repeat;background-position:center;background-size:100%}.doboard_task_widget-avatar_placeholder{min-height:44px;min-width:44px;border-radius:50%;font-size:24px;line-height:1.2083333333;padding:0;background:#1C7857;display:inline-grid;align-content:center;justify-content:center}.doboard_task_widget-avatar-initials{color:#FFF;width:inherit;text-align:center}.doboard_task_widget-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover}.doboard_task_widget-description_container{height:55px;width:calc(100% - 44px - 8px);border-bottom:1px solid #EBF0F4;display:block;margin-left:8px}.doboard_task_widget-task_row:last-child .doboard_task_widget-description_container{border-bottom:none}.doboard_task_widget-all_issues-container,.doboard_task_widget-concrete_issues-container{overflow:auto;max-height:85vh;display:none}.doboard_task_widget-all_issues-container{scrollbar-width:none}.doboard_task_widget-all_issues-container::-webkit-scrollbar,.doboard_task_widget-all_issues::-webkit-scrollbar,.doboard_task_widget-concrete_issues-container::-webkit-scrollbar,.doboard_task_widget-content::-webkit-scrollbar{width:0}.doboard_task_widget-task_title{font-weight:700;display:flex;justify-content:space-between;align-items:center}.doboard_task_widget-task_title span{font-weight:700;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.doboard_task_widget-task_title-details{display:flex;max-width:calc(100% - 40px);align-items:center}.doboard_task_widget-task_title-unread_block{opacity:0;height:8px;width:8px;background:#f08c43;border-radius:50%;display:inline-block;font-size:8px;font-weight:600;position:relative}.doboard_task_widget-task_title-unread_block.unread{opacity:1}.doboard_task_widget-task_last_message{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%}.doboard_task_widget_return_to_all{display:flex;gap:8px;flex-direction:row;-moz-flex-direction:row;align-content:center;flex-wrap:wrap}.doboard_task_widget-task_title-last_update_time{font-family:Inter,serif;font-weight:400;font-style:normal;font-size:11px;leading-trim:NONE;line-height:100%}.doboard_task_widget-task_title_public_status_img{opacity:50%;margin-left:5px;scale:90%}.doboard_task_widget-description-textarea{resize:none}.doboard_task_widget-switch_row{display:flex;align-items:center;gap:12px;margin:16px 0;justify-content:space-between}.doboard_task_widget-switch-label{font-weight:600;font-size:16px;height:24px;align-content:center}.doboard_task_widget-switch{position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0}.doboard_task_widget-switch input{opacity:0;width:0;height:0}.doboard_task_widget-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;border-radius:24px;transition:.2s}.doboard_task_widget-slider:before{position:absolute;content:"";height:20px;width:20px;left:2px;bottom:2px;background-color:#fff;border-radius:50%;transition:.2s}.doboard_task_widget-switch input:checked+.doboard_task_widget-slider{background-color:#65D4AC}.doboard_task_widget-switch input:checked+.doboard_task_widget-slider:before{transform:translateX(20px)}.doboard_task_widget-switch-img{width:24px;height:24px;flex-shrink:0}.doboard_task_widget-switch-center{display:flex;gap:2px;flex-direction:column;-moz-flex-direction:column;flex:1 1 auto;min-width:0}.doboard_task_widget-switch-desc{display:block;font-size:12px;color:#707A83;margin:0;line-height:1.2;max-width:180px;word-break:break-word}.doboard_task_widget-concrete_issue-day_content{display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-concrete_issue_day_content-month_day{text-align:center;font-weight:400;font-size:12px;line-height:100%;padding:8px;opacity:.75}.doboard_task_widget-concrete_issue_day_content-messages_wrapper{display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-comment_data_wrapper{display:flex;flex-direction:row;-moz-flex-direction:row;margin-bottom:15px;align-items:flex-end}.doboard_task_widget-comment_text_container{position:relative;width:100%;height:auto;overflow:hidden;margin-left:5px;padding:5px}.doboard_task_widget-comment_text_container img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:fill}.doboard_task_widget-comment_body,.doboard_task_widget-comment_time{position:relative;z-index:1}.doboard_task_widget-comment_body{padding:10px}.doboard_task_widget-comment_time{font-weight:400;font-size:11px;line-height:100%;text-align:right;padding:0 8px 4px 0;opacity:.8}.doboard_task_widget-send_message{padding:10px 0 4px;border-top:1px solid #BBC7D1;position:sticky;background:#fff;bottom:0;z-index:4}.doboard_task_widget-send_message_elements_wrapper{display:flex;flex-direction:row;-moz-flex-direction:row;align-content:center;flex-wrap:nowrap;justify-content:space-evenly}.doboard_task_widget-send_message_input_wrapper{position:relative;display:inline-grid;align-items:center;justify-items:center}.doboard_task_widget-send_message_input-icon{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:0}.doboard_task_widget-send_message_input_wrapper input{width:90%;position:relative;border:none;background:0 0;z-index:1;overflow-wrap:break-word;margin-bottom:0!important}.doboard_task_widget-send_message_input_wrapper input:focus{border-color:#007bff;outline:0}.doboard_task_widget-send_message_input_wrapper input:focus+.input-icon{color:#007bff}.doboard_task_widget-send_message_button,.doboard_task_widget-send_message_paperclip{display:inline-grid;border:none;background:0 0;cursor:pointer;padding:0;align-items:center}.doboard_task_widget-send_message_button:hover,.doboard_task_widget-send_message_paperclip:hover rect{fill:#45a049}.doboard_task_widget-send_message_button:active,.doboard_task_widget-send_message_paperclip:active{transform:scale(.98)}.doboard_task_widget-spinner_wrapper_for_containers{display:flex;justify-content:center;align-items:center;min-height:60px;width:100%}.doboard_task_widget-spinner_for_containers{width:40px;height:40px;border-radius:50%;background:conic-gradient(transparent,#1C7857);mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#fff 0);animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(1turn)}}@media (max-width:480px){.doboard_task_widget{position:fixed;right:0;top:auto;bottom:0;margin:0 20px 20px;box-sizing:border-box;transform:translateZ(0);-moz-transform:translateZ(0);will-change:transform;max-height:90vh}.doboard_task_widget-container{width:100%;max-width:290px;margin:0 auto;max-height:90vh}.doboard_task_widget-content{height:auto;max-height:none;scrollbar-width:none}.doboard_task_widget-content::-webkit-scrollbar{display:none}.doboard_task_widget-all_issues-container,.doboard_task_widget-concrete_issues-container{max-height:80vh}}@supports (-webkit-overflow-scrolling:touch){.doboard_task_widget{position:fixed}}`;
/**
 * Return bool if widget is closed in local storage
 * @returns {boolean}
 */
function storageGetWidgetIsClosed() {
    return localStorage.getItem('spotfix_widget_is_closed') === '1';
}

/**
 * Return bool if widget closed state is defined in local storage
 * @returns {boolean}
 */
function storageWidgetCloseIsSet() {
    return localStorage.getItem('spotfix_widget_is_closed') !== null;
}

/**
 * Save widget closed state
 * @param visible
 */
function storageSetWidgetIsClosed(visible) {
    localStorage.setItem('spotfix_widget_is_closed', visible ? '1' : '0');
}

/**
 * Return bool if user is defined in local storage
 * @returns {boolean}
 */
function storageGetUserIsDefined() {
    return localStorage.getItem('spotfix_user_id') !== null;
}

/**
 * Save data for updates check
 * @param tasks
 */
function storageSaveTasksUpdateData(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');

    tasks.forEach(task => {
        if (task.taskId && task.taskLastUpdate) {
            storedTasks[task.taskId] = {
                taskId: task.taskId,
                taskLastUpdate: task.taskLastUpdate
            };
        }
    });

    localStorage.setItem('spotfix_task_updates', JSON.stringify(storedTasks));
}

/**
 * Check if a specific task has been updated since last check
 * @param taskId
 * @param currentLastUpdate
 * @returns {boolean|null}
 */
function storageCheckTaskUpdate(taskId, currentLastUpdate) {
    if (!taskId || !currentLastUpdate) {
        return null;
    }

    const storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
    const storedTask = storedTasks[taskId];

    if (!storedTask) {
        return false;
    }

    const storedUpdate = new Date(storedTask.taskLastUpdate);
    const currentUpdate = new Date(currentLastUpdate);
    return currentUpdate > storedUpdate;
}

/**
 * Add unread update for a specific task
 * @param taskId
 */
function storageAddUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    const storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');

    if (!storedUnread.includes(taskId)) {
        storedUnread.push(taskId);
    }

    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Remove unread update for a specific task
 * @param taskId
 */
function storageRemoveUnreadUpdateForTaskID(taskId) {
    if (!taskId) {
        return;
    }

    let storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');

    storedUnread = storedUnread.filter(id => id !== taskId);

    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Check if there are any unread updates
 * @returns {boolean}
 */
function storageTasksHasUnreadUpdates() {
    const storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');

    return storedUnread.length > 0;
}

/**
 *  Check if a specific task has unread updates
 * @param taskId
 * @returns {boolean}
 */
function storageProvidedTaskHasUnreadUpdates(taskId) {
    if (!taskId) {
        return false;
    }

    const storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');

    return storedUnread.includes(taskId.toString());
}

class SpotFixTemplatesLoader {

    static getTemplateCode(templateName) {
        const templateMethod = this[templateName];

        if (typeof templateMethod !== 'function') {
            throw new Error(`Template method '${templateName}' not found`);
        }

        let template = templateMethod.call(this).trim();

        return template;
    }

    static all_issues() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div style="display: flex;align-items: center;gap: 8px;">
            <img src="{{logoDoBoardWhite}}"  alt="">
            <span>All spots</span>
        </div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-all_issues-container">
        </div>
    </div>
</div>`;
    }

    static concrete_issue() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div class="doboard_task_widget_return_to_all doboard_task_widget_cursor-pointer">
            <img src="{{chevronBack}}" alt="" title="Return to all spots list">
            <span title="Return to all spots list"> All {{issuesCounter}}</span>
        </div>
        <div class="doboard_task_widget-issue-title">{{issueTitle}}</div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-concrete_issues-container">
        </div>
        <div class="doboard_task_widget-send_message">
            <form>
                <div class="doboard_task_widget-send_message_elements_wrapper">
                <button type="button" class="doboard_task_widget-send_message_paperclip">
                    <img src="{{buttonPaperClip}}" alt="Attach a file" title="Attach a file">
                </button>

                <div class="doboard_task_widget-send_message_input_wrapper">
                    <img class="doboard_task_widget-send_message_input-icon" src="{{backgroundInputMessage}}" alt="" title="">
                    <input type="text" class="doboard_task_widget-send_message_input" placeholder="Write a message...">
                </div>

                <button type="submit" class="doboard_task_widget-send_message_button">
                    <img src="{{buttonSendMessage}}" alt="Send message" title="Send message">
                </button>
                </div>
            </form>
        </div>
    </div>
</div>
`;
    }

    static concrete_issue_day_content() {
        return `
<div class="doboard_task_widget-concrete_issue-day_content">
    <div class="doboard_task_widget-concrete_issue_day_content-month_day">{{dayContentMonthDay}}</div>
    <div class="doboard_task_widget-concrete_issue_day_content-messages_wrapper">{{dayContentMessages}}</div>
</div>
`;
    }

    static concrete_issue_messages() {
        return `
<div class="doboard_task_widget-comment_data_wrapper">
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-comment_text_container">
        <img src="{{commentContainerBackgroundSrc}}" alt="">
        <div class="doboard_task_widget-comment_body">{{commentBody}}</div>
        <div class="doboard_task_widget-comment_time">{{commentTime}}</div>
    </div>
</div>
`;
    }

    static create_issue() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div style="display: flex;align-items: center;gap: 8px;">
            <img src="{{logoDoBoardWhite}}"  alt="">
            <span>Report an issue</span>
        </div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-create_issue">

        <div class="doboard_task_widget-element-container">
            <span>
                If you found issue with <span style="color: #000000;">{{currentDomain}}</span> page, you are in right place. Please use this form to tell us about the issue you’re experiencing.
                <a href="https://doboard.com" target="_blank">doboard.com</a>
            </span>
        </div>

        <div class="doboard_task_widget-input-container">
            <input id="doboard_task_widget-title" class="doboard_task_widget-field" name="title" value="{{selectedText}}" required>
            <label for="doboard_task_widget-title">Report about</label>
        </div>

        <div class="doboard_task_widget-input-container">
            <textarea id="doboard_task_widget-description" class="doboard_task_widget-field" name="description" required></textarea>
            <label for="doboard_task_widget-description">Description</label>
        </div>

        <div class="doboard_task_widget-login">

            <span>If you want to receive notifications by email write here you email contacts.</span>

            <div class="doboard_task_widget-accordion">

                <div class="doboard_task_widget-input-container">
                    <input id="doboard_task_widget-user_name" class="doboard_task_widget-field" type="text" name="user_name">
                    <label for="doboard_task_widget-user_name">Nickname</label>
                </div>

                <div class="doboard_task_widget-input-container">
                    <input id="doboard_task_widget-user_email" class="doboard_task_widget-field" type="email" name="user_email">
                    <label for="doboard_task_widget-user_email">Email</label>
                </div>

                <div class="doboard_task_widget-input-container hidden">
                    <input id="doboard_task_widget-user_password" class="doboard_task_widget-field" type="password" name="user_password">
                    <label for="doboard_task_widget-user_password">Password</label>
                </div>

                <i>Note about DoBoard register and accepting email notifications about tasks have to be here.</i>

            </div>

        </div>

        <div class="doboard_task_widget-field">
            <button id="doboard_task_widget-submit_button" class="doboard_task_widget-submit_button">Submit</button>
        </div>

        <div class="doboard_task_widget-message-wrapper hidden">
            <span id="doboard_task_widget-error_message-header"></span>
            <div id="doboard_task_widget-error_message"></div>
        </div>
    </div>
</div>
`;
    }

    static list_issues() {
        return `
<div class="doboard_task_widget-task_row issue-item" data-node-path='[{{nodePath}}]' data-task-id='{{taskId}}'>
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-description_container">
        <div class="doboard_task_widget-task_title">
            <div class="doboard_task_widget-task_title-details">
                <span class="doboard_task_widget-task_title-text">{{taskTitle}}</span>
                <div class="doboard_task_widget-task_title_public_status_img">
                    <img src="{{taskPublicStatusImgSrc}}" alt="" title="{{taskPublicStatusHint}}">
                </div>
                <span class="doboard_task_widget-task_title-unread_block {{classUnread}}"></span>
            </div>
            <div class="doboard_task_widget-task_title-last_update_time">{{taskLastUpdate}}</div>
        </div>
        <div class="doboard_task_widget-task_last_message">
            <span>{{taskLastMessage}}</span>
        </div>
    </div>
</div>
`;
    }

    static wrap() {
        return `
<div class="doboard_task_widget-wrap">
    <img src="{{logoDoBoardWrap}}" alt="Doboard logo">
    <div id="doboard_task_widget-task_count" class="hidden"></div>
</div>
`;
    }
}

class SpotFixSVGLoader {
    static loadSVG(svgName) {
        const svgMethod = this[svgName];

        if (typeof svgMethod !== 'function') {
            throw new Error(`Template method '${svgName}' not found`);
        }

        return svgMethod.call(this).trim();
    }

    static getAsRawSVG(svgName) {
        return this.loadSVG(svgName);
    }

    static getAsDataURI(svgName) {
        const svg = this.loadSVG(svgName);
        return this.svgToDataURI(svg);
    }

    static svgToDataURI(svgString) {
        const bytes = new TextEncoder().encode(svgString);
        const baseBtoa = btoa(String.fromCharCode(...bytes));
        return `data:image/svg+xml;base64,${baseBtoa}`;
    }

    static chevronBack() {
        return `
<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 13L1 7L7 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static buttonCloseScreen() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6L18 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static buttonCloseWidget() {
        return `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <foreignObject x="-4" y="-4" width="30" height="30"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(2px);clip-path:url(#bgblur_0_18989_2826_clip_path);height:100%;width:100%"></div></foreignObject><path data-figma-bg-blur-radius="4" d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z" fill="black" fill-opacity="0.7"/>
    <path d="M16 6L6 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 6L16 16" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
        <clipPath id="bgblur_0_18989_2826_clip_path" transform="translate(4 4)"><path d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"/>
        </clipPath></defs>
</svg>`;
    }

    static buttonSendMessage() {
        return `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#22A475"/>
    <g clip-path="url(#clip0_458_94)">
        <path d="M22.3337 7.6665L13.167 16.8332" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22.3337 7.6665L16.5003 24.3332L13.167 16.8332L5.66699 13.4998L22.3337 7.6665Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
        <clipPath id="clip0_458_94">
            <rect width="20" height="20" fill="white" transform="translate(4 6)"/>
        </clipPath>
    </defs>
</svg>`;
    }

    static buttonPaperClip() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.4393 11.0499L12.2493 20.2399C11.1235 21.3658 9.5965 21.9983 8.00431 21.9983C6.41213 21.9983 4.88516 21.3658 3.75931 20.2399C2.63347 19.1141 2.00098 17.5871 2.00098 15.9949C2.00098 14.4027 2.63347 12.8758 3.75931 11.7499L12.9493 2.55992C13.6999 1.80936 14.7179 1.3877 15.7793 1.3877C16.8408 1.3877 17.8588 1.80936 18.6093 2.55992C19.3599 3.31048 19.7815 4.32846 19.7815 5.38992C19.7815 6.45138 19.3599 7.46936 18.6093 8.21992L9.40931 17.4099C9.03403 17.7852 8.52504 17.996 7.99431 17.996C7.46359 17.996 6.95459 17.7852 6.57931 17.4099C6.20403 17.0346 5.9932 16.5256 5.9932 15.9949C5.9932 15.4642 6.20403 14.9552 6.57931 14.5799L15.0693 6.09992" stroke="#707A83" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static backgroundInputMessage() {
        return `
<svg width="254" height="37" viewBox="0 0 254 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="254" height="37" rx="18.5" fill="#F3F6F9"/>
</svg>`;
    }

    static logoDoBoardWhite() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3435 1.87294e-10H0V24H7.04064H12.3435C27.8855 24 27.8855 -7.7417e-05 12.3435 1.87294e-10ZM7.04064 24C3.18002 24 0.0503678 20.7764 0.0503678 16.8C0.0503678 12.8236 3.18002 9.6 7.04064 9.6C10.9012 9.6 14.0309 12.8236 14.0309 16.8C14.0309 20.7764 10.9012 24 7.04064 24Z" fill="white"/>
</svg>`;
    }

    static logoDoBoardWrap() {
        return `
<svg width="71" height="72" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.113132 71.1182L0.109378 35.8851C0.106353 28.9195 2.16921 22.1096 6.03703 16.3165C9.90485 10.5235 15.4039 6.00773 21.8385 3.34038C28.2731 0.673036 35.3543 -0.0260367 42.1862 1.33159C49.0182 2.68922 55.2941 6.04255 60.22 10.9674C65.1459 15.8923 68.5006 22.1675 69.8597 28.9991C71.2188 35.8308 70.5212 42.9121 67.8552 49.3473C65.1893 55.7825 60.6746 61.2825 54.8824 65.1515C49.0903 69.0206 42.2807 71.0849 35.3151 71.0834L0.113132 71.1182Z" fill="#1C7857"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M37.5152 20H19V56H29.561H37.5152C60.8283 56 60.8283 19.9999 37.5152 20ZM29.561 56C23.77 56 19.0756 51.1647 19.0756 45.2C19.0756 39.2353 23.77 34.4 29.561 34.4C35.3519 34.4 40.0463 39.2353 40.0463 45.2C40.0463 51.1647 35.3519 56 29.561 56Z" fill="white"/>
</svg>`;
    }

    static iconSpotPublic() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0008 3.00027C7.17178 2.96187 2.97093 7.00382 3.00088 12.0003C2.91808 17.8096 8.71723 22.2578 14.3059 20.7002C24.3554 17.8039 22.5675 3.27107 12.0008 3.00027ZM17.2508 14.9653C16.9608 17.0153 15.9608 18.4703 14.8258 19.4853C14.6508 19.5503 14.4758 19.6103 14.2958 19.6603C14.1558 17.2853 13.0958 16.9203 12.0608 16.5603C10.7322 16.2243 9.99648 15.2916 9.96088 14.0202C9.89083 13.3953 9.82083 12.7453 9.14083 12.2903C8.43083 11.8203 7.81583 11.7753 7.27078 11.7303C6.62578 11.6803 6.15578 11.6453 5.71578 10.8753C4.81578 9.30527 5.90578 7.25027 7.28578 5.54027C8.61078 4.57527 10.2408 4.00027 12.0008 4.00027C12.8538 3.90392 14.0209 4.33902 14.2658 5.08032C14.5767 5.92247 13.1037 6.60767 12.7758 7.39027C12.4607 8.02027 12.6508 8.49527 12.7908 8.84027C12.9208 9.16027 12.9258 9.22027 12.8258 9.32527C12.5558 9.59027 12.1558 9.42527 11.5258 9.13527C10.8908 8.84527 10.1708 8.51527 9.42078 8.76527C7.72903 9.29942 8.01078 11.1962 9.50078 11.2503C9.94588 11.2463 10.8294 10.9818 11.1558 11.2353C11.1958 11.2703 11.2508 11.3353 11.2508 11.5003C11.3243 12.6158 12.6735 12.6987 13.6107 12.2253C14.4508 11.8053 14.5508 11.9053 15.3258 12.6752C16.081 13.5538 17.4843 13.5449 17.2508 14.9653Z" fill="#252A2F"/>
</svg>`;
    }

    static iconSpotPrivate() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0008 2.99978C7.17178 2.96138 2.97093 7.00333 3.00088 11.9998C2.91808 17.8091 8.71723 22.2573 14.3059 20.6997C24.3554 17.8034 22.5675 3.27058 12.0008 2.99978ZM17.2508 14.9648C16.9608 17.0148 15.9608 18.4698 14.8258 19.4848C14.6508 19.5498 14.4758 19.6098 14.2958 19.6598C14.1558 17.2848 13.0958 16.9198 12.0608 16.5598C10.7322 16.2238 9.99648 15.2911 9.96088 14.0197C9.89083 13.3948 9.82083 12.7448 9.14083 12.2898C8.43083 11.8198 7.81583 11.7748 7.27078 11.7298C6.62578 11.6798 6.15578 11.6448 5.71578 10.8748C4.81578 9.30478 5.90578 7.24978 7.28578 5.53978C8.61078 4.57478 10.2408 3.99978 12.0008 3.99978C12.8538 3.90343 14.0209 4.33853 14.2658 5.07983C14.5767 5.92198 13.1037 6.60718 12.7758 7.38978C12.4607 8.01978 12.6508 8.49478 12.7908 8.83978C12.9208 9.15978 12.9258 9.21978 12.8258 9.32478C12.5558 9.58978 12.1558 9.42478 11.5258 9.13478C10.8908 8.84478 10.1708 8.51478 9.42078 8.76478C7.72903 9.29893 8.01078 11.1957 9.50078 11.2498C9.94588 11.2458 10.8294 10.9813 11.1558 11.2348C11.1958 11.2698 11.2508 11.3348 11.2508 11.4998C11.3243 12.6153 12.6735 12.6982 13.6107 12.2248C14.4508 11.8048 14.5508 11.9048 15.3258 12.6747C16.081 13.5533 17.4843 13.5444 17.2508 14.9648Z" fill="#252A2F"/>
<path d="M4.5001 20.5L21.5 4.5" stroke="white" stroke-width="1.5"/>
<line x1="3.08787" y1="19.8516" x2="21.0879" y2="3.05161" stroke="#252A2F" stroke-width="1.5"/>
</svg>`;
    }

    static backgroundCloudCommentSelf() {
        return `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="295px" height="101px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
<g><path style="opacity:1" fill="#eaf9f3" d="M 9.5,-0.5 C 99.5,-0.5 189.5,-0.5 279.5,-0.5C 283.811,1.6467 286.978,4.98004 289,9.5C 289.333,36.1667 289.667,62.8333 290,89.5C 289.938,93.377 291.438,96.377 294.5,98.5C 294.5,99.1667 294.5,99.8333 294.5,100.5C 291.833,100.5 289.167,100.5 286.5,100.5C 284.098,98.1093 281.764,98.1093 279.5,100.5C 189.833,100.5 100.167,100.5 10.5,100.5C 5.58321,98.5851 1.91654,95.2517 -0.5,90.5C -0.5,63.5 -0.5,36.5 -0.5,9.5C 1.83333,5.16667 5.16667,1.83333 9.5,-0.5 Z"/></g>
</svg>`;
    }
    static backgroundCloudCommentOthers() {
        return `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="295px" height="67px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
<g><path style="opacity:1" fill="#fefefe" d="M -0.5,-0.5 C 5.5,-0.5 11.5,-0.5 17.5,-0.5C 11.2864,1.21059 7.1197,5.21059 5,11.5C 4.66667,27.1667 4.33333,42.8333 4,58.5C 3.48417,61.5469 1.98417,63.8802 -0.5,65.5C -0.5,43.5 -0.5,21.5 -0.5,-0.5 Z"/></g>
<g><path style="opacity:1" fill="#f3f6f9" d="M 17.5,-0.5 C 105.833,-0.5 194.167,-0.5 282.5,-0.5C 288.167,1.83333 292.167,5.83333 294.5,11.5C 294.5,25.8333 294.5,40.1667 294.5,54.5C 292.167,60.1667 288.167,64.1667 282.5,66.5C 193.833,66.5 105.167,66.5 16.5,66.5C 14.7095,65.6087 12.8761,64.6087 11,63.5C 9.12386,64.6087 7.29053,65.6087 5.5,66.5C 3.5,66.5 1.5,66.5 -0.5,66.5C -0.5,66.1667 -0.5,65.8333 -0.5,65.5C 1.98417,63.8802 3.48417,61.5469 4,58.5C 4.33333,42.8333 4.66667,27.1667 5,11.5C 7.1197,5.21059 11.2864,1.21059 17.5,-0.5 Z"/></g>
<g><path style="opacity:1" fill="#fefefe" d="M 282.5,-0.5 C 286.5,-0.5 290.5,-0.5 294.5,-0.5C 294.5,3.5 294.5,7.5 294.5,11.5C 292.167,5.83333 288.167,1.83333 282.5,-0.5 Z"/></g>
<g><path style="opacity:1" fill="#fefefe" d="M 294.5,54.5 C 294.5,58.5 294.5,62.5 294.5,66.5C 290.5,66.5 286.5,66.5 282.5,66.5C 288.167,64.1667 292.167,60.1667 294.5,54.5 Z"/></g>
<g><path style="opacity:1" fill="#fdfdfe" d="M 16.5,66.5 C 12.8333,66.5 9.16667,66.5 5.5,66.5C 7.29053,65.6087 9.12386,64.6087 11,63.5C 12.8761,64.6087 14.7095,65.6087 16.5,66.5 Z"/></g>
</svg>`;
    }
}

class SpotFixSourcesLoader {

    constructor() {
        this.loadAll();
    }

    getCSSCode() {
        // global gulp wrapper var
        return spotFixCSS;
    }

    loadAll() {
        this.loadFonts();
        this.loadCSS();
    };

    loadFonts() {
        const preconnect_first = document.createElement('link');
        preconnect_first.rel = 'preconnect';
        preconnect_first.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnect_first);

        const preconnect_second = document.createElement('link');
        preconnect_second.rel = 'preconnect';
        preconnect_second.href = 'https://fonts.gstatic.com';
        preconnect_second.crossOrigin = 'crossorigin';
        document.head.appendChild(preconnect_second);

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
        document.head.appendChild(fontLink);
    }

    loadCSS() {
        const style = document.createElement('style');
        style.setAttribute('id', 'spotfix_css');
        style.textContent = this.getCSSCode();
        document.head.appendChild(style);
    }
}

document.dispatchEvent(new CustomEvent('spotFixLoaded', {
    detail: {
        timestamp: new Date().toISOString(),
        message: 'All scripts loaded successfully'
    }
}));
