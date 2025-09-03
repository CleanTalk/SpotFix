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
 	// Вычисляем аватар и имя через отдельные функции
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
	 const month = months[dateObj.getMonth()];
	 const day = dateObj.getDate();
	 const date = `${month} ${day}`;
	 const hours = dateObj.getHours().toString().padStart(2, '0');
	 const minutes = dateObj.getMinutes().toString().padStart(2, '0');
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

// Получить аватар автора
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

// Получить имя автора
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
