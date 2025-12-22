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

const jogoutUserDoboard = async (accountId) => {
    const sessionId = localStorage.getItem('spotfix_session_id');
    if(sessionId && accountId) {
        const data = {
            session_id: sessionId,
        };

        const result = await spotfixApiCall(data, 'user_unauthorize', accountId);
        if(result.operation_status === 'SUCCESS') {
            localStorage.removeItem('spotfix_email');
            localStorage.removeItem('spotfix_session_id');
            localStorage.removeItem('spotfix_user_id');
            localStorage.setItem('spotfix_widget_is_closed', '1');
        }
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

const getUserDoboard = async (sessionId, projectToken, accountId, userId) => {
    const data = {
        session_id: sessionId,
        project_token: projectToken,
    }
    if (userId) data.user_id = userId;

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

const getReleaseVersion = async () => {
    try {
        const res = await fetch('https://api.github.com/repos/CleanTalk/SpotFix/releases');
        const data = await res.json();

        if (data.length > 0 && data[0].tag_name) {
            localStorage.setItem('spotfix_app_version', data[0].tag_name);
            return data[0].tag_name;
        }

        return null;
    } catch (err) {
        return null;
    }
};

