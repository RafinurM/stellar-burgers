import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userSlice, {
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userState
} from '../slices/userSlice';
import { TAuthResponse, TLoginData, TRegisterData, TUserResponse } from '@api';

describe('userSlice tests', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        userState: userSlice.reducer
      },
      preloadedState: { userState: initialState }
    });
  });

  const user = {
    email: 'test@test.ru',
    name: 'tester'
  };

  const userResponce: TUserResponse = {
    success: true,
    user: {
      email: 'test@test.ru',
      name: 'tester'
    }
  };

  const authResponce: TAuthResponse = {
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    user: {
      email: 'test@test.ru',
      name: 'tester'
    },
    success: true
  };

  const logindata: TLoginData = { email: 'test@test.ru', password: 'test' };
  const registerData: TRegisterData = {
    email: 'test@test.ru',
    name: 'tester',
    password: 'test'
  };

  it('getUser pending test', () => {
    store.dispatch(getUser.pending('pending'));
    const newState: userState = store.getState().userState;
    expect(newState.user).toBe(null);
  });
  it('getUser fulfilled test', () => {
    store.dispatch(getUser.fulfilled(userResponce, 'fulfilled'));
    const newState: userState = store.getState().userState;
    expect(newState.isAuthCheck).toBe(true);
    expect(newState.loginError).toBe('');
    expect(newState.user).toEqual({
      email: 'test@test.ru',
      name: 'tester'
    });
  });
  it('getUser reject test', () => {
    store.dispatch(getUser.rejected(new Error('Error'), 'Error'));
    const newState: userState = store.getState().userState;
    expect(newState.isAuthCheck).toBe(true);
    expect(newState.loginError).toBe('Error');
  });
  it('loginUser pending test', () => {
    store.dispatch(loginUser.pending('pending', logindata));
    const newState: userState = store.getState().userState;
    expect(newState.loginRequest).toBe(true);
    expect(newState.loginError).toBe('');
  });
  it('loginUser fulfilled test', () => {
    store.dispatch(loginUser.fulfilled(authResponce, 'fulfilled', logindata));
    const newState: userState = store.getState().userState;
    expect(newState.isAuth).toBe(true);
    expect(newState.loginRequest).toBe(false);
    expect(newState.user).toEqual(user);
  });
  it('loginUser reject test', () => {
    store.dispatch(loginUser.rejected(new Error('Error'), 'Error', logindata));
    const newState: userState = store.getState().userState;
    expect(newState.loginRequest).toBe(false);
    expect(newState.loginError).toBe('Error');
  });
  it('register pending test', () => {
    store.dispatch(registerUser.pending('register', registerData));
    const newState: userState = store.getState().userState;
    expect(newState.isAuth).toBe(false);
    expect(newState.loginError).toBe('');
  });
  it('register fulfilled test', () => {
    store.dispatch(
      registerUser.fulfilled(authResponce, 'fulfilled', registerData)
    );
    const newState: userState = store.getState().userState;
    expect(newState.isAuth).toBe(true);
  });
  it('register reject test', () => {
    store.dispatch(
      registerUser.rejected(new Error('Error'), 'Error', registerData)
    );
    const newState: userState = store.getState().userState;
    expect(newState.isAuth).toBe(false);
    expect(newState.loginError).toBe('Error');
  });
  it('logout fulfilled test', () => {
    store.dispatch(logoutUser.fulfilled({ success: true }, 'fulfilled'));
    const newState: userState = store.getState().userState;
    expect(newState.isAuth).toBe(false);
    expect(newState.user).toBe(null);
  });
  it('update fulfilled test', () => {
    const fn = (): void => {};
    store.dispatch(updateUser.fulfilled(fn(), 'fulfilled', registerData));
    const newState: userState = store.getState().userState;
    expect(newState.user).toEqual(registerData);
  });
});
