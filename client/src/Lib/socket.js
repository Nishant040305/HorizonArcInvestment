import {io} from 'socket.io-client';

const URL = `${import.meta.env.VITE_REACT_APP_WEB}` ;

export const socket = io(URL, {
    autoConnect: false
});

socket.on('connect', () => {
    console.log('Socket connected');
});

socket.on('disconnect', () => {
    console.log('Socket disconnected');
});