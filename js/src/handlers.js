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
	const u = new URL(url);
	const domain = u.host;

	const segments = u.pathname.split('/').filter(Boolean);

	if (segments.length === 0) {
		return domain;
	}

	const reversed = segments.reverse();
	reversed.push(domain);

	return reversed.join(' / ');
}

