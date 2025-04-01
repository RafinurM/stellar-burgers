import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

type userState = {
  user: TUser | null;
  isAuth: boolean;
  isAuthCheck: boolean;
  loginError: boolean;
  loginRequest: boolean;
};

const initialState: userState = {
  user: null,
  isAuth: false,
  isAuthCheck: false,
  loginError: false,
  loginRequest: false
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => loginUserApi({ email, password })
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password })
);

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuth = true;
    }
  },
  selectors: {
    userAuthSelector: (state) => state.isAuth,
    userSelector: (state) => state.user,
    userAuthCheck: (state) => state.isAuthCheck
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginRequest = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginRequest = false;
        state.loginError = true;
        state.isAuthCheck = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.loginError = false;
        state.loginRequest = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuth = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthCheck = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthCheck = true;
        state.loginError = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = null;
      });
  }
});

export const { userSelector, userAuthSelector, userAuthCheck } =
  userSlice.selectors;
export default userSlice;
