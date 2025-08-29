async function handleCreateTask(sessionId, taskDetails) {
	try {
		const result = await createTaskDoboard(sessionId, taskDetails);
		// После создания задачи сразу добавляем комментарий
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
	//console.log(tasksData);

	return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
}

async function getTaskDetails(params, taskId) {
	const sessionId = localStorage.getItem('spotfix_session_id');
	const comments = await getTaskCommentsDoboard(taskId, sessionId, params.accountId, params.projectToken);
	console.log(comments);

	return {
		issueTitle: comments.length > 0 ? comments[0].issueTitle : 'No Title',
		issueComments: comments.map(comment => {
 				const { date, time } = formatDate(comment.commentDate);
 				return {
 					commentAuthorAvatarSrc: comment.commentAuthorAvatarSrc || null,
 					commentAuthorName: comment.commentAuthorName || 'Unknown Author',
 					commentBody: comment.commentBody,
 					commentDate: date,
 					commentTime: time,
					commentUserId: comment.userId || 'Unknown User',
 				};
		})
	};
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
	 const month = months[dateObj.getMonth()];
	 const day = dateObj.getDate();
	 const date = `${month} ${day}`;
	 const hours = dateObj.getHours().toString().padStart(2, '0');
	 const minutes = dateObj.getMinutes().toString().padStart(2, '0');
	 const time = `${hours}:${minutes}`;
	 return { date, time };
}

function getTaskAuthorDetails(taskId) {
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
			'taskAuthorName': 'Unknown Author'
		};

	const data = mockUsersData.find((element) => element.taskId === taskId);
	return data === undefined ? defaultData : data;
}

function getIssuesCounterString() {
	const mock = {
		'totalTasks': 15,
		'tasksOnPage': 1
	}
	return `(${mock.tasksOnPage}/${mock.totalTasks})`;
}

function saveUserData(tasks) {
	// Save users avatars to local storage
}

async function getTaskLastMessageDetails(params, taskId) {
	try {
		// Параметры для getTaskDetails
/* 		const params = {
			projectToken: localStorage.getItem('spotfix_project_token'),
			accountId: localStorage.getItem('spotfix_account_id'),
			projectId: localStorage.getItem('spotfix_project_id')
		}; */

		const details = await getTaskDetails(params, taskId);

		if (details.issueComments && details.issueComments.length > 0) {
			const lastComment = details.issueComments[details.issueComments.length - 1];
			return {
				lastMessageText: lastComment.commentBody || '',
				lastMessageTime: lastComment.commentTime || ''
			};
		}
	} catch (e) {
		console.error(e);
	}

	return {
		lastMessageText: 'No messages yet',
		lastMessageTime: ''
	};
}
