import { rootReducer } from '../services/store';
import { initialState as ingredientsInitialState } from '../slices/ingedientsSlice';
import { initialState as burgerConstructorInitialState } from '../slices/burgerConstructorSlice';
import { initialState as feedInitialState } from '../slices/feedSlice';
import { initialState as userInitialState } from '../slices/userSlice';
describe('rootReducer initial test', () => {
  it('return initialState', () => {
    const initialState = rootReducer(undefined, { type: '' });
    expect(initialState).toEqual({
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      feed: feedInitialState,
      user: userInitialState
    });
  });
});
