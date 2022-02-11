import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { IAuth } from '../../types';
import { login } from '../../services';

export const initialState: IAuth = {
  loading: false,
  isAuthorized: false,
  access_token: null,
  refresh_token: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    startLogin(state) {
      state.loading = true;
    },

    hasErrorLogin(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loginSuccess(state, action) {
      const { access_token, refresh_token } = action.payload;
      state.loading = false;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAuthorized = true;
    },
  },
});
 
export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;

export function loginUser(credentials: FormData) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(authSlice.actions.startLogin());
    try {
      const data = await login(credentials);
      dispatch(
        authSlice.actions.loginSuccess({
          data,
        })
      );
    } catch (error) {
      dispatch(authSlice.actions.hasErrorLogin(error));
    }
  };
}
