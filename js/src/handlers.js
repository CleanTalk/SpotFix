function getUserTasks(params) {
	if (!localStorage.getItem('spotfix_session_id')) {
		return {};
	}
	const projectToken = params.projectToken;
	const sessionId = localStorage.getItem('spotfix_session_id');
	const userId = localStorage.getItem('spotfix_user_id');
	return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId, userId);
}

function getAllTasks(params) {
	if (!localStorage.getItem('spotfix_session_id')) {
		return {};
	}
	const projectToken = params.projectToken;
	const sessionId = localStorage.getItem('spotfix_session_id');
	return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
}

function getTaskDetails(params, taskId) {
	const sessionId = localStorage.getItem('spotfix_session_id');
	//return getTaskCommentsDoboard(taskId, params.sessionId, params.accountId, params.projectToken);
	//contract mock
	return  {
		issueTitle: 'Test Title',
		issueComments: [
			{
				commentAuthorAvatarSrc: '/spotfix/img/empty_avatar.png',
				commentAuthorName: 'testName 1',
				commentBody: 'Test Body 1',
				commentDate: 'August 31',
				commentTime: '14:15',
			},
			{
				commentAuthorAvatarSrc: '/spotfix/img/empty_avatar.png',
				commentAuthorName: 'testName 2',
				commentBody: 'Test Body 2',
				commentDate: 'August 31',
				commentTime: '14:16',
			}
		],
	};
}

function getTaskAuthorDetails(taskId) {
	const mockUsersData =
		[
			{
				'taskId': '1',
				'taskAuthorAvatarImgSrc': '/spotfix/img/empty_avatar.png',
				'taskAuthorName': 'Test All Issues Single Author Name'
			}
		]

	const defaultData =
		{
			'taskId': null,
			'taskAuthorAvatarImgSrc': '/spotfix/img/empty_avatar.png',
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
