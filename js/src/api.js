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

const registerUser = async (projectToken, accountId, email, nickname) => {
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
    // Формат 1: users внутри data
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
    // Формат 2: users на верхнем уровне
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
