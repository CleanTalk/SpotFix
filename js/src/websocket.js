let socket = null;

const WS_URL = 'ws://localhost:8080';

export const ws = {
    connect() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            // WebSocket already connected
            return;
        }

        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            // WebSocket connected
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('From server:', data);

                // теперь реагируем на разные типы сообщений
                switch (data.type) {
                case 'NEW_COMMENT':
                    // пришёл новый комментарий
                    console.log('Новый комментарий:', data.payload);
                    // тут можно обновить список комментариев на странице
                    break;

                case 'NOTIFICATION':
                    // пришло уведомление
                    console.log('Нотификация:', data.payload);
                    break;

                default:
                    console.log('Неизвестный тип сообщения:', data);
                }
            } catch (err) {
                console.warn('Не JSON от сервера:', event.data);
            }
        };


        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
            socket = null;
        };
    },

    send(data) {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket is not connected');
            return;
        }
        // data: {
        //     type: 'PING',
        //     payload: Date.now()
        // }
        socket.send(JSON.stringify(data));
    },

    close() {
        if (!socket) return;

        socket.close();
        socket = null;
    },
};

// window.addEventListener('pagehide', () => {
//     ws.close();
// });
