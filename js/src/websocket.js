let socket = null;
let heartbeatInterval = null;
let messageCallback = null;
let lastEventId = null;
let pendingUpdate = false;
let reconnectTimer = null;
let isIntentionalClose = false;

const WS_URL = 'wss://ws.doboard.com';

const getSessionId = () => localStorage.getItem('spotfix_session_id');

const buildMessage = (action) => ({
    channel: `account:${localStorage.getItem('spotfix_company_id')}`,
    action,
    account_id: localStorage.getItem('spotfix_company_id'),
    session_id: getSessionId(),
    project_token: localStorage.getItem('spotfix_project_token'),
});

const handleIncomingData = async (data) => {
    switch (data.object) {
    case 'users':
        await spotfixIndexedDB.put(SPOTFIX_TABLE_USERS, data.data);
        break;

    case 'tasks':
        if (data.data.status === 'REMOVED') {
            await spotfixIndexedDB.delete(SPOTFIX_TABLE_TASKS, data.data.task_id);
            const comments = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_COMMENTS);
            const filteredComments = comments.filter((comment) => +comment.taskId !== +data.data.task_id);
            await spotfixIndexedDB.clearPut(SPOTFIX_TABLE_COMMENTS, filteredComments);
            break;
        }

        await spotfixIndexedDB.put(SPOTFIX_TABLE_TASKS, {
            taskId: data.data.task_id,
            taskTitle: data.data.name,
            userId: data.data.user_id,
            taskLastUpdate: data.data.updated,
            taskCreated: data.data.created,
            taskCreatorTaskUser: data.data.creator_user_id,
            taskMeta: data.data.meta,
            taskStatus: data.data.status,
        });
        break;

    case 'comments':
        if (data.data.status === 'REMOVED') {
            await spotfixIndexedDB.delete(SPOTFIX_TABLE_COMMENTS, data.data.comment_id);
            break;
        }
        await spotfixIndexedDB.put(SPOTFIX_TABLE_COMMENTS, {
            taskId: data.data.task_id,
            commentId: data.data.comment_id,
            userId: data.data.user_id,
            commentBody: data.data.comment,
            commentDate: data.data.updated,
            status: data.data.status,
            issueTitle: data.data.task_name,
        });
        break;

    case 'attachments':
        if (data.data.status === 'REMOVED') {
            await spotfixIndexedDB.delete(SPOTFIX_TABLE_ATTACHMENT, data.data.attachment_id);
            break;
        }
        await spotfixIndexedDB.put(SPOTFIX_TABLE_ATTACHMENT, {
            attachmentId: data.data.attachment_id,
            taskId: data.data.task_id,
            commentId: data.data.comment_id,
            userId: data.data.user_id,
            filename: data.data.filename,
            URL: data.data.URL,
            URL_thumbnail: data.data.URL_thumbnail,
            mimeType: data.data.mime_content_type,
            fileSize: data.data.file_size,
            attachmentOrder: data.data.attachment_order,
            created: data.data.created,
            updated: data.data.updated,
        });
        break;

    default:
        break;
    }
};


const wsSpotfix = {
    connect() {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }

        if ((socket && socket.readyState === WebSocket.OPEN) || !getSessionId()) {
            return;
        }

        isIntentionalClose = false;
        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            heartbeatInterval = setInterval(() => {
                if (socket?.readyState === WebSocket.OPEN) {
                    socket.send('heartbeat');
                }
            }, 50 * 1000);
            wsSpotfix.send(buildMessage('SUBSCRIBE'));
        };

        socket.onmessage = async (event) => {
            if (event.data === 'heartbeat') return;

            let data;
            try {
                data = JSON.parse(event.data);
            } catch {
                console.warn('WS non-JSON message:', event.data);
                return;
            }

            if (!['users', 'tasks', 'comments', 'attachments'].includes(data.object)) return;

            const eventId = data.id ? `${data.object}-${data.id}` : JSON.stringify(data);

            if (eventId === lastEventId) return;
            lastEventId = eventId;

            await handleIncomingData(data);
            if (!pendingUpdate) {
                pendingUpdate = true;
                setTimeout(() => {
                    pendingUpdate = false;
                    if (messageCallback) messageCallback();
                }, 3000);
            }
        };

        socket.onclose = () => {
            socket = null;
            if (heartbeatInterval) {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
            }

            if (!isIntentionalClose) {
                reconnectTimer = setTimeout(() => {
                    wsSpotfix.connect();
                }, 2000);
            }
        };

        socket.onerror = (e) => {
            console.error('WS error:', e);
        };
    },

    send(data) {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
        }
    },

    close() {
        isIntentionalClose = true;
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        socket?.close();
    },

    subscribe() {
        if (socket?.readyState === WebSocket.OPEN) {
            wsSpotfix.send(buildMessage('SUBSCRIBE'));
        }
    },

    unsubscribe() {
        if (socket?.readyState === WebSocket.OPEN) {
            wsSpotfix.send(buildMessage('UNSUBSCRIBE'));
        }
    },

    onMessage(cb) {
        messageCallback = cb;
    },
};
