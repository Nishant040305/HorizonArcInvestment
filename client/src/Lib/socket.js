import { io } from 'socket.io-client';

const URL = `${import.meta.env.VITE_REACT_APP_WEB}`;
// const max_socket_reconnects = 200;
export const socket = io(URL, {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
});

// socket.on("reconnecting", function(delay, attempt) {
//     if (attempt === max_socket_reconnects) {
//       setTimeout(function(){ socket.socket.reconnect(); }, 5000);
//       return console.log("Failed to reconnect. Lets try that again in 5 seconds.");
//     }
//   });
  
// Listen for heartbeat messages
socket.on('heartbeat', (data) => {
    console.log('Heartbeat received:', data.message);
    // Respond to the heartbeat
    socket.emit('heartbeat', { message: 'ping' });
});

// Handle reconnections
socket.on('connect', () => {
    console.log('Reconnected to the server');
});

// Handle disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
