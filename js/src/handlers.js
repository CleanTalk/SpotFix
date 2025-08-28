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
		issueTitle: 'Test Very Long Title Lorem Ipsum Bla Bla Bla',
		issueComments: [
			{
				commentAuthorAvatarSrc: '/spotfix/img/empty_avatar.png',
				commentAuthorName: 'testName 1',
				commentBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
				commentDate: 'August 27',
				commentTime: '14:11',
				commentUserId: 1118418
			},
			{
				commentAuthorAvatarSrc: 'https://s3.eu-central-1.amazonaws.com/cleantalk-ctask-atts/accounts/1/avatars/081a1b65d20fe318/m.jpg',
				commentAuthorName: 'testName 2',
				commentBody: 'Test Body 2 Lorem Ipsum Lorem Ipsum ',
				commentDate: 'August 31',
				commentTime: '14:16',
				commentUserId: 1
			},
			{
				commentAuthorAvatarSrc: '/spotfix/img/empty_avatar.png',
				commentAuthorName: 'testName 2',
				commentBody: 'Test Body 2 Lorem Ipsum Lorem Ipsum ',
				commentDate: 'August 31',
				commentTime: '18:16',
				commentUserId: 1
			}
		],
	};
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

function getTaskLastMessageDetails(taskId) {
	const mockTasksData =
		[
			{
				'taskId': '1',
				'lastMessageTimestamp': Math.floor(Date.now() / 1000),  //todo MOCK!,
				'lastMessageText': 'This is mocked last message', //todo MOCK!,
			}
		]

	const defaultData =
		{
			'taskId': null,
			'lastMessageTimestamp': null,
			'lastMessageText': 'No messages yet',
		};

	let result = {
		'lastMessageText': '',
		'lastMessageTime': ''
	}

	let hours = '00';
	let minutes = '00';

	let resultData = mockTasksData.find((element) => element.taskId === taskId);

	if (resultData === undefined) {
		resultData = defaultData;
	}

	if (resultData.lastMessageTimestamp !== null) {
		const dateFull = new Date(resultData.lastMessageTimestamp * 1000);
		hours = dateFull.getHours().toString().padStart(2, '0');
		minutes = dateFull.getMinutes().toString().padStart(2, '0');
	}

	result.lastMessageText = resultData.lastMessageText;
	result.lastMessageTime = `${hours}:${minutes}`

	return result;
}

