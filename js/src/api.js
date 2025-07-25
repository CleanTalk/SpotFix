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
            taskId: responseBody.data.task_id
        }
    }
    throw new Error('Unknown error occurred during creating task');
};

const registerUser = async (projectToken, accountId, email, password) => {
    const formData = new FormData();
    formData.append('project_token', projectToken);
    formData.append('account_id', accountId);
    if (email && password) {
        formData.append('email', email);
        formData.append('password', password);
    }
    const response = await fetch(DOBOARD_API_URL + '/user_registration', {
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
            email: responseBody.data.email
        }
    }
    throw new Error('Unknown error occurred during registration');
};

const getTasksDoboard = async (sessionId, accountId, projectId) => {
    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('user_id', localStorage.getItem('spotfix_user_id'));
    formData.append('project_id', projectId);
    const response = await fetch(DOBOARD_API_URL + '/' + accountId + '/task_get', {
        method: 'POST',
        body: formData,
    });

    console.log(response)

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
            userId: task.user_id
        }))
    }
    throw new Error('Unknown error occurred during getting tasks');
}
