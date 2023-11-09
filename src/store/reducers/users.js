import { createReducer } from '@reduxjs/toolkit';
import {
  getProfileRequest,
  getSingleUserRequest,
  listRequest,
  loginRequest,
  registerRequest,
} from '../actions/users';
import Account from '../../helpers/Account';

const initialState = {
  status: '',
  errors: {},
  token: Account.getToken() || '',
  profile: Account.get() || {},
  usersList: [],
  usersListData: {},
  usersListStatus: '',
  singleUser: { firstName: '', lastName: '' },
};
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(registerRequest.fulfilled, (state, action) => {
    const { status } = action.payload || '';
    state.status = status || '';
  });
  builder.addCase(registerRequest.rejected, (state, action) => {
    const { errors } = action.payload || {};
    state.errors = errors || {};
  });
  builder.addCase(loginRequest.fulfilled, (state, action) => {
    const { token, user } = action.payload;
    Account.set(user);
    Account.setToken(token);
    state.token = token;
    state.profile = user;
  });
  builder.addCase(listRequest.fulfilled, (state, action) => {
    const { users, ...usersListData } = action.payload;
    state.usersList = users;
    state.usersListData = usersListData;
    state.usersListStatus = 'ok';
  });
  builder.addCase(listRequest.pending, (state) => {
    state.usersListStatus = 'request';
  });
  builder.addCase(listRequest.rejected, (state) => {
    state.usersListStatus = 'fail';
  });
  builder.addCase(getProfileRequest.fulfilled, (state, action) => {
    const { user } = action.payload;
    Account.set(user);
  });
  builder.addCase(getSingleUserRequest.fulfilled, (state, action) => {
    const { user } = action.payload;
    state.singleUser = user;
  });
  builder.addCase(getSingleUserRequest.pending, (state) => {
    state.singleUser = {};
  });
});
export default reducer;
