import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const registerRequest = createAsyncThunk('users/registerRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.register(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const loginRequest = createAsyncThunk('users/loginRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.login(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const listRequest = createAsyncThunk('users/listRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.usersList(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getSingleUserRequest = createAsyncThunk('users/getSingleUserRequest', async (payload, thunkAPI) => {
  try {
    const { userId, ...params } = payload;
    const { data } = await Api.getSingleUser(userId, params);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const getProfileRequest = createAsyncThunk('users/getProfileRequest', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getProfile(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
