let socket = null;
let heartbeatInterval = null;

const WS_URL = 'wss://ws.doboard.com';

const wsSpotfix = {
    connect() {
        if ((socket && socket.readyState === WebSocket.OPEN) || !localStorage.getItem('spotfix_session_id')) {
            return;
        }

        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            console.log('WebSocket connected');

            heartbeatInterval = setInterval(() => {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    wsSpotfix.send({ type: 'PING', payload: Date.now() });
                }
            }, 30000);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('From server:', data);

                switch (data.type) {
                case 'user':
                    spotfixIndexedDB.put(TABLE_USERS, data.payload);
                    break;
                case 'task':
                    spotfixIndexedDB.put(TABLE_TASKS, data.payload);
                    break;
                case 'comment':
                    spotfixIndexedDB.put(TABLE_COMMENTS, data.payload);
                    break;
                case 'PONG':
                    console.log('Heartbeat OK');
                    break;

                default:
                    console.log('Неизвестный тип сообщения:', data);
                }
            } catch (err) {
                console.warn('Err:', event.data);
            }
        };

        socket.onerror = (error) => console.error('WebSocket error:', error);

        socket.onclose = () => {
            console.log('WebSocket closed');
            socket = null;

            if (heartbeatInterval) {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
            }

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
        if (!socket) return;
        socket.close();
        socket = null;

        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
        }
    },
};

window.addEventListener('pagehide', () => {
    wsSpotfix.close();
});

