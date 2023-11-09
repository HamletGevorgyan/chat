import { createReducer } from '@reduxjs/toolkit';
import { getMessagesList, sendMessage } from '../actions/messages';

const initialState = {
  messagesList: [],
  messagesListData: {},
  messagesListStatus: '',
};
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(sendMessage.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.messagesList.push(message);
    })
    .addCase(getMessagesList.fulfilled, (state, action) => {
      const { messages, ...messagesListData } = action.payload;
      state.messagesListData = messagesListData;
      state.messagesList.push(...messages);
      state.messagesListStatus = 'ok';
    })
    .addCase(getMessagesList.pending, (state, action) => {
      state.messagesListStatus = 'request';
      const { page = 1 } = action.meta.arg;
      if (page === 1) {
        state.messagesList = [];
      }
    })
    .addCase(getMessagesList.rejected, (state, action) => {
      state.messagesListStatus = 'error';
    });
});
export default reducer;
