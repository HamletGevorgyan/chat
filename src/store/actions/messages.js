import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const sendMessage = createAsyncThunk('messages/sendMessage', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.sendMessage(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getMessagesList = createAsyncThunk('messages/getMessagesList', async (payload, thunkAPI) => {
  try {
    const { friendId, ...params } = payload;
    const { data } = await Api.getMessagesList(friendId, params);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
