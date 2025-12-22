const DOBOARD_API_URL = 'https://api.doboard.com';

/**
 * Makes an API call to the DoBoard endpoint with form data
 *
 * @param {Object} data - The data to send in the request
 * @param {string} method - The API method to call
 * @param {string|number} accountId - Optional account ID for the endpoint
 *
 * @returns {Promise<Object>} The response data when operation_status is 'SUCCESS'
 */
const spotfixApiCall = async(data, method, accountId = undefined) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be a valid object');
    }

    if (!method || typeof method !== 'string') {
        throw new Error('Method must be a valid string');
    }

    if (accountId !== undefined && (typeof accountId !== 'string' && typeof accountId !== 'number')) {
        throw new Error('AccountId must be a string or number');
    }

    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] !== undefined && data[key] !== null) {
                formData.append(key, data[key]);
            }
        }
    }

    let endpointUrl;
    if (accountId !== undefined) {
        endpointUrl = `${DOBOARD_API_URL}/${accountId}/${method}`;
    } else {
        endpointUrl = `${DOBOARD_API_URL}/${method}`;
    }

    try {
        new URL(endpointUrl);
    } catch (error) {
        throw new Error(`Invalid endpoint URL: ${endpointUrl}`);
    }

    let response;
    try {
        response = await fetch(endpointUrl, {
            method: 'POST',
            body: formData,
        });
    } catch (networkError) {
        throw new Error(`Network error: ${networkError.message}`);
    }

    let responseBody;
    try {
        responseBody = await response.json();
    } catch (parseError) {
        throw new Error('Failed to parse JSON response from server');
    }

    if (!responseBody || typeof responseBody !== 'object') {
        throw new Error('Invalid response format from server');
    }

    if (!responseBody.data) {
        throw new Error('Missing data field in server response');
    }

    if (!responseBody.data.operation_status) {
        throw new Error('Missing operation_status in response data');
    }

    if (responseBody.data.operation_status === 'FAILED') {
        const errorMessage = responseBody.data.operation_message || 'Operation failed without specific message';
        throw new Error(errorMessage);
    }

    if (responseBody.data.operation_status === 'SUCCESS') {
        return responseBody.data;
    }

    throw new Error(`Unknown operation status: ${responseBody.data.operation_status}`);
}

const userConfirmEmailDoboard = async (emailConfirmationToken) => {
    const data = {
        email_confirmation_token: encodeURIComponent(emailConfirmationToken)
    }
    const result = await spotfixApiCall(data, 'user_confirm_email');
    return {
        sessionId: result.session_id,
        userId: result.user_id,
        email: result.email,
        accounts: result.accounts,
        operationStatus: result.operation_status
    };
};

const createTaskDoboard = async (sessionId, taskDetails) => {
    const accountId = taskDetails.accountId
    const data = {
        session_id: sessionId,
        project_token: taskDetails.projectToken,
        project_id: taskDetails.projectId,
        user_id: localStorage.getItem('spotfix_user_id'),
        name: taskDetails.taskTitle,
        comment: taskDetails.taskDescription,
        meta: taskDetails.taskMeta,
        task_type: 'PUBLIC'
    }
    const result = await spotfixApiCall(data, 'task_add', accountId);
    return {
        taskId: result.task_id,
    }
};

const createTaskCommentDoboard = async (accountId, sessionId, taskId, comment, projectToken, status = 'ACTIVE') => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        task_id: taskId,
        comment: comment,
        status: status
    }
    const result = await spotfixApiCall(data, 'comment_add', accountId);
    return {
        commentId: result.comment_id,
    };
};

const attachmentAddDoboard = async (fileData) => {
    const accountId = fileData.params.accountId;
    const data = {
        session_id: fileData.sessionId,
        project_token: fileData.params.projectToken,
        account_id: fileData.params.accountId,
        comment_id: fileData.commentId,
        filename: fileData.fileName,
        file: fileData.fileBinary,
        attachment_order: fileData.attachmentOrder
    }
    const result = await spotfixApiCall(data, 'attachment_add', accountId);
    // @ToDo need to handle result?
};

const registerUserDoboard = async (projectToken, accountId, email, nickname, pageURL) => {
    let data = {
        project_token: projectToken,
        account_id: accountId,
        confirmation_url: email,
    }
    if (email && nickname) {
        data.email = email;
        data.name = nickname;
    }
    const result = await spotfixApiCall(data, 'user_registration');
    return {
        sessionId: result.session_id,
        userId: result.user_id,
        email: result.email,
        accountExists: result.user_email_confirmed === 1,
        operationMessage: result.operation_message,
        operationStatus: result.operation_status,
        userEmailConfirmed: result.user_email_confirmed,
    };
};

const loginUserDoboard = async (email, password) => {
    const data = {
        email: email,
        password: password,
    }
    const result = await spotfixApiCall(data, 'user_authorize');
    return {
        sessionId: result.session_id,
        userId: result.user_id,
        email: result.email,
        accountExists: result.user_email_confirmed === 1,
        operationMessage: result.operation_message,
        operationStatus: result.operation_status,
        userEmailConfirmed: result.user_email_confirmed,
    }
}

const getTasksDoboard = async (projectToken, sessionId, accountId, projectId, userId) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        project_id: projectId,
        task_type: 'PUBLIC'
    }
    if ( userId ) {
        data.user_id = userId;
    }
    const result = await spotfixApiCall(data, 'task_get', accountId);
    const tasks = result.tasks.map(task => ({
        taskId: task.task_id,
        taskTitle: task.name,
        taskLastUpdate: task.updated,
        taskCreated: task.created,
        taskCreatorTaskUser: task.creator_user_id,
        taskMeta: task.meta,
        taskStatus: task.status,
    }));

    storageSaveTasksCount(tasks);

    return tasks;
}


const getTasksCommentsDoboard = async (sessionId, accountId, projectToken, status = 'ACTIVE') => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        status: status
    }
    const result = await spotfixApiCall(data, 'comment_get', accountId);
    return result.comments.map(comment => ({
        taskId: comment.task_id,
        commentId: comment.comment_id,
        userId: comment.user_id,
        commentBody: comment.comment,
        commentDate: comment.updated,
        status: comment.status,
        issueTitle: comment.task_name,
    }));
};

const getUserDoboard = async (sessionId, projectToken, accountId) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
    }
    const result = await spotfixApiCall(data, 'user_get', accountId);
    return result.users;

    // @ToDo Need to handle these two different answers?
    /*// Format 1: users inside data
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
    }*/
};

const userUpdateDoboard = async (projectToken, accountId, sessionId, userId, timezone) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
        user_id: userId,
        timestamp: timezone
    }
    await spotfixApiCall(data, 'user_update', accountId);
    return {
        success: true
    };
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

	let pendingTask;
	try {
		pendingTask = JSON.parse(pendingTaskRaw);
	} catch (error) {
		throw new Error('Invalid pending task data');
	}

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

async function getTasksFullDetails(params, tasks, currentActiveTaskId) {
    if (tasks.length > 0) {
        const sessionId = localStorage.getItem('spotfix_session_id');
        const comments = await getTasksCommentsDoboard(sessionId, params.accountId, params.projectToken);
        const users = await getUserDoboard(sessionId, params.projectToken, params.accountId);
		const foundTask = tasks.find(item => +item.taskId === +currentActiveTaskId);

        return {
            comments: comments,
            users: users,
			taskStatus: foundTask?.taskStatus,
        };
    }
}

async function handleCreateTask(sessionId, taskDetails) {
	try {
		const result = await createTaskDoboard(sessionId, taskDetails);
		if (result && result.taskId && taskDetails.taskDescription) {
            const sign = `<br><br><br><em>The spot has been posted at the following URL <a href="${window.location.href}"><span class="task-link task-link--done">${window.location.href}</span></a></em>`;
			await addTaskComment({
				projectToken: taskDetails.projectToken,
				accountId: taskDetails.accountId
			}, result.taskId, taskDetails.taskDescription+sign);
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
	return ` (${onPageSpotsCount}/${totalSpotsCount})`;
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
				document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container").innerText = ksesFilter('Account already exists. Please, login usin your password.');
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

function spotFixSplitUrl(url) {
	try {
		const u = new URL(url);
		const domain = u.host;

		const segments = u.pathname.split('/').filter(Boolean);

		if (segments.length === 0) {
			return domain;
		}

		const reversed = segments.reverse();
		reversed.push(domain);
		return reversed.join(' / ');
	} catch (error) {
		return '';
	}

}

function addIconPack() {

	if (tinymce?.IconManager) {
		tinymce.IconManager.add("my_icon_pack", {
			icons: {
				'paperclip': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M14.4648 0.522461C15.6367 0.522493 16.7612 0.987773 17.5898 1.81641C18.4185 2.64507 18.8838 3.76952 18.8838 4.94141C18.8837 6.11309 18.4183 7.23685 17.5898 8.06543L9.15625 16.4902C8.6717 16.9747 8.01428 17.247 7.3291 17.2471C6.64372 17.2471 5.98563 16.9749 5.50098 16.4902C5.01634 16.0056 4.74414 15.3475 4.74414 14.6621C4.74422 13.9769 5.01652 13.3195 5.50098 12.835L13.2842 5.06152C13.5771 4.76897 14.052 4.7688 14.3447 5.06152C14.6374 5.35457 14.6377 5.83034 14.3447 6.12305L6.5625 13.8955C6.35922 14.0988 6.24422 14.3746 6.24414 14.6621C6.24414 14.9497 6.35916 15.2254 6.5625 15.4287C6.76585 15.632 7.04154 15.7471 7.3291 15.7471C7.61656 15.747 7.89243 15.632 8.0957 15.4287L16.5293 7.00488L16.7227 6.79102C17.1482 6.27169 17.3837 5.61868 17.3838 4.94141C17.3838 4.16735 17.0766 3.42431 16.5293 2.87695C15.982 2.32963 15.2389 2.02249 14.4648 2.02246C13.691 2.02253 12.9486 2.32984 12.4014 2.87695L3.97754 11.3018C3.08624 12.1931 2.58504 13.4016 2.58496 14.6621C2.58496 15.9227 3.08617 17.1321 3.97754 18.0234C4.86885 18.9146 6.0775 19.415 7.33789 19.415C8.59844 19.415 9.80788 18.9148 10.6992 18.0234L19.123 9.59961C19.4159 9.30678 19.8907 9.30674 20.1836 9.59961C20.4763 9.8925 20.4764 10.3673 20.1836 10.6602L11.7598 19.084C10.5871 20.2566 8.99626 20.915 7.33789 20.915C5.67955 20.915 4.08866 20.2566 2.91602 19.084C1.74348 17.9113 1.08496 16.3204 1.08496 14.6621C1.08504 13.004 1.74366 11.4138 2.91602 10.2412L11.3408 1.81641C12.1694 0.987987 13.2932 0.52253 14.4648 0.522461Z" fill="#707A83"/>\n' +
					'</svg>',
				'numlist': '<svg viewBox="0 0 20 20"><path d="M17.5 5.8H6.7c-.4 0-.8-.4-.8-.8s.3-.8.8-.8h10.8c.4 0 .8.3.8.8s-.4.8-.8.8zm.7 4.2c0-.4-.3-.8-.8-.8H6.7c-.4 0-.8.3-.8.8s.3.8.8.8h10.8c.4 0 .7-.4.7-.8zm0 5c0-.4-.3-.8-.8-.8H6.7c-.4 0-.8.3-.8.8s.3.8.8.8h10.8c.4 0 .7-.4.7-.8zM3.2 3.8V6h-.6V4.4l-.5.2v-.5l.5-.3h.6zM2.1 11v-.4l.9-.7.1-.1.1-.1v-.1-.1l-.1-.1h-.2l-.1.1v.2h-.7l.1-.4.3-.4.4-.1.5.1.3.2.1.4-.1.3-.2.3-.4.4H3h.9v.5H2.1zM3 16l-.5-.1-.3-.2-.1-.4h.6v.1l.1.1H3.1l.1-.1v-.1-.1l-.1-.1h-.4v-.4h.5l.1-.1v-.1-.1l-.1-.1H3l-.1.1v.1h-.7l.1-.4.3-.2.4-.1.4.1.3.2.1.3-.1.3-.3.1.4.2.1.3-.1.3-.3.2c-.2.2-.3.2-.5.2z"/></svg>',
				'screenshot': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M14.667 13C15.352 13.0001 16.0088 13.2724 16.4932 13.7568C16.9776 14.2412 17.2499 14.898 17.25 15.583C17.25 16.2682 16.9776 16.9257 16.4932 17.4102C16.0088 17.8944 15.3519 18.1669 14.667 18.167C13.9818 18.167 13.3243 17.8946 12.8398 17.4102C12.3554 16.9257 12.083 16.2682 12.083 15.583C12.0831 14.8981 12.3556 14.2412 12.8398 13.7568C13.3243 13.2724 13.9818 13 14.667 13ZM14.667 14.5C14.3797 14.5 14.1036 14.6142 13.9004 14.8174C13.6974 15.0205 13.5831 15.2959 13.583 15.583C13.583 15.8703 13.6972 16.1464 13.9004 16.3496C14.1036 16.5528 14.3797 16.667 14.667 16.667C14.9541 16.6669 15.2295 16.5526 15.4326 16.3496C15.6358 16.1464 15.75 15.8703 15.75 15.583C15.7499 15.2958 15.6357 15.0205 15.4326 14.8174C15.2295 14.6143 14.9542 14.5001 14.667 14.5Z" fill="#707A83"/>\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4551 9.34277C16.562 9.35633 16.6673 9.38342 16.7676 9.42285L16.915 9.49219L17.0518 9.57812C17.1393 9.6412 17.2188 9.71518 17.2881 9.79785L17.3848 9.92871L18.6504 11.8945H19.6172C19.745 11.8946 19.8722 11.9132 19.9941 11.9502L20.1143 11.9932L20.2295 12.0479C20.3045 12.088 20.3756 12.1355 20.4414 12.1895L20.5361 12.2754L20.6221 12.3691C20.676 12.4349 20.7236 12.506 20.7637 12.5811L20.8184 12.6963L20.8613 12.8174C20.8982 12.9393 20.917 13.0665 20.917 13.1943V19.6162C20.917 19.7869 20.8837 19.9566 20.8184 20.1143C20.7531 20.2717 20.6566 20.4146 20.5361 20.5352C20.4155 20.6558 20.2719 20.7521 20.1143 20.8174C19.9568 20.8826 19.7876 20.9159 19.6172 20.916H9.7168C9.54633 20.916 9.37725 20.8826 9.21973 20.8174C9.06208 20.7521 8.91853 20.6558 8.79785 20.5352C8.67731 20.4146 8.58092 20.2718 8.51562 20.1143C8.45029 19.9565 8.41699 19.7869 8.41699 19.6162V13.1943C8.41699 12.8496 8.55416 12.5192 8.79785 12.2754L8.89355 12.1885C9.12475 11.9993 9.41542 11.8946 9.7168 11.8945H10.6836L11.9492 9.92871L12.0459 9.79785C12.1498 9.67401 12.2763 9.57012 12.4189 9.49219C12.6096 9.38824 12.8239 9.33318 13.041 9.33301H16.293L16.4551 9.34277ZM11.8848 12.7988C11.7672 12.9812 11.6054 13.1313 11.415 13.2354C11.2245 13.3393 11.0101 13.3943 10.793 13.3945H9.91699V19.416H19.417V13.3945H18.541C18.3239 13.3944 18.1096 13.3393 17.9189 13.2354C17.7285 13.1314 17.5668 12.9812 17.4492 12.7988L16.1836 10.833H13.1504L11.8848 12.7988Z" fill="#707A83"/>\n' +
					'<path d="M2.75 15.75C3.16421 15.75 3.5 16.0858 3.5 16.5V18.5H5.04199C5.45606 18.5002 5.79199 18.8359 5.79199 19.25C5.79199 19.6641 5.45606 19.9998 5.04199 20H2.75C2.33579 20 2 19.6642 2 19.25V16.5C2 16.0858 2.33579 15.75 2.75 15.75Z" fill="#707A83"/>\n' +
					'<path d="M2.75 7.95801C3.1641 7.95801 3.49982 8.29394 3.5 8.70801V13.292C3.49982 13.7061 3.16411 14.042 2.75 14.042C2.33589 14.042 2.00018 13.7061 2 13.292V8.70801C2.00018 8.29394 2.3359 7.95801 2.75 7.95801Z" fill="#707A83"/>\n' +
					'<path d="M19.25 7.04199C19.6642 7.04199 20 7.37778 20 7.79199V9.16699C19.9998 9.58106 19.6641 9.91699 19.25 9.91699C18.8359 9.91699 18.5002 9.58106 18.5 9.16699V7.79199C18.5 7.37778 18.8358 7.04199 19.25 7.04199Z" fill="#707A83"/>\n' +
					'<path d="M5.5 2C5.91421 2 6.25 2.33579 6.25 2.75C6.25 3.16421 5.91421 3.5 5.5 3.5H3.5V5.5C3.5 5.91421 3.16421 6.25 2.75 6.25C2.33579 6.25 2 5.91421 2 5.5V2.75C2 2.33579 2.33579 2 2.75 2H5.5Z" fill="#707A83"/>\n' +
					'<path d="M19.25 2C19.6642 2 20 2.33579 20 2.75V5.04199C19.9998 5.45606 19.6641 5.79199 19.25 5.79199C18.8359 5.79199 18.5002 5.45606 18.5 5.04199V3.5H16.5C16.0858 3.5 15.75 3.16421 15.75 2.75C15.75 2.33579 16.0858 2 16.5 2H19.25Z" fill="#707A83"/>\n' +
					'<path d="M13.292 2C13.7061 2.00018 14.042 2.33589 14.042 2.75C14.042 3.16411 13.7061 3.49982 13.292 3.5H8.70801C8.29394 3.49982 7.95801 3.1641 7.95801 2.75C7.95801 2.3359 8.29394 2.00018 8.70801 2H13.292Z" fill="#707A83"/>\n' +
					'</svg>\n',
				'list-bull-default': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M2.75879 15.75C3.17279 15.7502 3.50879 16.0859 3.50879 16.5C3.50879 16.9141 3.17279 17.2498 2.75879 17.25H2.75C2.33579 17.25 2 16.9142 2 16.5C2 16.0858 2.33579 15.75 2.75 15.75H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 15.75C19.6641 15.7502 20 16.0859 20 16.5C20 16.9141 19.6641 17.2498 19.25 17.25H7.33301C6.91896 17.2498 6.58301 16.9141 6.58301 16.5C6.58301 16.0859 6.91896 15.7502 7.33301 15.75H19.25Z" fill="#707A83"/>\n' +
					'<path d="M2.75879 10.25C3.17279 10.2502 3.50879 10.5859 3.50879 11C3.50879 11.4141 3.17279 11.7498 2.75879 11.75H2.75C2.33579 11.75 2 11.4142 2 11C2 10.5858 2.33579 10.25 2.75 10.25H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 10.25C19.6641 10.2502 20 10.5859 20 11C20 11.4141 19.6641 11.7498 19.25 11.75H7.33301C6.91896 11.7498 6.58301 11.4141 6.58301 11C6.58301 10.5859 6.91896 10.2502 7.33301 10.25H19.25Z" fill="#707A83"/>\n' +
					'<path d="M2.75879 4.75C3.17279 4.75025 3.50879 5.08594 3.50879 5.5C3.50879 5.91406 3.17279 6.24975 2.75879 6.25H2.75C2.33579 6.25 2 5.91421 2 5.5C2 5.08579 2.33579 4.75 2.75 4.75H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 4.75C19.6641 4.75018 20 5.0859 20 5.5C20 5.9141 19.6641 6.24982 19.25 6.25H7.33301C6.91896 6.2498 6.58301 5.91409 6.58301 5.5C6.58301 5.08591 6.91896 4.7502 7.33301 4.75H19.25Z" fill="#707A83"/>\n' +
					'</svg>',
				'bold': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"\n' +
					'xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd"\n' +
					'd="M12.833 2.91699C14.0044 2.91699 15.1278 3.38265 15.9561 4.21094C16.7843 5.03922 17.25 6.16261 17.25 7.33398C17.2499 8.50524 16.7843 9.62882 15.9561 10.457C15.8706 10.5424 15.7809 10.6226 15.6895 10.7002C16.1237 10.9126 16.5248 11.1957 16.873 11.5439C17.7012 12.3722 18.167 13.4957 18.167 14.667C18.1669 15.8382 17.7013 16.9618 16.873 17.79C16.0448 18.6182 14.9213 19.083 13.75 19.083H5.5C5.08579 19.083 4.75 18.7472 4.75 18.333V3.66699C4.75 3.25278 5.08579 2.91699 5.5 2.91699H12.833ZM6.25 17.583H13.75C14.5235 17.583 15.2655 17.2764 15.8125 16.7295C16.3594 16.1826 16.6669 15.4404 16.667 14.667C16.667 13.8935 16.3594 13.1515 15.8125 12.6045C15.2655 12.0575 14.5235 11.75 13.75 11.75H6.25V17.583ZM6.25 10.25H12.833C13.6064 10.25 14.3486 9.94326 14.8955 9.39648C15.4424 8.84958 15.7499 8.10741 15.75 7.33398C15.75 6.56044 15.4425 5.81847 14.8955 5.27148C14.3485 4.7245 13.6066 4.41699 12.833 4.41699H6.25V10.25Z"\n' +
					'fill="#707A83"/></svg>',
				'italic': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M17.417 2.91699C17.831 2.91719 18.167 3.2529 18.167 3.66699C18.167 4.08108 17.831 4.41679 17.417 4.41699H14.2695L9.33203 17.583H12.833C13.2472 17.583 13.583 17.9188 13.583 18.333C13.583 18.7472 13.2472 19.083 12.833 19.083H4.58301C4.16896 19.0828 3.83301 18.7471 3.83301 18.333C3.83301 17.9189 4.16896 17.5832 4.58301 17.583H7.73047L12.668 4.41699H9.16699C8.75278 4.41699 8.41699 4.08121 8.41699 3.66699C8.41699 3.25278 8.75278 2.91699 9.16699 2.91699H17.417Z" fill="#707A83"/>\n' +
					'</svg>',
				'strike-through': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M17.875 10.25C18.2892 10.25 18.625 10.5858 18.625 11C18.625 11.4142 18.2892 11.75 17.875 11.75H15.3926C16.1188 12.5542 16.5625 13.6179 16.5625 14.7812C16.5625 17.2751 14.5251 19.3124 12.0312 19.3125H9.96875C7.61343 19.3124 5.66563 17.4955 5.45605 15.1934C5.41856 14.781 5.72253 14.4157 6.13477 14.3779C6.54713 14.3404 6.91247 14.6443 6.9502 15.0566C7.09006 16.5946 8.39732 17.8124 9.96875 17.8125H12.0312C13.6966 17.8124 15.0625 16.4467 15.0625 14.7812C15.0625 13.1158 13.6966 11.7501 12.0312 11.75H4.125C3.71079 11.75 3.375 11.4142 3.375 11C3.375 10.5858 3.71079 10.25 4.125 10.25H17.875Z" fill="#707A83"/>\n' +
					'<path d="M12.0312 2.6875C14.3869 2.6875 16.3337 4.50478 16.5439 6.80664C16.5816 7.21903 16.2776 7.58424 15.8652 7.62207C15.4528 7.65973 15.0875 7.35577 15.0498 6.94336C14.9093 5.40491 13.6025 4.1875 12.0312 4.1875H9.96875C8.30328 4.1875 6.9375 5.55328 6.9375 7.21875C6.9375 7.71424 7.05778 8.18093 7.27051 8.59375C7.46023 8.96192 7.3154 9.41472 6.94727 9.60449C6.57909 9.79422 6.12628 9.6494 5.93652 9.28125C5.61713 8.66145 5.4375 7.95939 5.4375 7.21875C5.4375 4.72485 7.47485 2.6875 9.96875 2.6875H12.0312Z" fill="#707A83"/>\n' +
					'</svg>',
				'underline': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M18.334 18.5C18.7479 18.5004 19.084 18.836 19.084 19.25C19.084 19.664 18.7479 19.9996 18.334 20H3.66699C3.25278 20 2.91699 19.6642 2.91699 19.25C2.91699 18.8358 3.25278 18.5 3.66699 18.5H18.334Z" fill="#707A83"/>\n' +
					'<path d="M16.5 2C16.9142 2 17.25 2.33579 17.25 2.75V9.16699C17.2499 10.8245 16.591 12.4139 15.4189 13.5859C14.2469 14.7579 12.6575 15.417 11 15.417C9.34247 15.417 7.75314 14.7579 6.58105 13.5859C5.40903 12.4139 4.75009 10.8245 4.75 9.16699V2.75C4.75 2.33579 5.08579 2 5.5 2C5.91421 2 6.25 2.33579 6.25 2.75V9.16699C6.25009 10.4267 6.75088 11.6347 7.6416 12.5254C8.53238 13.4161 9.7403 13.917 11 13.917C12.2597 13.917 13.4676 13.4161 14.3584 12.5254C15.2491 11.6347 15.7499 10.4267 15.75 9.16699V2.75C15.75 2.33579 16.0858 2 16.5 2Z" fill="#707A83"/>\n' +
					'</svg>',
				'quote': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.7002 3.65039C8.21285 3.65046 8.69041 3.87329 9.03125 4.24512C9.36994 4.61478 9.5498 5.1036 9.5498 5.60059V11C9.5498 12.5956 9.25596 13.9528 8.46484 15.1611C7.68229 16.3563 6.4632 17.3296 4.75977 18.2588C4.39633 18.457 3.94071 18.3231 3.74219 17.96C3.54388 17.5964 3.67753 17.1408 4.04102 16.9424C5.63696 16.0718 6.61759 15.2444 7.20996 14.3398C7.68479 13.6146 7.93975 12.7885 8.01953 11.75H3.2998C2.78726 11.7499 2.31053 11.527 1.96973 11.1553C1.631 10.7857 1.45029 10.2977 1.4502 9.80078V5.60059C1.4502 5.10346 1.63083 4.61482 1.96973 4.24512C2.31052 3.87345 2.7873 3.6505 3.2998 3.65039H7.7002ZM3.2998 5.15039C3.2292 5.1505 3.14672 5.18082 3.0752 5.25879C3.00155 5.33918 2.9502 5.46125 2.9502 5.60059V9.80078C2.95029 9.94001 3.00158 10.0623 3.0752 10.1426C3.14668 10.2204 3.22927 10.2499 3.2998 10.25H8.0498V5.60059C8.0498 5.46127 7.99843 5.33918 7.9248 5.25879C7.85322 5.18075 7.77084 5.15046 7.7002 5.15039H3.2998Z" fill="#707A83"/>\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7002 3.65039C19.2129 3.65046 19.6904 3.87329 20.0312 4.24512C20.3699 4.61478 20.5498 5.10361 20.5498 5.60059V11C20.5498 12.5956 20.256 13.9528 19.4648 15.1611C18.6823 16.3563 17.4632 17.3296 15.7598 18.2588C15.3963 18.457 14.9407 18.3231 14.7422 17.96C14.5439 17.5964 14.6775 17.1408 15.041 16.9424C16.637 16.0718 17.6176 15.2444 18.21 14.3398C18.6848 13.6146 18.9398 12.7885 19.0195 11.75H14.2998C13.7873 11.7499 13.3105 11.527 12.9697 11.1553C12.631 10.7857 12.4503 10.2977 12.4502 9.80078V5.60059C12.4502 5.10346 12.6308 4.61482 12.9697 4.24512C13.3105 3.87345 13.7873 3.6505 14.2998 3.65039H18.7002ZM14.2998 5.15039C14.2292 5.1505 14.1467 5.18082 14.0752 5.25879C14.0016 5.33918 13.9502 5.46125 13.9502 5.60059V9.80078C13.9503 9.94001 14.0016 10.0623 14.0752 10.1426C14.1467 10.2204 14.2293 10.2499 14.2998 10.25H19.0498V5.60059C19.0498 5.46127 18.9984 5.33918 18.9248 5.25879C18.8532 5.18075 18.7708 5.15046 18.7002 5.15039H14.2998Z" fill="#707A83"/>\n' +
					'</svg>',

			}
		})
	}
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
        this.selectedData = selectedData || '';
        this.selectedText = selectedData?.selectedText || '';
        this.init(type);
        this.srcVariables = {
            buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
            chevronBack: SpotFixSVGLoader.getAsDataURI('chevronBack'),
            buttonPaperClip: SpotFixSVGLoader.getAsDataURI('buttonPaperClip'),
            buttonSendMessage: SpotFixSVGLoader.getAsDataURI('buttonSendMessage'),
            logoDoBoardWhite: SpotFixSVGLoader.getAsDataURI('logoDoBoardWhite'),
            logoDoBoardWrap: SpotFixSVGLoader.getAsDataURI('logoDoBoardWrap'),
            iconSpotWidgetWrapPencil: SpotFixSVGLoader.getAsDataURI('iconSpotWidgetWrapPencil'),
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
    async createWidgetElement(type, showOnlyCurrentPage = false) {
        const widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
        widgetContainer.className = 'doboard_task_widget';
        widgetContainer.innerHTML = ksesFilter('');
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
                    buttonCloseScreen: SpotFixSVGLoader.getAsDataURI('buttonCloseScreen'),
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
            case 'wrap_review':
                templateName = 'wrap_review';
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
        spotFixRemoveHighlights();

        switch (type) {
            case 'create_issue':
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

                tinymce.init({
                    selector: '#doboard_task_widget-description',
                    plugins: 'link lists',
                    menubar: false,
                    statusbar: false,
                    toolbar_location: 'bottom',
                    toolbar: 'emoticons bullist numlist bold italic strikethrough underline blockquote',
                    height: 120,
                    icons: 'my_icon_pack',
                    file_picker_types: 'file image media',
                    setup: function (editor) {
                        editor.on('change', function () {
                            editor.save();
                        });
                        // editor.ui.registry.addButton('attachmentButton', {
                        //     icon: 'paperclip',
                        //     tooltip: 'Add file',
                        //         disabled: true,
                        //         onAction: (e) => {
                        //          //  fileUploader?.fileInput?.click(e);
                        //
                        //         },
                        //     });
                        //     editor.ui.registry.addButton('screenshotButton', {
                        //         icon: 'screenshot',
                        //         tooltip: 'Screenshot',
                        //         disabled: true,
                        //         onAction: (e) => {
                        //           // fileUploader?.makeScreenshot();
                        //         },
                        //     });
                         }
                    })
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

        case 'concrete_issue':

                tasksFullDetails = await getTasksFullDetails(this.params, this.allTasksData, this.currentActiveTaskId);
                const taskDetails = await getTaskFullDetails(tasksFullDetails, this.currentActiveTaskId);

                // Update issue title in the interface
                const issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                if (issueTitleElement) {
                    issueTitleElement.innerText = ksesFilter(taskDetails.issueTitle);
                }

                templateVariables.issueTitle = taskDetails?.issueTitle;
                templateVariables.issueComments = taskDetails?.issueComments;

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

                    const fileUploader = this.fileUploader;

                    tinymce.init({
                        selector: '.doboard_task_widget-send_message_input',
                        plugins: 'link lists',
                        menubar: false,
                        statusbar: false,
                        toolbar_location: 'bottom',
                        toolbar: 'attachmentButton screenshotButton emoticons bullist numlist bold italic strikethrough underline blockquote',
                        height: 120,
                        icons: 'my_icon_pack',
                        file_picker_types: 'file image media',
                        setup: function (editor) {
                            editor.on('change', function () {
                                editor.save();
                            });
                            editor.ui.registry.addButton('attachmentButton', {
                                icon: 'paperclip',
                                tooltip: 'Add file',
                                    disabled: true,
                                    onAction: (e) => {
                                       fileUploader?.fileInput?.click(e);

                                    },
                                });
                                editor.ui.registry.addButton('screenshotButton', {
                                    icon: 'screenshot',
                                    tooltip: 'Screenshot',
                                    disabled: true,
                                    onAction: (e) => {
                                       fileUploader?.makeScreenshot();
                                    },
                                });
                            }
                        });
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

var spotFixShowDelayTimeout = null;
const SPOTFIX_DEBUG = false;
const SPOTFIX_SHOW_DELAY = 1000;

if( document.readyState !== 'loading' ) {
    document.addEventListener('spotFixLoaded', spotFixInit);
} else {
    document.addEventListener('DOMContentLoaded', spotFixInit);
}

function spotFixInit() {
    new SpotFixSourcesLoader();
    new CleanTalkWidgetDoboard({}, 'wrap');
    loadTinyMCE();
}

/**
 * Downloads TinyMCE script from doboard.com
 */
function loadTinyMCE() {
    const script = document.createElement('script');
    script.src = 'https://doboard.com/tinymce/tinymce.min.js';
    script.async = true;

    script.onload = function() {
       addIconPack();
    };

    document.head.appendChild(script);
}

document.addEventListener('selectionchange', function(e) {
    // Do not run widget for non-document events (i.e. inputs focused)

    if (e.target !== document) {
        return;
    }

    const isWrapReviewWidgetExists = !!(document.getElementsByClassName('wrap_review')[0]);
    const sel = document.getSelection();

    if ((!sel || sel.toString() === "") && isWrapReviewWidgetExists) {
        new CleanTalkWidgetDoboard({}, 'wrap')
        return;
    }

    if (spotFixShowDelayTimeout) {
        clearTimeout(spotFixShowDelayTimeout);
    }

    spotFixShowDelayTimeout = setTimeout(() => {
        const selection = window.getSelection();
        if (
            selection.type === 'Range'
        ) {
            // Check if selection is inside the widget
            let anchorNode = selection.anchorNode;
            let focusNode = selection.focusNode;
            if (spotFixIsInsideWidget(anchorNode) || spotFixIsInsideWidget(focusNode)) {
                return;
            }
            const selectedData = spotFixGetSelectedData(selection);

             if ( selectedData ) {
                // spotFixOpenWidget(selectedData, 'create_issue');
                spotFixOpenWidget(selectedData, 'wrap_review');
            }
        }
    }, SPOTFIX_SHOW_DELAY);
});


/**
 * Shows the spot fix widget.
 */
function spotFixShowWidget() {
    new CleanTalkWidgetDoboard(null, 'create_issue');
}

/**
 * Check if a node is inside the task widget.
 * @param {*} node
 * @returns {boolean}
 */
function spotFixIsInsideWidget(node) {
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
 * @param {*} type
 */
function spotFixOpenWidget(selectedData, type) {
    if (selectedData) {
        new CleanTalkWidgetDoboard(selectedData, type);
    }
}

/**
 * Write message into the console.
 *
 * @param {string} message
 */
function spotFixDebugLog(message) {
    if ( SPOTFIX_DEBUG ) {
        console.log(message);
    }
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
    let taskAuthorInitials =
        authorDetails.taskAuthorName && authorDetails.taskAuthorName != 'Anonymous'
            ? authorDetails.taskAuthorName.trim().charAt(0).toUpperCase()
            : null;
    let initialsClass = 'doboard_task_widget-avatar-initials';
    if (authorDetails.taskAuthorAvatarImgSrc === null && taskAuthorInitials !== null) {
        avatarStyle = 'display: flex;background-color: #f8de7e;justify-content: center;align-items: center;';
        avatarCSSClass = 'doboard_task_widget-avatar_container';
    }
    if (authorDetails.taskAuthorAvatarImgSrc === null && taskAuthorInitials === null) {
        avatarStyle = `background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMtOGVlZi00ZDUxLWJhNDEtZDk5M2U2ZjYzZjEyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMtOGVlZi00ZDUxLWJhNDEtZDk5M2U2ZjYzZjEyIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHN0RXZ0OndoZW49IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChNYWNpbnRvc2gpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuPRTtsAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAL0UExURUdwTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKGw/wAAAAAAAAAAAAAAAAAAAAAAAAAAAKOy/6Sw/gAAAAAAAAAAAAAAAIKPz6Kw/6Cw/6Kx/6Gw/6Gw/6Gw/6Gv/qCw/6Gw/6i0/6Oy/67D/6Gw/6Gx/6ez/6u9/6Gw/6Kx/6i5/624/6Cy/wAAAJ6r/6Oy/6W1/qCv/4aR1LPE/4eU0o+d3qGw/6Sy/6Ku/6Cv/KGw/6Cu/4WT1KKr/5up9Q8RGhodK7jI/4mY1K27/6Cv/8PW/7LE/6Gw/7nL/1RchUVLbbnN/0pXfBQVHjY5U2Vwm2ZwnyMmNrDB/6e2/629/7XG/6Kw/6Kw/67A/629/3N+vKe3/77Q/52r7HmEtrPE/6Oz8RgaKbTF/7TG/xgaKnaCtsLV/6Sv/7TI/wCv/6Gw/wAAAKCv/6e2/73O/6a1/6Oz/6u7/7zN/6q5/7fJ/629/7PD/wAAAQwNE5+u/7DA/6S0/7bH/7XG/6Gx/6i4/yUoOQQFBwICA7HC/7nL/zM4UouY3RcaJK+//y4ySL7Q/ygsPx8iME9WfTA1TXJ8sp2s9VxkjoSQ0RESGl9ok5up9XR/t213rRQWHkRKbJKf53mEwUxSeKGv+qy8/5Ce4jk+WQkKDjxBYCouQpSh6lZfiEFHZVpijJ6t/GFqmWdxoT5DY4eU1mp0qXiDvHyHxZak5n2KxlFZg8LU/32Kv4mV2ZSj7FBYgJGe50VLbS7TJ5EAAACrdFJOUwAPCsvhFe/y+w0C/fc8LUGd9SWvHnW1BPOTw/7NCbtcyNpxsr+4WVKbIETkCOiij0d96tQGEhCmijeFGGxw0Gp6qZhKxmbeYCtNG9NMgKzX5iduYwXl2GVVAZNEVKrs9opx5j/ZFcMIER77LlsYnDAbbDlLDH3+/v2wIlDxy8E95PP9un2PvJ1Pv2VX9kmOqeG89a2m+efFg2aYq9fPqexM0cHR6vWeMdh9ztTtu0oAAA1/SURBVHja7FxnWBPZGs5SQoAAocMiJEjv0qQEpMhCgAVRUFFEaYq9d7f3vb333u99ZpIAafTQ24Jg13XtfV3b7t1d7/65cyaTBiFMkknbZ94f6DOZnG/eOd/56jmhUEiQIEGCBAkSJEiQIEGCBAkSJEiQIEGCBAkS1o6cUAeH0FVWT8OeBaNg2Vs3D6dlMIZlTlZNJAtwoNHB3xyrJmKLMAgqYYch/9haM49YBximp1AoKcicOMRaOxFfCsXX2omgqhVWUmL1qoUtdpr1L3YV87vOyh1igYxHgZU7RATZiGLRvL8NwRZiuRy+DTwcARFHckYsB6l+MOyXasUEUjwichM8C1bEBcBwQMWKAs+E3AiPQGsLTVwSy1fDcxGQ5FPmYjWhSmA4IwnWgjhGuI0V0HDxj1N/bhrdz49OV79GzXexcBrMF1XefFCCd7ULpyTV0TG1hONS7Z0QqjJTLzItmEZRsvwxVzOyXDWshVjXLEaF/J7kIgulESEPEO0S3FK0WLPoBDvsxkURFkhjTxj2dOURvgvd6xvhid0ctsfSeCRi9jXSFd/9rvkBsm+UWdZ0YGs80mO+O6qaDx5srlK9spKBrXpXC1rkaAoIh2Ro+GxXTX1d7ZbSho2vvLKxoXRLbV19zWY5fR+ZfbaYRe+PPk9M9VwSO9eXboLmYFPp+l9vQ2+ojkG/6m8RNGxkqzxvdgq4rf49DSTk2P5ePeCSmod+OcgCXD0b9R0BL826vKF2uxTSju3HPgBq6Yz6lBJz8/BCfUKhuhVdV1m6EAsUnaXfQRZ9MOp7oszLIwpV8lD1dKOyCcILbhNCBdXNCi+z1kjQWD1P7dqBV6UQfnC5/9lPyUeNhRnrLIGoVkSqXtpbK9WFB9Av4fsUbzDOCvMlKqFzeGzYCOkMLvSvf+aitsus/kNVr9bt5kKQPkz47/yDZj5/wkQDDJULx1/ViwdYKIK//BXEXmbJUaKAA4hR8WSNGyG90Tn8xzeBOzKHEUazj5Uqy0MKGYBOwWEwJcvMFLerhHuVkIH46FMwYq7JFQvNoQjkweUJRsCYplYukIBQlQtkA2QwOiWnboIowbQ8XgYvT5lxv94NEcDko8dg1OUmJVKo9u72bpISQITLE02CANSkKSF4dcq0tknKhYiYEtFXsImdiZ1aaLKbEBoIpPxbIKI3HY9q4LvYioVOFA+I2/u/dmToapMRWaQ6IVs3QYRByv8M1O1MxSNDzd4fI44HMiWjYGxTVe0iEVk+igirm0AiUGvPBDJ4vml4pDggstASlq9XdM4bbUQS4Q7PAE+bYppiNSJqTaDr2kyfGBp8Y4jQGYGE0rPI8MUmIVIOeh9YY639soRLKBGp4Js5VQCjqJVbYohq6+kzvpRQHhBX9AlafU10M2LNbmV2vHpbjVZ4hOAJQXSL24FMNOJOqHnZK41AwtctfYUqB3pheSaz5E8ionlArb03ZETQwkr6El9CabglxKhNRcjL9uim0T9AhBPhCkCC1aEQFZPgRphGJarMRTCDivzFwpNdnYTzgKChM4iAt34arJS5ItGDABrL8xQD+vnkZjiBfZZJ2B7eesgIED5ApuPmCYqrt4+7YqOBp6FZCpMlHyspMnwpuFKsUknbYgwivLbbiIjXwPhLwyMVDW2WIdF9uLxP6x4fLq9n5ioLabuMwQNqFX2MiPgCa2vFRsTL5yU5XE8a0fLmf0GOvXp5cbHsvzuNQgTi30dEfLNTWSnPKZBvMtBn3b+A9SrhNPVvhygTht3GISICqfvIb9SsZhr2MIwXdOWxBGvqMzizPgBvB9tIUmocIhLg2/t/ry6Wg71XuyW68cjFZmNOZrBuDXJZRm7zUeMQ6XqEiBg7unmWZA5mPnUq4aGdF9g2WoOHr0AiE9mSqTEOD0h8ZxCGzz5onLtobeE5fQztiEe/kKnpIyc7Ral5n9QoPDpFj5AAZYy7T4P0TPTB4nXqe1DnUcYg5LMEVMnqjEGEyx3/L8jbp4fqNC5dqg59+XC0Tztf5Jmj2Of+207iaUjH+eIvgISHw7UaxXsU4i59LQW9o9XseTMS1NeyXvKlvC0mmAXE6xl+dv8tMP4lYd+H8/T1wX4v2lIcRICdc9aSCbhhdjDzd72CcQLz3JYhft+X9wZkox8WdZbOF8OCBhNjYR5sMI7W03YR8g2K/aevdwm6eESE8i3j/K4jd6ewgTu+FHChhqp55K+ClfG3FoBO8ZoF4nq5n4UHJ06PXuP3ClsN4MJt7Rvii6+fvo0lU/DAvWfDyMtpmvecBojwFz41ALYhZC+YopQVyrm09598ckrCl7S16EWCJx4WdR++OzkoH2/s7rPhISTPkVbOK32xal1Na8MAx1YwJ2Y5TZGodNy4//l5sUAkFrbgN8lSnnBIIOq7/PDjMcVAgzdmugVdUi5ihX81v2xXXM0HPyQfx3e2wGtxgUr22zHxfOb6VbFgWCIW8lq1B+o8oVgiGG47debTb6YGlENMnr7eK+pDtIrb8O4OLYId6XiODeAnAlTMO5TWrnySwUvTVx4+vXy1TyIQiCRd4jZhH4/Ha2np7m5B/u0TCsVdkh6BQCK8evnJuSu3O1Tew2D/3VGxYBxdbFsqm7VKxUcEp2opUJLzwzcH1SoTA2cnb508/fjJmTunHiAvv+2aeHwc4cRr5Z668+jpxXMnb01eGlD7xs2Rc0euCbpagC9pqtuxkEh8qoVrsavj4Hd/8KNLg3M3wQ90XJrqn5yYmB4ZmZ643T811jGg4ab+KxfODwnGeUDpGtbXrKMseKoM32IH5jdYNyJOFErV/nd+/L3+DlgntJ8deT7zdZugpw31q6V1jVW45OEzvws7xPmweWfdaz+5MjLV0b4wh5tTt54/Hr06zu+5xgOGrmH3vuN45aAOEcfmLjRE4eiZ52/9/qFjb4xeOHfy3nQ/oknq+tY+0DHWP33v5LkLX53nSfiicWGLbM/pvh3N+EVwcIYosqAxzoDNklXbPjj0/i9/8XPo/NejZz7/5MLMxYsXZy48eXpm9M55qEXcyx/u7WrrQ7Rpe8OH6+trtoKUQAfjEoc3aJSF8XaGFpCb9zZWHnr3Z2//+W9/7+3p6e2VSIaA7eprObppY9OW2vX/rmzc26z7sCvRWgLOwpDWxEp3RluP79jfWHPgxIYTBw7U7N9xfGuz/oMtRxOrBAJSXfNCx1RXUXxYYlk0sOKDTq1SrByUZ0HHO/QqB6kU6CzkUIQrVqArjCaqZGoWKEum+hz6dZMXsVlZZj2Mbp/FMqSIPautwDTTwYjYiHi6oW0FzY0eU2Ipk0FMo0fWeguQj+Xuk5uRYioSKXtUW2/lRGwQ9EhMVgZ+MYzsDKNvxg/k5DBUziwHl3kQZjXU2tNJIWXF9r5GIsEuLgtRPbNsl0Cs1ZyzYcDOM5PJIdQC2HCYZWlr1I4nE75hAIs8s+Pj1I9BU1nxmVnRXgYunBS2y9rMeBZVbWh6knG2cMjhqSHdo8WxPP0T1y7fw7bR4Ue0nGzYe5avTfT3ZM16OzJ4GtkggteWXuTPcteUwNKphbZhaf5l3llF4cVuGa4eHlElbHtwDNyeXRLl4eGa4VYcXpTlXeafFmZbSNX0/LAfy78oHUy2cY096OnGoBGMy6rMEDua9sw8wNmZRqO7Ozi4u9NoNOcA7XfTKoLSs1zQti0wLSHG5JGhvpMcbAXMTLOl0mCD4Ey1TcvMUV1qYJMenGFEIos0bma1YWdELE5PC1oW567L87vHLQtKS88Nd4uywSmIMCz0omJTOS7FzKzE9Pz4cp9Q2+TgQruKJCr4ORFqUoVdYXCybahPeXx+emIWs9iFkxqLe+qJhs6q6+SbEsgGP/DCDkzxddJrMRoDoFQJ636AU6+f3PGCcZUT9fO87nqdsNPzR5BAKYdunN9OQoe2MRURR3djHUxEJ3sxxVREKNn/b+dsdhIGojBqoZRCY4QIgokSLUyCJSSQEONGFiILExZKoj4GT8Y7ynRouVBiMr93c09YsOrH7XSmZ4Z2rLxx1SnV+opv1ynvr8Wnp/1ayZw1PsXDsh9UFRtEvZB0bKkGfnkYm2iYj14EbJctXBWyYMCGI6b7tPxzwXavPReFGMg9XonJnr4FZ+exYr+QCnjqN1DMLSjPdjtob7hYh1Ox38ad/UJELptyG33ZtAcquZBluirGn2D0xaB+ma7ZLW0Xkufe7l+CU8mFlDO36uzuTmH6Y26kt1dVKCTPrUVim12VXLgqw3++6GOT8eck/eLtWrt7b7cQmDsaq+bCA3bzA17M9rMeJ4UYyT1t4pN/5p1dWtq5hU73Dva9E53u10ln1809O/xetTyvleyHQckToz786uWevzGFzWa2wvAjeWOq80Lq7nOP8YqqIGsbMz7VnbnPPWXFwGJPyFaSq6xxY84XH+aN+Mtl7nmNf+UaH/gPb7I6vWDwnMqas3ruvxMr+QmOCYNVyTVN3mGj9KNvsFiIIbS3TnYeHiTrnq7BYnEwZ75LuQGDxSI3WP76e6BvsFhAg/0eJQbED6sQ4waLeWkZNVjUzm7UYHGHX4MGi35DNGawWFgwWCwsGCwWVgyWIAiCIAiCIAiCIAiCIAiCIAgU/gAyRDCHjvicJQAAAABJRU5ErkJggg==');`;
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
 * Sanitize HTML
 * @param {*} html
 * @param {*} options
 * @returns
 */
function ksesFilter(html, options = false) {
    let allowedTags = {
        a: true,
        b: true,
        i: true,
        strong: true,
        em: true,
        ul: true,
        ol: true,
        li: true,
        p: true,
        s: true,
        br: true,
        span: true,
        blockquote: true,
        pre: true,
        div: true,
        img: true,
        input: true,
        label: true,
        textarea: true,
        button: true,
        blockquote: true,
        pre: true,
        details: true,
        summary: true,
    };
    let allowedAttrs = {
        a: ['href', 'title', 'target', 'rel', 'style', 'class'],
        span: ['style', 'class', 'id'],
        p: ['style', 'class'],
        div: ['style', 'class', 'id', 'data-node-path', 'data-task-id'],
        img: ['src', 'alt', 'title', 'class', 'style', 'width', 'height'],
        input: ['type', 'class', 'style', 'id', 'multiple', 'accept', 'value'],
        label: ['for', 'class', 'style'],
        textarea: ['class', 'id', 'style', 'rows', 'cols', 'readonly', 'required', 'name'],
        button: ['type', 'class', 'style', 'id'],
        details: ['class', 'style', 'open'],
        summary: ['class', 'style'],
    };

    if (options && options.template === 'list_issues') {
        allowedTags = { ...allowedTags, br: false };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    function clean(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            if (options) {
                if (allowedTags[tag]) {
                    // Special handling for images in 'concrete_issue_day_content' template (wrap img in link always)
                    if (tag === 'img' && options.template === 'concrete_issue_day_content' && options.imgFilter) {
                        const src = node.getAttribute('src') || '';
                        const alt = node.getAttribute('alt') || '[image]';
                        const link = doc.createElement('a');
                        link.href = src;
                        link.target = '_blank';
                        link.className = 'doboard_task_widget-img-link';
                        const img = doc.createElement('img');
                        img.src = src;
                        img.alt = alt;
                        img.className = 'doboard_task_widget-comment_body-img-strict';
                        link.appendChild(img);
                        node.parentNode.insertBefore(link, node);
                        node.remove();
                        return;
                    }
                }

                if (!allowedTags[tag]) {
                    // Special handling for images in 'list_issues' template
                    if (tag === 'img' && options.template === 'list_issues' && options.imgFilter) {
                        const src = node.getAttribute('src') || '';
                        const alt = node.getAttribute('alt') || '[image]';
                        const link = doc.createElement('a');
                        link.href = src;
                        link.target = '_blank';
                        link.textContent = alt;
                        node.parentNode.insertBefore(link, node);
                    }
                    node.remove();
                    return;
                }
            }

            // Remove disallowed attributes
            [...node.attributes].forEach(attr => {
                const attrName = attr.name.toLowerCase();
                if (!allowedAttrs[tag]?.includes(attrName) ||
                    attrName.startsWith('on') || // Remove event handlers
                    attr.value.toLowerCase().includes('javascript:')) {
                    node.removeAttribute(attr.name);
                }
            });
        }
        // Recursively clean children
        [...node.childNodes].forEach(clean);
    }
    [...doc.body.childNodes].forEach(clean);
    return doc.body.innerHTML;
}

/**
 * SELECTION will be grouped into three types:
 * 1 - Simple text within a single tag
 * 2 - Image tags
 * 3 - Any tag containing nested content
 * Each type will be processed differently.
 */
const SPOTFIX_SELECTION_TYPE_TEXT = 'text';
const SPOTFIX_SELECTION_TYPE_IMG = 'image';
const SPOTFIX_SELECTION_TYPE_ELEMENT = 'element';

/**
 * Determines the type of selection
 * @param {Selection} selection - The DOM Selection object
 * @returns {string|null} Selection type
 */
function spotFixGetSelectionType(selection) {
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // Case 1: Image selection
    if (spotFixGetSelectedImage(selection)) {
        return SPOTFIX_SELECTION_TYPE_IMG;
    }

    // Case 2: Element with nested content
    if (commonAncestor.nodeType === Node.ELEMENT_NODE &&
        commonAncestor.childNodes.length > 1 &&
        range.toString().trim() === '' &&
        range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.ELEMENT_NODE) {
        return SPOTFIX_SELECTION_TYPE_ELEMENT;
    }

    // Case 3: Simple text
    const hasTextContent = range.toString().trim().length > 0;
    const isTextNode = commonAncestor.nodeType === Node.TEXT_NODE;
    const isCollapsed = range.collapsed;

    if (hasTextContent && (isTextNode || !isCollapsed)) {
        return SPOTFIX_SELECTION_TYPE_TEXT;
    }

    return null;
}

/**
 * Extracts selection data from DOM Selection object
 * @param {Selection} selection - The DOM Selection object
 * @returns {Object|null} Selection data with text, positions, URL and node path OR null (nothing)
 */
function spotFixGetSelectedData(selection) {
    // Prechecks:
    // Selection not provided
    if (!selection) {spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection not provided`'); return null;  }
    // Range not provided
    if (selection.rangeCount === 0) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Range not provided`'); return null; }
    // Several ranges provided
    if (selection.rangeCount > 1) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Several ranges provided`'); return null; }

    const range = selection.getRangeAt(0);
    // Selection must be within a single DOM element.
    if (range.startContainer !== range.endContainer) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection within several tags nodes`'); return null; }

    // FIRST - check selection type
    const selectionType = spotFixGetSelectionType(selection);

    // Selection type not determined
    if (!selectionType) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection type not determined`'); return null; }

    // SECOND - generate selectedData for each selectionType
    let selectedText = '';
    let startSelectPosition = 0;
    let endSelectPosition = 0;
    let nodePath = '';
    let imageUrl = '';

    const commonNode = range.commonAncestorContainer;

    switch (selectionType) {
        case SPOTFIX_SELECTION_TYPE_TEXT:
            if (range.toString().trim().length === 0) {
                spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection text is empty`');
                return null;
            }
            const commonNodeElement = commonNode.nodeType === Node.ELEMENT_NODE ? commonNode : commonNode.parentElement;
            selectedText = range.toString();
            startSelectPosition = range.startOffset;
            endSelectPosition = range.endOffset;
            if ( startSelectPosition === 0 && selectedText.length > endSelectPosition ) {
                endSelectPosition = selectedText.length;
            }
            nodePath = spotFixCalculateNodePath(commonNodeElement);
            break;

        case SPOTFIX_SELECTION_TYPE_IMG:
            const imgElement = range.startContainer;
            const selectedImage = spotFixGetSelectedImage(selection);
            selectedText = `Image (${selectedImage.alt ? selectedImage.alt : 'no description'})`;
            nodePath = spotFixCalculateNodePath(selectedImage);
            // For images, positions represent the image element position in parent
            startSelectPosition = Array.from(imgElement.parentNode.children).indexOf(imgElement);
            endSelectPosition = startSelectPosition + 1;
            break;

        case SPOTFIX_SELECTION_TYPE_ELEMENT:
            const element = commonNode.nodeType === Node.ELEMENT_NODE ? commonNode : commonNode.parentElement;
            if (element.childNodes.length <= 1) {
                spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection have not inner data`');
                return null;
            }
            selectedText = element.textContent || '';
            nodePath = spotFixCalculateNodePath(element);
            // For elements, positions represent the element's position in parent
            startSelectPosition = Array.from(element.parentNode.children).indexOf(element);
            endSelectPosition = startSelectPosition + 1;
            break;
    }

    // Get page URL
    const pageURL = window.location.href;

    return {
        startSelectPosition,
        endSelectPosition,
        selectedText: selectedText.trim(),
        pageURL,
        nodePath,
        selectionType,
        imageUrl: selectionType === SPOTFIX_SELECTION_TYPE_IMG ? imageUrl : ''
    };
}

/**
 * Highlight elements.
 * @param {[object]} spotsToBeHighlighted
 * @param widgetInstance
 */
function spotFixHighlightElements(spotsToBeHighlighted, widgetInstance) {

    if (spotsToBeHighlighted.length === 0) return;

    const elementsMap = new Map();

    // Grouping elements with validation
    spotsToBeHighlighted.forEach(spot => {
        // nodePath validating: is array
        if (!spot?.nodePath || !Array.isArray(spot?.nodePath)) {
            spotFixDebugLog('Invalid spot: missing or invalid nodePath: ' + spot);
            return;
        }

        // nodePath validating: is valid indexes list
        if (!this.spotFixIsValidNodePath(spot.nodePath)) {
            spotFixDebugLog('Invalid nodePath format: ' + spot.nodePath);
            return;
        }

        const element = spotFixRetrieveNodeFromPath(spot.nodePath);
        if (!element) {
            spotFixDebugLog('Element not found for path: ' + spot.nodePath);
            return;
        }

        if ( ! spot.selectionType ) {
            // @ToDo need to apply backward capability here
            // just `spot.selectionType = 'text';` is not able, this opens ability to unauthorized modify website content
            spotFixDebugLog('Selection type is not provided.');
            return;
        }

        // selectionType parameter validating
        if (
            spot.selectionType &&
            ![
                SPOTFIX_SELECTION_TYPE_TEXT,
                SPOTFIX_SELECTION_TYPE_IMG,
                SPOTFIX_SELECTION_TYPE_ELEMENT
            ].includes(spot.selectionType)
        ) {
            spotFixDebugLog('Invalid selection type: ' + spot.selectionType);
            return;
        }

        if (!elementsMap.has(element)) {
            elementsMap.set(element, []);
        }
        elementsMap.get(element).push(spot);
    });

    elementsMap.forEach((spots, element) => {
        const selectionType = spots[0].selectionType;

        // MAIN LOGIC: highlight for the different types
        switch (selectionType) {
            case 'image':
                this.spotFixHighlightImageElement(element);
                break;

            case 'element':
                this.spotFixHighlightNestedElement(element);
                break;

            case 'text':
                this.spotFixHighlightTextInElement(element, spots, widgetInstance);
                break;

            default:
                spotFixDebugLog('Unknown selection type: ' + selectionType);
        }
    });
}

/**
 * Highlight image element by adding class
 * @param {Element} element
 */
function spotFixHighlightImageElement(element) {
    if (element.tagName !== 'IMG') {
        spotFixDebugLog('Expected IMG element for image highlight, got: ' + element.tagName);
        return;
    }
    element.classList.add('doboard_task_widget-image_selection');
}

/**
 * Highlight nested element by adding class
 * @param {Element} element
 */
function spotFixHighlightNestedElement(element) {
    element.classList.add('doboard_task_widget-element_selection');
}

/**
 * Highlight text in element with span wrapping
 * @param {Element} element
 * @param {Array} spots
 * @param widgetInstance
 */
function spotFixHighlightTextInElement(element, spots,widgetInstance) {
    let tooltipTitleText = '';
    if (spots[0].isFixed) {
        tooltipTitleText = `This issue already fixed.`;
    } else {
        tooltipTitleText = `We are already working on this issue.`;
    }

    const tooltip = `<div class="doboard_task_widget-text_selection_tooltip_element">
                            <span class="doboard_task_widget-text_selection_tooltip_icon"></span>
                            <span>
                                <div>${tooltipTitleText}</div>
                                <div>You can see history <span class="doboard_task_widget-see-task doboard_task_widget-see-task__task-id-${spots[0].taskId}">Here</span></div>
                            </span>
                        </div>`;

    const spotfixHighlightOpen = `<span class="doboard_task_widget-text_selection"><span class="doboard_task_widget-text_selection_tooltip">${tooltip}</span>`;
    const spotfixHighlightClose = `</span>`;

    let text = element.textContent;
    const spotSelectedText = spots[0].selectedText;

    // meta.selectedText can not be empty string
    if ( ! spotSelectedText ) {
        spotFixDebugLog('Provided metadata is invalid.');
        return;
    }

    const markers = [];

    // Mark positions for inserting
    spots.forEach(spot => {
        // Validating positions
        const startPos = parseInt(spot.startSelectPosition) || 0;
        const endPos = parseInt(spot.endSelectPosition) || 0;

        if (startPos < 0 || endPos > text.length || startPos > endPos) {
            spotFixDebugLog('Invalid text positions: ' + spot);
            return;
        }

        markers.push({ position: startPos, type: 'start' });
        markers.push({ position: endPos, type: 'end' });
    });

    if (markers.length === 0) return;

    // Sort markers backward
    markers.sort((a, b) => b.position - a.position);

    // Check here that element (from meta.nodePath) contains same inner text as in meta.selectedText
    // Is the `text` in the element equal to the selected text `spotSelectedText`
    if ( text.slice(markers[1].position, markers[0].position) !== spotSelectedText ) {
        spotFixDebugLog('It is not allow to highlight element by provided metadata.');
        return;
    }

    let result = text;
    markers.forEach(marker => {
        const insertText = marker.type === 'start'
            ? spotfixHighlightOpen
            : spotfixHighlightClose;

        result = result.slice(0, marker.position) + insertText + result.slice(marker.position);
    });

    // Safety HTML insert
    try {
        element.innerHTML = ksesFilter(result);
        document.querySelectorAll('.doboard_task_widget-see-task').forEach(link => {
            link.addEventListener('click', (e) => {

                e.preventDefault();
                const classList = link.className.split(' ');
                const idClass = classList.find(cls => cls.includes('__task-id-'));
                let taskId = null;
                if (idClass) {
                    taskId = idClass.split('__task-id-')[1];
                }
                if (taskId) {
                    widgetInstance.currentActiveTaskId = taskId;
                    widgetInstance.showOneTask();
                }
            });
        });
    } catch (error) {
        spotFixDebugLog('Error updating element content: ' + error);
    }
}

/**
 * Scroll to an element by tag, class, and text content
 * @param {array} path - The path to the element
 * @return {boolean} - True if the element was found and scrolled to, false otherwise
 */
function spotFixScrollToNodePath(path) {
    const node = spotFixRetrieveNodeFromPath(path);
    if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
    }
    return false;
}

function spotFixRemoveHighlights() {
    const textSelectionclassName = 'doboard_task_widget-text_selection';
    const spans = document.querySelectorAll('.' + textSelectionclassName);
    const affectedParents = new Set(); // Track unique parents

    spans.forEach(span => {
        const parent = span.parentNode;
        affectedParents.add(parent); // Mark parent as affected
        const tooltip = span.querySelector('.doboard_task_widget-text_selection_tooltip');
        if (tooltip) tooltip.remove();

        // Move all child nodes out of the span and into the parent
        while (span.firstChild) {
            parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
    });

    // Normalize all affected parents to merge adjacent text nodes
    affectedParents.forEach(parent => parent.normalize());

    const elementSelectionClassName = 'doboard_task_widget-element_selection';
    const elements = document.querySelectorAll(`.${elementSelectionClassName}`);
    elements.forEach(element => {
        element.classList.remove(elementSelectionClassName);
    });
    const imageSelectionClassName = 'doboard_task_widget-image_selection';
    const images = document.querySelectorAll(`.${imageSelectionClassName}`);
    images.forEach(element => {
        element.classList.remove(imageSelectionClassName);
    });
}

/**
 * Validate nodePath as array of indices
 * @param {Array} nodePath
 * @returns {boolean}
 */
function spotFixIsValidNodePath(nodePath) {
    if (!Array.isArray(nodePath)) return false;
    if (nodePath.length === 0) return false;

    return nodePath.every(index => {
        return Number.isInteger(index) && index >= 0 && index < 1000;
    });
}

/**
 * Try to find selected image in selection.
 * @param selection
 * @returns {Node|*|null}
 */
function spotFixGetSelectedImage(selection) {

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
                spotFixIsElementInRange(node, range) ?
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
    const startElement = spotFixGetElementFromNode(range.startContainer);
    const endElement = spotFixGetElementFromNode(range.endContainer);

    // If selection starts on image
    if (startElement && startElement.tagName === 'IMG' &&
        spotFixIsElementPartiallySelected(startElement, range)) {
        return startElement;
    }

    if (endElement && endElement.tagName === 'IMG' &&
        spotFixIsElementPartiallySelected(endElement, range)) {
        return endElement;
    }

    // 4. Get closest IMG
    const nearbyElements = spotFixFindNearbyElements(range);
    for (const element of nearbyElements) {
        if (element.tagName === 'IMG') {
            return element;
        }
    }

    return null;
}

function spotFixIsElementInRange(element, range) {
    const elementRange = document.createRange();
    elementRange.selectNode(element);
    return range.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
}

function spotFixIsElementPartiallySelected(element, range) {
    const elementRect = element.getBoundingClientRect();
    const rangeRect = range.getBoundingClientRect();

    //  bounding rectangles is crossed
    return !(elementRect.right < rangeRect.left ||
        elementRect.left > rangeRect.right ||
        elementRect.bottom < rangeRect.top ||
        elementRect.top > rangeRect.bottom);
}

function spotFixGetElementFromNode(node) {
    return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
}

/**
 * Find nearby elements in the range.
 * @param range
 * @returns {*[]}
 */
function spotFixFindNearbyElements(range) {
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
            if (spotFixIsElementPartiallySelected(children[i], range)) {
                elements.push(children[i]);
            }
        }
    }

    return elements;
}

/**
 * Calculate the path of a DOM node
 *
 * @param {Node} node
 * @return {int[]}
 */
function spotFixCalculateNodePath(node) {
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
function spotFixRetrieveNodeFromPath(path) {
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

let spotFixCSS = `.doboard_task_widget-send_message_paperclip .doboard_task_widget-paperclip-tooltip::after{content:"";position:absolute;left:8%;top:100%;transform:translateX(-50%);pointer-events:none;background:0 0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #545b61;display:block}.doboard_task_widget-send_message_paperclip{position:relative}.doboard_task_widget-send_message_paperclip .doboard_task_widget-paperclip-tooltip{display:none;position:absolute;left:0;bottom:0;transform:translateX(-3%) translateY(-43px);background:#545b61;color:#FFF;border:none;border-radius:3px;padding:10px 16px;font-size:13px;line-height:1.4;z-index:100;min-width:220px;max-width:320px;text-align:left;pointer-events:none;text-transform:none}.doboard_task_widget-send_message_paperclip:hover .doboard_task_widget-paperclip-tooltip{display:block}.doboard_task_widget *{font-family:Inter,sans-serif;font-weight:400;font-size:14px;line-height:130%;color:#40484F}.doboard_task_widget-header *{color:#FFF;margin:0}.doboard_task_widget a{text-decoration:underline;color:#2F68B7}.doboard_task_widget a:hover{text-decoration:none}.doboard_task_widget{position:fixed;right:50px;bottom:20px;z-index:9999;vertical-align:middle;transition:top .1s;transform:translateZ(0);-webkit-transform:translateZ(0);will-change:transform}.doboard_task_widget_cursor-pointer{cursor:pointer}.doboard_task_widget-container{width:360px;max-height:calc(100vh - 40px);display:flex;flex-direction:column;-moz-flex-direction:column}@media (max-height:800px){.doboard_task_widget-container{max-height:calc(60vh - 40px)}}.doboard_task_widget-header{display:flex;height:41px;min-height:41px;padding:8px 16px;background:#1C7857;border-radius:8px 8px 0 0;justify-content:space-between;align-items:center;color:#FFF}.doboard_task_widget-content{flex:1;overflow-y:auto;background:#FFF;border-radius:0 0 8px 8px;border:1px #BBC7D1;border-style:none solid solid;box-shadow:0 4px 15px 8px #CACACA40;scrollbar-width:none;max-height:60vh}.doboard_task_widget-element-container{margin-bottom:30px}.doboard_task_widget-wrap{border:none;box-shadow:none;position:relative;padding:0;cursor:pointer;width:56px;height:56px;border-radius:50%;background-color:#1c7857;opacity:.6;display:flex;align-items:center;justify-content:center}.doboard_task_widget-wrap img{width:24px;height:24px}.doboard_task_widget-wrap::after{content:"";position:absolute;left:-2px;bottom:-6px;width:0;height:0;border-style:solid;border-radius:20%;border-width:20px 22px 0 0;border-color:#1c7857 transparent transparent;transform:rotate(30deg)}.doboard_task_widget-wrap.hidden{display:none}.wrap_review{width:160px;border-radius:16px;height:52px}.wrap_review:hover{background-color:#1c7857}#review_content_button_text{color:#fff;margin-left:4px;font-size:16px;text-transform:none!important}.wrap_review::after{display:none}#doboard_task_widget-task_count{position:absolute;top:-5px;right:-5px;width:22px;height:22px;opacity:1;background:#ef8b43;border-radius:50%;color:#FFF;text-align:center;line-height:22px}#doboard_task_widget-task_count:hover{background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxmb3JlaWduT2JqZWN0IHg9Ii00IiB5PSItNCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIj48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iYmFja2Ryb3AtZmlsdGVyOmJsdXIoMnB4KTtjbGlwLXBhdGg6dXJsKCNiZ2JsdXJfMF8xODk4OV8yODI2X2NsaXBfcGF0aCk7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJSI+PC9kaXY+PC9mb3JlaWduT2JqZWN0PjxwYXRoIGRhdGEtZmlnbWEtYmctYmx1ci1yYWRpdXM9IjQiIGQ9Ik0xMSAyMkMxNy4wNzUxIDIyIDIyIDE3LjA3NTEgMjIgMTFDMjIgNC45MjQ4NyAxNy4wNzUxIDAgMTEgMEM0LjkyNDg3IDAgMCA0LjkyNDg3IDAgMTFDMCAxNy4wNzUxIDQuOTI0ODcgMjIgMTEgMjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjciLz4KICAgIDxwYXRoIGQ9Ik0xNiA2TDYgMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik02IDZMMTYgMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgIDxkZWZzPgogICAgICAgIDxjbGlwUGF0aCBpZD0iYmdibHVyXzBfMTg5ODlfMjgyNl9jbGlwX3BhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNCkiPjxwYXRoIGQ9Ik0xMSAyMkMxNy4wNzUxIDIyIDIyIDE3LjA3NTEgMjIgMTFDMjIgNC45MjQ4NyAxNy4wNzUxIDAgMTEgMEM0LjkyNDg3IDAgMCA0LjkyNDg3IDAgMTFDMCAxNy4wNzUxIDQuOTI0ODcgMjIgMTEgMjJaIi8+CiAgICAgICAgPC9jbGlwUGF0aD48L2RlZnM+Cjwvc3ZnPg==) center no-repeat;cursor:pointer;overflow:hidden;font-size:0}#doboard_task_widget-task_count.hidden{width:0;height:0;opacity:0}.doboard_task_widget-input-container{position:relative;margin-bottom:24px}.doboard_task_widget-input-container.hidden{display:none}.doboard_task_widget-input-container .doboard_task_widget-field{padding:0 8px;border-radius:4px;border:1px solid #BBC7D1;outline:0!important;appearance:none;width:100%;height:40px;background:#FFF;color:#000;max-width:-webkit-fill-available;max-width:-moz-available}.doboard_task_widget-field:focus{border-color:#2F68B7}.doboard_task_widget-input-container textarea.doboard_task_widget-field{height:94px;padding-top:11px;padding-bottom:11px}.doboard_task_widget-field+label{color:#252A2F;background:#fff;position:absolute;top:20px;left:8px;transform:translateY(-50%);transition:all .2s ease-in-out}.doboard_task_widget-field.has-value+label,.doboard_task_widget-field:focus+label{font-size:10px;top:0;left:12px;padding:0 4px;z-index:5}.doboard_task_widget-field:focus+label{color:#2F68B7}.doboard_task_widget-login{background:#F9FBFD;border:1px solid #BBC7D1;border-radius:4px;padding:11px 8px 8px;margin-bottom:40px}.doboard_task_widget-login.hidden{display:none}.doboard_task_widget-login .doboard_task_widget-accordion{height:0;overflow:hidden;opacity:0;transition:all .2s ease-in-out}.doboard_task_widget-login.active .doboard_task_widget-accordion{height:auto;overflow:visible;opacity:1}.doboard_task_widget-login .doboard_task_widget-input-container:last-child{margin-bottom:0}.doboard_task_widget-login span{display:block;position:relative;padding-right:24px;cursor:pointer}.doboard_task_widget-login.active span{margin-bottom:24px}.doboard_task_widget-login span::after{position:absolute;top:0;right:4px;content:"";display:block;width:10px;height:10px;transform:rotate(45deg);border:2px solid #40484F;border-radius:1px;border-top:none;border-left:none;transition:all .2s ease-in-out}.doboard_task_widget-login.active span::after{transform:rotate(-135deg);top:7px}.doboard_task_widget-login .doboard_task_widget-field+label,.doboard_task_widget-login .doboard_task_widget-input-container .doboard_task_widget-field{background:#F9FBFD}.doboard_task_widget-submit_button{height:48px;width:100%;margin-bottom:10px;color:#FFF;background:#22A475;border:none;border-radius:6px;font-family:Inter,sans-serif;font-weight:700;font-size:16px;line-height:150%;cursor:pointer;transition:all .2s ease-in-out}.doboard_task_widget-submit_button:hover{background:#1C7857;color:#FFF}.doboard_task_widget-submit_button:disabled{background:rgba(117,148,138,.92);color:#FFF;cursor:wait}.doboard_task_widget-issue-title{max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.doboard_task_widget-hidden_element{opacity:0}.doboard_task_widget-message-wrapper{border-radius:4px;padding:8px;margin-bottom:14px;display:grid;justify-items:center}.doboard_task_widget-error_message-wrapper.hidden,.doboard_task_widget-message-wrapper.hidden{display:none}.doboard_task_widget-error_message{background:#fdd;border:1px solid #cf6868}.doboard_task_widget-notice_message{background:#dde9ff;border:1px solid #68a6cf}#doboard_task_widget-error_message-header{font-weight:600}#doboard_task_widget-error_message{text-align:center}.doboard_task_widget-task_row{display:flex;max-height:55px;cursor:pointer;align-items:center;justify-content:space-between;padding:1px 15px}.doboard_task_widget-task_row:last-child{margin-bottom:0}.doboard_task_widget-task-text_bold{font-weight:700}.doboard_task_widget-element_selection,.doboard_task_widget-image_selection,.doboard_task_widget-text_selection,.doboard_task_widget-text_selection.image-highlight>img{background:rgba(208,213,127,.68)}.doboard_task_widget-issues_list_empty{text-align:center;margin:20px 0}.doboard_task_widget-avatar_container{display:flex;height:44px;width:44px;border-radius:50%;background-repeat:no-repeat;background-position:center;background-size:100%}.doboard_task_widget-comment_data_owner .doboard_task_widget-avatar_container{opacity:0}.doboard_task_widget-avatar_placeholder{min-height:44px;min-width:44px;border-radius:50%;font-size:24px;line-height:1.2083333333;padding:0;background:#1C7857;display:inline-grid;align-content:center;justify-content:center}.doboard_task_widget-avatar-initials{color:#FFF;width:inherit;text-align:center}.doboard_task_widget-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover}.doboard_task_widget-description_container{height:55px;width:calc(100% - 44px - 8px);border-bottom:1px solid #EBF0F4;display:block;margin-left:8px}.doboard_task_widget-task_row:last-child .doboard_task_widget-description_container{border-bottom:none}.doboard_task_widget-all_issues{padding-bottom:0}.doboard_task_widget-all_issues-container,.doboard_task_widget-concrete_issues-container{overflow:auto;max-height:85vh;display:none}.doboard_task_widget-task_last_message,.doboard_task_widget-task_page_url a,.doboard_task_widget-task_title span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.doboard_task_widget-all_issues-container{scrollbar-width:none;margin-top:10px}.doboard_task_widget-content.doboard_task_widget-concrete_issue{padding:0}.doboard_task_widget-concrete_issues-container{padding:10px 16px 5px}.doboard_task_widget-all_issues-container::-webkit-scrollbar,.doboard_task_widget-all_issues::-webkit-scrollbar,.doboard_task_widget-concrete_issues-container::-webkit-scrollbar,.doboard_task_widget-content::-webkit-scrollbar{width:0}.doboard_task_widget-task_title{font-weight:700;display:flex;justify-content:space-between;align-items:center}.doboard_task_widget-task_title span{font-weight:700;display:inline-block}.doboard_task_widget-task_title-details{display:flex;max-width:calc(100% - 40px);align-items:center}.doboard_task_widget-task_title-unread_block{opacity:0;height:8px;width:8px;background:#f08c43;border-radius:50%;display:inline-block;font-size:8px;font-weight:600;position:relative}.doboard_task_widget-task_title-unread_block.unread{opacity:1}.doboard_task_widget-task_last_message{max-width:85%;height:36px}.doboard_task_widget-task_page_url{max-width:70%;height:36px;display:flex;align-items:center}.doboard_task_widget-task_page_url a{color:#40484F;text-decoration:none;margin-left:8px;max-width:100%}.doboard_task_widget-bottom{display:flex;justify-content:space-between}.doboard_task_widget-bottom-is-fixed{border-radius:10px;background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxOSAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik03LjA4MTE5IDAuMjIzNDM0QzguOTkxNjkgLTAuMjA4MTY3IDEwLjk5MTMgLTAuMDExMjE5NCAxMi43ODA0IDAuNzg1OTM0QzEzLjE1ODQgMC45NTQ2MjQgMTMuMzI4NiAxLjM5ODAzIDEzLjE2MDMgMS43NzYxN0MxMi45OTE3IDIuMTU0MTkgMTIuNTQ4MiAyLjMyNDI0IDEyLjE3MDEgMi4xNTYwNUMxMC42NzY0IDEuNDkwNTIgOS4wMDcyNiAxLjMyNiA3LjQxMjI1IDEuNjg2MzJDNS44MTcxNyAyLjA0NjcxIDQuMzgwOTcgMi45MTI5NiAzLjMxODUgNC4xNTYwNUMyLjI1NjIzIDUuMzk5MDEgMS42MjQ0MSA2Ljk1MjI5IDEuNTE2NzQgOC41ODM3OUMxLjQwOTI0IDEwLjIxNTQgMS44MzE4NCAxMS44MzkgMi43MjE4MiAxMy4yMTA3QzMuNjExNzkgMTQuNTgyMiA0LjkyMTY0IDE1LjYyOTQgNi40NTUyMSAxNi4xOTYxQzcuOTg5MDIgMTYuNzYyNiA5LjY2NTUzIDE2LjgxODkgMTEuMjMzNSAxNi4zNTUzQzEyLjgwMTYgMTUuODkxNiAxNC4xNzgzIDE0LjkzMzUgMTUuMTU3NCAxMy42MjM4QzE2LjEzNjQgMTIuMzE0MiAxNi42NjYxIDEwLjcyMjcgMTYuNjY3MSA5LjA4NzY5TDE4LjE2NzEgOS4wODg2N0MxOC4xNjU4IDExLjA0NzEgMTcuNTMxMiAxMi45NTM2IDE2LjM1ODUgMTQuNTIyM0MxNS4xODU5IDE2LjA5MDcgMTMuNTM3MyAxNy4yMzg0IDExLjY1OTMgMTcuNzkzN0M5Ljc4MTEgMTguMzQ5MSA3Ljc3MjkzIDE4LjI4MiA1LjkzNTY4IDE3LjYwMzNDNC4wOTg1IDE2LjkyNDYgMi41MjkxMiAxNS42NzAxIDEuNDYzMDMgMTQuMDI3MUMwLjM5NzAzNSAxMi4zODQxIC0wLjEwOTEwOSAxMC40Mzk1IDAuMDE5NjY4MyA4LjQ4NTE1QzAuMTQ4NjA3IDYuNTMwOCAwLjkwNjMyMyA0LjY3MDMzIDIuMTc4ODUgMy4xODE0NEMzLjQ1MTM2IDEuNjkyNjggNS4xNzA4OCAwLjY1NTE2MiA3LjA4MTE5IDAuMjIzNDM0WiIgZmlsbD0iIzIyQTQ3NSIvPg0KPHBhdGggZD0iTTE2Ljg4NTkgMS44OTA0M0MxNy4xNzg2IDEuNTk3NTMgMTcuNjUzNCAxLjU5Nzg0IDE3Ljk0NjQgMS44OTA0M0MxOC4yMzkzIDIuMTgzMTYgMTguMjQwMSAyLjY1Nzk2IDE3Ljk0NzQgMi45NTA5N0w5LjYxMzQyIDExLjI5MjhDOS40NzI4MiAxMS40MzMzIDkuMjgxOTYgMTEuNTEyNCA5LjA4MzE1IDExLjUxMjVDOC44ODQzMiAxMS41MTI1IDguNjkzNDggMTEuNDMzMyA4LjU1Mjg3IDExLjI5MjhMNi4wNTI4NyA4Ljc5Mjc3QzUuNzYwMTQgOC40OTk5IDUuNzYwMTEgOC4wMjUwOCA2LjA1Mjg3IDcuNzMyMjJDNi4zNDU3MiA3LjQzOTM3IDYuODIwNTEgNy40Mzk0NiA3LjExMzQyIDcuNzMyMjJMOS4wODIxNyA5LjcwMDk3TDE2Ljg4NTkgMS44OTA0M1oiIGZpbGw9IiMyMkE0NzUiLz4NCjxwYXRoIGQ9Ik0xNy40MTcxIDcuNTcxMDlDMTcuODMxIDcuNTcxNDQgMTguMTY3IDcuOTA3MTYgMTguMTY3MSA4LjMyMTA5VjkuMDg4NjdMMTcuNDE3MSA5LjA4NzY5SDE2LjY2NzFWOC4zMjEwOUMxNi42NjcyIDcuOTA2OTQgMTcuMDAzIDcuNTcxMDkgMTcuNDE3MSA3LjU3MTA5WiIgZmlsbD0iIzIyQTQ3NSIvPg0KPC9zdmc+) 8px center no-repeat #EBFAF4;padding:4px 7px 4px 30px}.doboard_task_widget-bottom-is-fixed-task-block{text-align:center}.doboard_task_widget-bottom-is-fixed-task{background:#F3F6F9;color:#1C7857;display:inline-block;border-radius:10px;padding:5px 8px;margin:0 auto}.doboard_task_widget-task_row-green{background:#EBF0F4}.doboard_task_widget_return_to_all{display:flex;gap:8px;flex-direction:row;-moz-flex-direction:row;align-content:center;flex-wrap:wrap}.doboard_task_widget-task_title-last_update_time{font-family:Inter,serif;font-weight:400;font-style:normal;font-size:11px;leading-trim:NONE;line-height:100%}.doboard_task_widget-task_title_public_status_img{opacity:50%;margin-left:5px;scale:90%}.doboard_task_widget-description-textarea{resize:none}.doboard_task_widget-switch_row{display:flex;align-items:center;gap:12px;margin:16px 0;justify-content:space-between}.doboard_task_widget-switch-label{font-weight:600;font-size:16px;height:24px;align-content:center}.doboard_task_widget-switch{position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0}.doboard_task_widget-switch input{opacity:0;width:0;height:0}.doboard_task_widget-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;border-radius:24px;transition:.2s}.doboard_task_widget-slider:before{position:absolute;content:"";height:20px;width:20px;left:2px;bottom:2px;background-color:#fff;border-radius:50%;transition:.2s}.doboard_task_widget-switch input:checked+.doboard_task_widget-slider{background-color:#65D4AC}.doboard_task_widget-switch input:checked+.doboard_task_widget-slider:before{transform:translateX(20px)}.doboard_task_widget-switch-img{width:24px;height:24px;flex-shrink:0}.doboard_task_widget-switch-center{display:flex;gap:2px;flex-direction:column;-moz-flex-direction:column;flex:1 1 auto;min-width:0}.doboard_task_widget-switch-desc{display:block;font-size:12px;color:#707A83;margin:0;line-height:1.2;max-width:180px;word-break:break-word}.doboard_task_widget-concrete_issue-day_content{display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-concrete_issue_day_content-month_day{text-align:center;font-weight:400;font-size:12px;line-height:100%;padding:8px;opacity:.75}.doboard_task_widget-concrete_issue_day_content-messages_wrapper{display:flex;flex-direction:column;-moz-flex-direction:column}.doboard_task_widget-comment_data_wrapper{display:flex;flex-direction:row;-moz-flex-direction:row;margin-bottom:15px;align-items:flex-end}.doboard_task_widget-comment_text_container{position:relative;width:calc(100% - 44px - 5px);height:auto;margin-left:5px;background:#F3F6F9;border-radius:16px}.doboard_task_widget-comment_text_container:after{content:"";position:absolute;bottom:0;left:-5px;width:13px;height:19px;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxMyAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMTEyNTggMTkuMDMzNEM1LjI5NDg2IDE5LjgyMDEgMTAuNjEwNSAxNy45NzQxIDEyLjI3MTUgMTYuMTcxM0MxMi4yNzE1IDE2LjE3MTMgMTAuOTYyMyAtMi43ODEyNCA1LjA5NTU0IDAuMzQ5MDc5QzUuMDc0NCAxLjYxNDU0IDUuMDk1NTQgNS45OTQ5IDUuMDk1NTQgNi43NDA2OUM1LjA5NTU0IDE3LjA2NjIgLTAuODg0MDEyIDE4LjQ0MDEgMC4xMTI1OCAxOS4wMzM0WiIgZmlsbD0iI0YzRjZGOSIvPgo8L3N2Zz4K)}.doboard_task_widget-comment_data_owner .doboard_task_widget-comment_text_container{background:#EBFAF4}.doboard_task_widget-comment_data_owner .doboard_task_widget-comment_text_container:after{left:auto;right:-5px;height:13px;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMyAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjc3NzEgMTIuMzA2NkM3LjMzMTM1IDEzLjA5MzcgMS43NDU0NCAxMS4yNDY5IDAgOS40NDMxOUw3LjM5MTYgMEM3LjM5MTYgMTAuMzMwMyAxMy44MjQ0IDExLjcxMzEgMTIuNzc3MSAxMi4zMDY2WiIgZmlsbD0iI0VCRkFGNCIvPgo8L3N2Zz4K)}.doboard_task_widget-comment_body,.doboard_task_widget-comment_time{position:relative;z-index:1}.doboard_task_widget-comment_body{padding:6px 8px;min-height:30px}.doboard_task_widget-comment_body strong{font-variation-settings:"wght" 700}.doboard_task_widget-comment_body blockquote{margin:0;border-left:3px solid #22a475}.doboard_task_widget-comment_body blockquote p{margin:0 10px}.doboard_task_widget-comment_body details .mce-accordion-body{padding-left:20px}.doboard_task_widget-comment_body details .mce-accordion-summary{background:url("data:image/svg+xml;charset=utf-8,%3Csvg transform='rotate(180 0 0)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20' xml:space='preserve'%3E%3Cpath d='M10 13.3c-.2 0-.4-.1-.6-.2l-5-5c-.3-.3-.3-.9 0-1.2.3-.3.9-.3 1.2 0l4.4 4.4 4.4-4.4c.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2l-5 5c-.2.2-.4.2-.6.2z'/%3E%3C/svg%3E") 0 no-repeat;padding-left:20px}.doboard_task_widget-comment_body .mce-accordion[open] .mce-accordion-summary{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20' xml:space='preserve'%3E%3Cpath d='M10 13.3c-.2 0-.4-.1-.6-.2l-5-5c-.3-.3-.3-.9 0-1.2.3-.3.9-.3 1.2 0l4.4 4.4 4.4-4.4c.3-.3.9-.3 1.2 0 .3.3.3.9 0 1.2l-5 5c-.2.2-.4.2-.6.2z'/%3E%3C/svg%3E") 0 no-repeat}.doboard_task_widget-comment_body details .mce-accordion-summary::marker{content:""}.doboard_task_widget-comment_body pre{border:1px solid #d6dde3;border-left-width:8px;border-radius:4px;padding:13px 16px 14px 12px;white-space:pre-wrap}.doboard_task_widget-comment_time{font-weight:400;font-size:11px;opacity:.8;position:absolute;bottom:6px;right:6px}.doboard_task_widget-comment_body-img-strict{max-width:-webkit-fill-available;height:100px;margin-right:5px}.doboard_task_widget-send_message{padding:14px 10px;border-top:1px solid #BBC7D1;position:sticky;background:#fff;bottom:0;z-index:4}.doboard_task_widget-send_message_elements_wrapper{display:flex;flex-direction:row;-moz-flex-direction:row;align-content:center;flex-wrap:nowrap;justify-content:space-between;align-items:end}.doboard_task_widget-send_message_elements_wrapper img{margin:0}.doboard_task_widget-send_message_input_wrapper{position:relative;display:inline-grid;align-items:center;justify-items:center;flex-grow:1;padding:0 6px}.doboard_task_widget-send_message_input_wrapper textarea{position:relative;width:100%;height:37px;border:none;outline:0;box-shadow:none;border-radius:24px;background:#F3F6F9;resize:none;margin-bottom:0!important;transition:height .2s ease-in-out;padding:8px;box-sizing:border-box}.doboard_task_widget-send_message_input_wrapper textarea.high{height:170px}.doboard_task_widget-send_message_input_wrapper textarea:focus{background:#F3F6F9;border-color:#007bff;outline:0}.doboard_task_widget-send_message_button{display:inline-grid;border:none;cursor:pointer;padding:0;width:100%;align-items:center;margin:20px 0 0}.doboard_task_widget-send_message_paperclip{display:inline-grid;border:none;background:0 0;cursor:pointer;padding:0;align-items:center;margin:0}.doboard_task_widget-send_message_button:hover,.doboard_task_widget-send_message_paperclip:hover rect{fill:#45a049}.doboard_task_widget-send_message_button:active,.doboard_task_widget-send_message_paperclip:active{transform:scale(.98)}.doboard_task_widget-spinner_wrapper_for_containers{display:flex;justify-content:center;align-items:center;min-height:60px;width:100%}.doboard_task_widget-spinner_for_containers{width:40px;height:40px;border-radius:50%;background:conic-gradient(transparent,#1C7857);mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#fff 0);animation:spin 1s linear infinite}.doboard_task_widget-create_issue{padding:10px}.doboard_task_widget__file-upload__wrapper{display:none;border:1px solid #BBC7D1;margin-top:14px;padding:0 10px 10px;border-radius:4px}.doboard_task_widget__file-upload__list-header{text-align:left;font-size:.9em;margin:5px 0;color:#444c529e}.doboard_task_widget__file-upload__file-input-button{display:none}.doboard_task_widget__file-upload__file-list{border:1px solid #ddd;border-radius:5px;padding:6px;max-height:200px;overflow-y:auto;background:#f3f6f9}.doboard_task_widget__file-upload__file-item{display:flex;justify-content:space-between;align-items:center;padding:4px;border-bottom:1px solid #bbc7d16b}.doboard_task_widget__file-upload__file-item:last-child{border-bottom:none}.doboard_task_widget__file-upload__file_info{display:inline-flex;align-items:center}.doboard_task_widget__file-upload__file-name{font-weight:700;font-size:.9em}.doboard_task_widget__file-upload__file-item-content{width:100%}.doboard_task_widget__file-upload__file_size{color:#666;font-size:.8em;margin-left:6px}.doboard_task_widget__file-upload__remove-btn{background:#22a475;color:#fff;border:none;border-radius:3px;cursor:pointer}.doboard_task_widget__file-upload__error{display:block;margin:7px 0 0;padding:7px;border-radius:4px;background:#fdd;border:1px solid #cf6868}.doboard_task_widget-show_button{position:fixed;background:#1C7857;color:#FFF;padding:8px 12px;border-radius:4px;font-size:14px;z-index:10000;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);transform:translate(-50%,-100%);margin-top:-8px;white-space:nowrap;border:none;font-family:inherit}@keyframes spin{to{transform:rotate(1turn)}}@media (max-width:480px){.doboard_task_widget{position:fixed;right:0;top:auto;bottom:0;margin:0 20px 20px;box-sizing:border-box;transform:translateZ(0);-moz-transform:translateZ(0);will-change:transform;max-height:90vh}.doboard_task_widget-container{width:100%;max-width:290px;margin:0 auto;max-height:90vh}.doboard_task_widget-content{height:auto;max-height:none;scrollbar-width:none}.doboard_task_widget-content::-webkit-scrollbar{display:none}.doboard_task_widget-all_issues-container,.doboard_task_widget-concrete_issues-container{max-height:80vh}}@supports (-webkit-overflow-scrolling:touch){.doboard_task_widget{position:fixed}}.doboard_task_widget_tasks_list{background-color:#fff;position:sticky;bottom:0;height:38px;display:flex;flex-direction:column-reverse;align-items:center;padding-bottom:8px}.doboard_task_widget_tasks_list a{color:#40484F!important;text-decoration:none!important}.doboard_task_widget-text_selection{position:relative;display:inline-block}.doboard_task_widget-see-task{cursor:pointer;text-decoration:underline}.doboard_task_widget-text_selection_tooltip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:#FFF;color:#000;padding:4px 8px;border-radius:4px;font-size:10px;white-space:nowrap;z-index:9000;border:1px solid #BBC7D1;margin-bottom:8px}.doboard_task_widget-text_selection_tooltip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#FFF}.doboard_task_widget-text_selection_tooltip::before{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#BBC7D1;z-index:-1}.doboard_task_widget-text_selection_tooltip_icon{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDEwMyAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMyAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMxNzcyNTA7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MywwSDB2MTAwaDMwLjJINTNDMTE5LjYsMTAwLDExOS42LDAsNTMsMHogTTMwLjIsMTAwYy0xNi42LDAtMzAtMTMuNC0zMC0zMHMxMy40LTMwLDMwLTMwDQoJYzE2LjYsMCwzMCwxMy40LDMwLDMwUzQ2LjgsMTAwLDMwLjIsMTAweiIvPg0KPC9zdmc+DQo=);background-repeat:no-repeat;width:22px;height:22px;margin:5px 3px}.doboard_task_widget-text_selection_tooltip_element{display:flex;justify-content:space-between}.doboard_task_widget-content .tox .tox-toolbar__group{padding:0 8px!important}.doboard_task_widget-content .tox-tinymce{border:1px solid #BBC7D1;border-radius:4px}`;
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

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
    } catch (error) {
        storedTasks = {};
    }

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

function storageSaveTasksCount(tasks) {
    if (!tasks || !Array.isArray(tasks)) {
        return;
    }

    const count = tasks.filter(task => {
        return task.taskMeta;
    })?.length;

    localStorage.setItem('spotfix_tasks_count', `${count}`);
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

    let storedTasks = {};
    try {
        storedTasks = JSON.parse(localStorage.getItem('spotfix_task_updates') || '{}');
    } catch (error) {
        storedTasks = {};
    }
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

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

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

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }
    storedUnread = storedUnread.filter(id => id !== taskId);
    localStorage.setItem('spotfix_unread_updates', JSON.stringify(storedUnread));
}

/**
 * Check if there are any unread updates
 * @returns {boolean}
 */
function storageTasksHasUnreadUpdates() {
    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

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

    let storedUnread = [];
    try {
        storedUnread = JSON.parse(localStorage.getItem('spotfix_unread_updates') || '[]');
    } catch (error) {
        storedUnread = [];
    }

    return storedUnread.includes(taskId.toString());
}


/**
 * File uploader handler for managing file attachments with validation and upload capabilities
 */
class FileUploader {
    /**
     * Create a new FileUploader instance
     * @param {function} escapeHtmlHandler - Function to escape HTML strings for security
     */
    constructor(escapeHtmlHandler) {
        /** @type {Array<{id: string, file: File}>} */
        this.files = [];

        /** @type {number} Maximum allowed file size in bytes */
        this.maxFileSize = 5 * 1024 * 1024; // 5MB

        /** @type {number} Maximum total size for all files in bytes */
        this.maxTotalSize = 25 * 1024 * 1024; // 25MB

        /** @type {number} Maximum number of files allowed */
        this.maxFiles = 5;

        /** @type {string[]} Allowed MIME types for files */
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword'];

        /** @type {function} HTML escaping function for XSS protection */
        this.escapeHtmlHandler = escapeHtmlHandler;

        /** @type {string[]} File size units for display */
        this.SIZE_UNITS = ['Bytes', 'KB', 'MB', 'GB'];
    }

    /**
     * Initialize elements and bindings. Should be called only for comments.
     * @returns {void}
     */
    init() {
        this.initializeElements();
        this.bindFilesInputChange();
    }

    /**
     * Define widget elements to work with uploader.
     * @returns {void}
     */
    initializeElements() {
        /** @type {HTMLInputElement|null} */
        this.fileInput = document.getElementById('doboard_task_widget__file-upload__file-input-button');

        /** @type {HTMLElement|null} */
        this.fileList = document.getElementById('doboard_task_widget__file-upload__file-list');

        this.uploaderWrapper = document.getElementById('doboard_task_widget__file-upload__wrapper');

        /** @type {HTMLElement|null} */
        this.errorMessage = document.getElementById('doboard_task_widget__file-upload__error');

        if (!this.fileInput || !this.fileList || !this.errorMessage || this.uploaderWrapper) {
            console.warn('File uploader elements not found');
        }
    }

    /**
     * Define hidden file input change to run uploader logic.
     * @returns {void}
     */
    bindFilesInputChange() {
        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this.handleFileInputChange(e));
        }
    }

    /**
     * Bind action to paperclip button.
     * @param {HTMLElement} element - The paperclip button element
     * @returns {void}
     */
    bindPaperClipAction(element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.fileInput) {
                this.fileInput.click();
            }
        });
    }

    /**
     * Handle file input change event
     * @param {Event} event - File input change event
     * @returns {void}
     */
    handleFileInputChange(event) {
        this.clearError();

        const selectedFiles = Array.from(event.target.files);
        if (this.files.length + selectedFiles.length > this.maxFiles) {
            this.showError(`Maximum ${this.maxFiles} files can be attached.`);
            return;
        }
        const validFiles = selectedFiles.filter(file => this.validateFile(file));

        validFiles.forEach(file => this.addFile(file));

        // Reset input to allow selecting same files again
        event.target.value = '';

        // show wrapper
        this.uploaderWrapper.style.display = 'block';
    }

    /**
     * Validate a file against upload constraints
     * @param {File} file - File to validate
     * @returns {boolean} True if file is valid, false otherwise
     */
    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            this.showError(`File "${file.name}" is too large. Maximum size: ${this.formatFileSize(this.maxFileSize)}`);
            return false;
        }

        // Check total size
        const totalSize = this.getTotalSize() + file.size;
        if (totalSize > this.maxTotalSize) {
            this.showError(`Total files size exceeded. Maximum: ${this.formatFileSize(this.maxTotalSize)}`);
            return false;
        }

        // Check file type
        if (this.allowedTypes.length > 0 && !this.allowedTypes.includes(file.type)) {
            this.showError(`File type "${file.type}" for "${file.name}" is not supported.`);
            return false;
        }

        return true;
    }

    /**
     * Calculate total size of all files
     * @returns {number} Total size in bytes
     */
    getTotalSize() {
        return this.files.reduce((sum, fileData) => sum + fileData.file.size, 0);
    }

    /**
     * Add a file to the upload queue
     * @param {File} file - File to add
     * @returns {void}
     */
    addFile(file) {
        const fileWithId = {
            id: this.generateFileId(),
            file: file
        };

        this.files.push(fileWithId);
        this.renderFileList();
    }

    /**
     * Generate a unique file ID
     * @returns {string} Unique file identifier
     * @private
     */
    generateFileId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Remove a file from the upload queue
     * @param {string} fileId - ID of the file to remove
     * @returns {void}
     */
    removeFile(fileId) {
        this.files = this.files.filter(f => f.id !== fileId);
        this.renderFileList();
        this.clearError();
    }

    /**
     * Render the file list in the UI
     * @returns {void}
     */
    renderFileList() {
        if (!this.fileList) return;

        if (this.files.length === 0) {
            this.fileList.innerHTML = ksesFilter('<div style="text-align: center; color: #444c529e;">No files attached</div>');
            return;
        }

        const fileItems = this.files.map(fileData => this.createFileItem(fileData));
        this.fileList.innerHTML = ksesFilter('');
        fileItems.forEach(item => this.fileList.appendChild(item));
    }

    /**
     * Create file item element for display
     * @param {object} fileData - File data object
     * @param {string} fileData.id - File identifier
     * @param {File} fileData.file - File object
     * @returns {HTMLDivElement} File item DOM element
     */
    createFileItem(fileData) {
        const { file, id } = fileData;
        const fileItem = document.createElement('div');
        fileItem.className = 'doboard_task_widget__file-upload__file-item';

        fileItem.innerHTML = ksesFilter(`
            <div class="doboard_task_widget__file-upload__file-item-content">
                <div class="doboard_task_widget__file-upload__file_info">
                    <div class="doboard_task_widget__file-upload__file-name">${this.escapeHtmlHandler(String(file.name))}</div>
                    <div class="doboard_task_widget__file-upload__file_size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <button type="button" class="doboard_task_widget__file-upload__remove-btn" data-file-id="${id}" aria-label="Remove file">×</button>
        `);

        const removeBtn = fileItem.querySelector('.doboard_task_widget__file-upload__remove-btn');
        removeBtn.addEventListener('click', () => this.removeFile(id));

        return fileItem;
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size string
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + this.SIZE_UNITS[i];
    }

    /**
     * Show uploader error message
     * @param {string} message - Error message to display
     * @returns {void}
     */
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
        }
    }

    /**
     * Clear uploader error message
     * @returns {void}
     */
    clearError() {
        if (this.errorMessage) {
            this.errorMessage.textContent = '';
            this.errorMessage.style.display = 'none';
        }
    }

    /**
     * Check if there are files to send
     * @returns {boolean} True if files are present, false otherwise
     */
    hasFiles() {
        return this.files.length > 0;
    }

    /**
     * Clear all files from upload queue
     * @returns {void}
     */
    clearFiles() {
        this.files = [];
        this.renderFileList();
    }

    /**
     * Validate file data structure before upload
     * @param {object} fileData - File data object to validate
     * @param {string} fileData.sessionId - Session identifier
     * @param {object} fileData.params - Additional parameters
     * @param {string} fileData.params.accountId - Account identifier
     * @param {string} fileData.params.projectToken - Project token
     * @param {string} fileData.commentId - Comment identifier
     * @param {string} fileData.fileName - File name
     * @param {File} fileData.fileBinary - File binary data
     * @returns {object} Validated file data
     * @throws {Error} When file data validation fails
     */
    validateFileData(fileData) {
        const validations = [
            { field: 'sessionId', type: 'string', message: 'No valid session found.' },
            { field: 'params.accountId', type: 'string', message: 'No valid account ID found.' },
            { field: 'params.projectToken', type: 'string', message: 'No valid project token found.' },
            { field: 'commentId', type: 'string', message: 'No valid commentId found.' },
            { field: 'fileName', type: 'string', message: 'No valid filename found.' }
        ];

        for (const validation of validations) {
            const value = this.getNestedValue(fileData, validation.field);
            if (!value || typeof value !== validation.type) {
                throw new Error(validation.message);
            }
        }

        if (!fileData.fileBinary || !(fileData.fileBinary instanceof File)) {
            throw new Error('No valid file object found.');
        }

        return fileData;
    }

    /**
     * Helper to get nested object values
     * @param {object} obj - Object to traverse
     * @param {string} path - Dot notation path to value
     * @returns {*} Value at the specified path
     * @private
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Send single file attachment
     * @param {object} fileData - File data for upload
     * @returns {Promise<object>} Upload response
     */
    async sendSingleAttachment(fileData) {
        const validatedFileData = await this.validateFileData(fileData);
        return await attachmentAddDoboard(validatedFileData);
    }

    /**
     * Send all attachments for a comment
     * @param {object} params - Upload parameters
     * @param {string} sessionId - Session identifier
     * @param {string} commentId - Comment identifier
     * @returns {Promise<object>} Upload results
     */
    async sendAttachmentsForComment(params, sessionId, commentId) {
        /** @type {object} */
        const results = {
            preparedFilesCount: this.files.length,
            sentFilesCount: 0,
            fileResults: [],
            success: true
        };

        for (let i = 0; i < this.files.length; i++) {
            const fileData = this.files[i];
            /** @type {object} */
            const result = {
                success: false,
                response: null,
                error: null
            };

            try {
                const attachmentData = {
                    params,
                    sessionId,
                    commentId,
                    fileName: fileData.file.name,
                    fileBinary: fileData.file,
                    attachmentOrder: i
                };

                const response = await this.sendSingleAttachment(attachmentData);
                result.response = response;
                result.success = response.status === 200;

                if (result.success) {
                    results.sentFilesCount++;
                }
            } catch (error) {
                result.error = error.message;
            }

            results.fileResults.push(result);
        }

        results.success = results.preparedFilesCount === results.sentFilesCount;
        this.clearFiles();

        return results;
    }

     /**
     * Make a screenshot and add it as a file
     * @returns {Promise<void>}
     */
    async makeScreenshot() {
        if (!navigator.mediaDevices?.getDisplayMedia) {
            return null;
        }

        let stream;
        try {
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: { frameRate: 5 },
                audio: false
            });
        } catch (err) {
            return null;
        }

        const video = document.createElement('video');
        video.srcObject = stream;

        try {
            await video.play();
        } catch (err) {
            return null;
        }

        await new Promise(r => setTimeout(r, 2000));

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (!canvas.width || !canvas.height) {
            stream.getTracks().forEach(t => t.stop());
            return null;
        }

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        stream.getTracks().forEach(t => t.stop());

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        if (!blob) {
            return null;
        }

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const fileName = `Screenshot_${hours}:${minutes}_${day}_${month}_${year}.png`;

        const file = new File([blob], fileName, {
            type: 'image/png',
            lastModified: Date.now()
        });
        this.addFile(file);
    }

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
            <span>All spots </span>
        </div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-all_issues-container">
        </div>
        <div class="doboard_task_widget_tasks_list">
            <a rel="nofollow" target="_blank" href="https://doboard.com/spotfix">
            SpotFix
            </a>
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
    <div class="doboard_task_widget-content doboard_task_widget-concrete_issue">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-concrete_issues-container">
        </div>
        <div class="doboard_task_widget-send_message">
             <textarea name="doboard_task_widget_message" class="doboard_task_widget-send_message_input" placeholder="Write a message..."></textarea>
            <div>
              <div class="doboard_task_widget-field">
                <button id="doboard_task_widget-submit_button" class="doboard_task_widget-submit_button doboard_task_widget-send_message_button">Submit</button>
            </div>
            </div>
            <div class="doboard_task_widget__file-upload__wrapper" id="doboard_task_widget__file-upload__wrapper">
                <div class="doboard_task_widget__file-upload__list-header">Attached files</div>
                <div class="doboard_task_widget__file-upload__file-list" id="doboard_task_widget__file-upload__file-list"></div>
                <div class="doboard_task_widget__file-upload__error" id="doboard_task_widget__file-upload__error"></div>
                <input type="file" class="doboard_task_widget__file-upload__file-input-button" id="doboard_task_widget__file-upload__file-input-button" multiple accept="*/*">
            </div>
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
    {{statusFixedHtml}}
</div>
`;
    }

    static concrete_issue_messages() {
        return `
<div class="doboard_task_widget-comment_data_wrapper doboard_task_widget-comment_data_{{issueMessageClassOwner}}">
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-comment_text_container">
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
            <label for="doboard_task_widget-description">Description</label>
            <textarea id="doboard_task_widget-description" class="doboard_task_widget-field" name="description" required></textarea>
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
<div class="doboard_task_widget-task_row issue-item {{elementBgCSSClass}}" data-node-path='[{{nodePath}}]' data-task-id='{{taskId}}'>
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
<!--            <div class="doboard_task_widget-task_title-last_update_time">{{taskLastUpdate}}</div>-->
        </div>
        <div class="doboard_task_widget-bottom">
            <div class="doboard_task_widget-task_page_url">
                <img src="{{iconLinkChain}}" />
                <a title="The spot is located on this {{taskPageUrl}}" href="{{taskPageUrl}}">{{taskFormattedPageUrl}}</a>
             </div>
                {{statusFixedHtml}}
        </div>
    </div>
</div>
`;
    }

    static wrap() {
        return `
<div class="doboard_task_widget-wrap">
<img src="{{iconSpotWidgetWrapPencil}}" />
<!--    <img src="{{logoDoBoardWrap}}" alt="Doboard logo">-->
    <div id="doboard_task_widget-task_count" class="hidden"></div>
</div>`;
    }

    static wrap_review() {
        return `
<button id="doboard_task_widget_button" class="doboard_task_widget-wrap wrap_review">
<img src="{{iconSpotWidgetWrapPencil}}" />
<span id="review_content_button_text">Review content</span>
</button>`;
    }

    static fixedHtml() {
        return `<p><span class="doboard_task_widget-bottom-is-fixed">Finished</span></p>`;
    }
    static fixedTaskHtml() {
        return `<p class="doboard_task_widget-bottom-is-fixed-task-block"><span class="doboard_task_widget-bottom-is-fixed-task">This issue already fixed</span></p>`;
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

    static iconSpotWidgetWrapPencil() {
        return `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 2.99981C17.2626 2.73717 17.5744 2.52883 17.9176 2.38669C18.2608 2.24455 18.6286 2.17139 19 2.17139C19.3714 2.17139 19.7392 2.24455 20.0824 2.38669C20.4256 2.52883 20.7374 2.73717 21 2.99981C21.2626 3.26246 21.471 3.57426 21.6131 3.91742C21.7553 4.26058 21.8284 4.62838 21.8284 4.99981C21.8284 5.37125 21.7553 5.73905 21.6131 6.08221C21.471 6.42537 21.2626 6.73717 21 6.99981L7.5 20.4998L2 21.9998L3.5 16.4998L17 2.99981Z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    }

    static iconLinkChain() {
        return `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 5.25H13.5C13.9925 5.25 14.4801 5.347 14.9351 5.53545C15.39 5.72391 15.8034 6.00013 16.1517 6.34835C16.4999 6.69657 16.7761 7.10997 16.9645 7.56494C17.153 8.01991 17.25 8.50754 17.25 9C17.25 9.49246 17.153 9.98009 16.9645 10.4351C16.7761 10.89 16.4999 11.3034 16.1517 11.6517C15.8034 11.9999 15.39 12.2761 14.9351 12.4645C14.4801 12.653 13.9925 12.75 13.5 12.75H11.25M6.75 12.75H4.5C4.00754 12.75 3.51991 12.653 3.06494 12.4645C2.60997 12.2761 2.19657 11.9999 1.84835 11.6517C1.14509 10.9484 0.75 9.99456 0.75 9C0.75 8.00544 1.14509 7.05161 1.84835 6.34835C2.55161 5.64509 3.50544 5.25 4.5 5.25H6.75" stroke="#707A83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 9H12" stroke="#707A83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
