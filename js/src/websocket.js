let socket = null;
let heartbeatInterval = null;

const WS_URL = 'wss://ws.doboard.com';

const getSessionId = () => localStorage.getItem('spotfix_session_id');

const buildMessage = (action) => ({
    channel: `account:${localStorage.getItem('spotfix_company_id')}`,
    action,
    account_id: localStorage.getItem('spotfix_company_id'),
    session_id: getSessionId(),
});

const wsSpotfix = {
    connect() {
        if ((socket && socket.readyState === WebSocket.OPEN) || !getSessionId()) {
            return;
        }

        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            heartbeatInterval = setInterval(() => {
                if (socket?.readyState === WebSocket.OPEN) {
                    socket.send('heartbeat');
                }
            }, 50 * 1000);
            wsSpotfix.send(buildMessage('SUBSCRIBE'));
        };

        socket.onmessage = (event) => {
            if (event.data === 'heartbeat') {
                return;
            }

            try {
                const data = JSON.parse(event.data);

                switch (data.object) {
                case 'users':
                    spotfixIndexedDB.put(TABLE_USERS, data.data);
                    break;

                case 'tasks':
                    spotfixIndexedDB.put(TABLE_TASKS, {
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
                    spotfixIndexedDB.put(TABLE_COMMENTS, {
                        taskId: data.data.task_id,
                        commentId: data.data.comment_id,
                        userId: data.data.user_id,
                        commentBody: data.data.comment,
                        commentDate: data.data.updated,
                        status: data.data.status,
                        issueTitle: data.data.task_name,
                    });
                    break;

                default:
                    break;
                }
            } catch (e) {
                console.warn('WS non-JSON message:', event.data);
            }
        };

        socket.onclose = (e) => {
            console.warn('WS closed:', e.code, e.reason);

            socket = null;

            if (heartbeatInterval) {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
            }
        };

        socket.onerror = (e) => {
            console.error('WS error:', e);
        };
    },

    send(data) {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket is not connected');
            return;
        }
        socket.send(JSON.stringify(data));
    },

    close() {
        wsSpotfix.unsubscribe();
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
};
