import { io } from 'socket.io-client';

const { REACT_APP_REQUEST_URL } = process.env;
let socket;
export const socketInit = (token) => () => {
  if (socket) {
    return;
  }
  socket = io(REACT_APP_REQUEST_URL, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const socketDisconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  return {
    type: '',

  };
};
