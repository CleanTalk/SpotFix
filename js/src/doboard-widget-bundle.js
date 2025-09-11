const DOBOARD_API_URL = 'https://api-next.doboard.com';

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

const registerUserDoboard = async (projectToken, accountId, email, nickname) => {
    const formData = new FormData();
    formData.append('project_token', projectToken);
    formData.append('account_id', accountId);
    if (email && nickname) {
        formData.append('email', email);
        formData.append('nickname', nickname);
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
        if (responseBody.data.user_email_confirmed === 1) {
            return {
                accountExists: true
            }
        }
        return {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: responseBody.data.email
        }
    }
    throw new Error('Unknown error occurred during registration');
};

const loginUser = async (email, password) => {
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
            email: email
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


const getTaskCommentsDoboard = async (taskId, sessionId, accountId, projectToken, status = 'ACTIVE') => {
    const response = await fetch(
        DOBOARD_API_URL + '/' + accountId + '/comment_get' +
        '?session_id=' + sessionId +
        '&status=' + status +
        '&task_id=' + taskId +
        '&project_token=' + projectToken,
    {
        method: 'GET',
    });

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
async function getTaskFullDetails(params, taskId) {
	const sessionId = localStorage.getItem('spotfix_session_id');
	const comments = await getTaskCommentsDoboard(taskId, sessionId, params.accountId, params.projectToken);
	const users = await getUserDoboard(sessionId, params.projectToken, params.accountId);

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
 			const { date, time } = formatDate(comment.commentDate);
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

	const resultRegisterUser = registerUserDoboard(projectToken, accountId, userEmail, userName)
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
			} else {
				throw new Error('Session ID not found in response');
			}
		})
		.catch(error => {
			throw error;
		});

		return resultRegisterUser;
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
        this.allTasksData = await getAllTasks(this.params);
        // Check if any task has updates
        const flagAnyTaskUpdated = isAnyTaskUpdated(this.allTasksData);
        storageSaveTasksUpdateData(this.allTasksData);
        //check to hide on first run
        if (!storageWidgetCloseIsSet()) {
            storageSetWidgetIsClosed(true);
        }
        //check to show if any task has updates
        if (flagAnyTaskUpdated) {
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

                let submitTaskResult;
                try {
                    submitTaskResult = await this.submitTask(taskDetails);
                } catch (error) {
                    this.registrationErrorShow(error.message);
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

                this.selectedData = {};
                await this.createWidgetElement('all_issues');
                hideContainersSpinner(false)
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
                // todo: this is call duplicate!
                getTaskFullDetails(this.params, this.currentActiveTaskId).then(taskDetails=>{
                    const issueTitle = taskDetails.issueTitle;
                    const issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                    if ( issueTitleElement ) {
                        issueTitleElement.innerHTML = issueTitle;
                    }
                });

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


        switch (type) {
            case 'create_issue':
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
                this.removeTextSelection();
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
                        const taskDataString = elTask.taskMeta;
                        const { time: lastMessageTime } = formatDate(elTask.taskLastUpdate);
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
                            const avatarData = getAvatarData(taskFullDetails);
                            const variables = {
                                taskTitle: taskTitle || '',
                                taskAuthorAvatarImgSrc: taskFullDetails.taskAuthorAvatarImgSrc,
                                taskAuthorName: taskFullDetails.taskAuthorName,
                                taskPublicStatusImgSrc: taskPublicStatusImgSrc,
                                taskPublicStatusHint: taskPublicStatusHint,
                                taskLastMessage: taskFullDetails.lastMessageText,
                                taskLastUpdate: lastMessageTime,
                                nodePath: taskNodePath,
                                taskId: taskId,
                                avatarCSSClass: avatarData.avatarCSSClass,
                                avatarStyle: avatarData.avatarStyle,
                                taskAuthorInitials: avatarData.taskAuthorInitials,
                                initialsClass: avatarData.initialsClass
                            };
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
                variables = {
                    issueTitle: taskDetails.issueTitle,
                    issueComments: taskDetails.issueComments,
                    issuesCounter: getIssuesCounterString(),
                    chevronBackTitle: 'Back to all spots',
                };
                const issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
                let dayMessagesData = [];
                const initIssuerID = localStorage.getItem('spotfix_user_id');
                let userIsIssuer = false;
                if ( taskDetails.issueComments.length > 0 ) {
                    issuesCommentsContainer.innerHTML = '';
                    for (const comment of taskDetails.issueComments) {
                        userIsIssuer = Number(initIssuerID) === Number(comment.commentUserId);
                        if (!userIsIssuer) {
                            storageSetWidgetIsClosed(false);
                        }
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
                            issuesCounter: variables.issuesCounter,
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

            await registerUser(taskDetails);

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
        this.removeTextSelection();
        this.createWidgetElement('wrap');
    }

    removeTextSelection() {
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

    highlightElements(spotsToBeHighlighted) {
        if ( spotsToBeHighlighted.length === 0 ) {
            return;
        }
        let sortedSpots = new Map();
        // Aggregate selections by HtmlElement: [Element1 => [selection1, selection2], Element2 => [selection3]]
        spotsToBeHighlighted.forEach(spot => {
            const element = retrieveNodeFromPath(spot.nodePath);
            if ( ! sortedSpots.has(element) ) {
                sortedSpots.set(element, []);
            }
            const currentData = sortedSpots.get(element);
            currentData.push({
                selectStartPosition: spot.startSelectPosition,
                selectEndPosition: spot.endSelectPosition,
            });
        })
        // Render selections for the HtmlElement
        const highlightWrapperOpen = '<span class="doboard_task_widget-text_selection">';
        const highlightWrapperClose = '</span>';
        sortedSpots.forEach((spotSelectionsPositions, element) => {
            // If the element no provided
            if ( ! element ) {
                return;
            }
            //Is the element is the not simple text one
            if ( element.children.length > 0 ) {
                // @ToDo make selection for the difficult elements
                //console.log('Try to highlight difficult element: ' + element.innerHTML); // The debug statement
                return;
            }
            const positions = [];
            spotSelectionsPositions.forEach(spotSelectionPositions => {
                positions.push(
                    { pos: spotSelectionPositions.selectStartPosition, type: 'start' },
                    { pos: spotSelectionPositions.selectEndPosition, type: 'end' }
                );
            })

            positions.sort((a, b) => b.pos - a.pos);

            let text = element.innerHTML;
            let prevSlicePosition = null;
            let slicedStringWithSelections = [];
            positions.forEach(position => {
                let afterText = text.substring(position.pos, prevSlicePosition ? prevSlicePosition : position.pos);
                prevSlicePosition = position.pos;
                let span = position.type === 'start' ? highlightWrapperOpen : highlightWrapperClose;
                slicedStringWithSelections.unshift(afterText);
                slicedStringWithSelections.unshift(span);
            })
            element.innerHTML = text.substring(0, prevSlicePosition) + slicedStringWithSelections.join('');
        })
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

    registrationErrorShow(errorText) {
        const errorDiv = document.getElementById('doboard_task_widget-error_message');
        const errorWrap = document.querySelector('.doboard_task_widget-error_message-wrapper');
        if (typeof errorText === 'string' && errorDiv !== null && errorWrap !== null) {
            errorDiv.innerText = errorText;
            errorWrap.classList.remove('hidden');
        }
    }
}

var selectedData = {};
var widgetTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    new CleanTalkWidgetDoboard({}, 'wrap');
});

document.addEventListener('selectionchange', function(e) {
    if (widgetTimeout) {
        clearTimeout(widgetTimeout);
    }

    widgetTimeout = setTimeout(() => {
        const selection = window.getSelection();
        if (
            selection.type === 'Range'
        ) {
            const selectedData = getSelectedData(selection);
            let widgetExist = document.querySelector('.doboard_task_widget-container');
            openWidget(selectedData, widgetExist, 'create_issue');
        }
    }, 1000);
});

/**
 * Open the widget to create a task.
 * @param {*} selectedData
 * @param {*} widgetExist
 * @param {*} type
 */
function openWidget(selectedData, widgetExist, type) {

    if (selectedData && !widgetExist) {
        new CleanTalkWidgetDoboard(selectedData, type);
    }
}

/**
 * Get the selected data from the DOM
 * @param {Selection} selectedData
 * @returns {Object}
 */
function getSelectedData(selectedData) {
    let pageURL = window.location.href;
    let selectedText = selectedData.toString();
    const anchorOffset = selectedData.anchorOffset;
    const focusOffset = selectedData.focusOffset;
    const nodeToCalculate = selectedData.focusNode.nodeName === '#text' ? selectedData.focusNode.parentNode : selectedData.focusNode;
    return {
        startSelectPosition: Math.min(anchorOffset, focusOffset),
        endSelectPosition: Math.max(anchorOffset, focusOffset),
        selectedText: selectedText,
        pageURL: pageURL,
        nodePath: calculateNodePath(nodeToCalculate),
    };
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

function getAvatarData(authorDetails) {
    let avatarStyle;
    let avatarCSSClass;
    let taskAuthorInitials;
    let hideAvatar = authorDetails.hasOwnProperty('userIsIssuer') && authorDetails.userIsIssuer === true;
    let initialsClass = 'doboard_task_widget-avatar-initials';
    if (authorDetails.taskAuthorAvatarImgSrc === null) {
        avatarStyle = `background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMt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');`;
        avatarCSSClass = 'doboard_task_widget-avatar_container';
        initialsClass += ' doboard_task_widget-hidden_element';
    } else {
        avatarStyle = `background-image:url(\'${authorDetails.taskAuthorAvatarImgSrc}\');`;
        avatarCSSClass = 'doboard_task_widget-avatar_container';
        initialsClass += ' doboard_task_widget-hidden_element';
    }
    return {
        avatarStyle: avatarStyle,
        avatarCSSClass: avatarCSSClass,
        taskAuthorInitials: taskAuthorInitials,
        initialsClass: initialsClass
    }
}

function storageGetWidgetIsClosed() {
    return localStorage.getItem('spotfix_widget_is_closed') === '1';
}

function storageWidgetCloseIsSet() {
    return localStorage.getItem('spotfix_widget_is_closed') !== null;
}

function storageSetWidgetIsClosed(visible) {
    localStorage.setItem('spotfix_widget_is_closed', visible ? '1' : '0');
}

function storageGetUserIsDefined() {
    return localStorage.getItem('spotfix_user_id') !== null;
}

function storageSaveTasksUpdateData(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');

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

function isAnyTaskUpdated(allTasksData) {
    let result = false;

    for(const i in allTasksData) {
        let currentStateOfTask = allTasksData[i];
        if (currentStateOfTask.taskId && currentStateOfTask.taskLastUpdate) {
            result = storageCheckTaskUpdate(currentStateOfTask.taskId, currentStateOfTask.taskLastUpdate);
            if (result) {
                break;
            }
        }
    }
    return result;
}
