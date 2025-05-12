import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import ingredientsSlice, {
  getIngredients,
  initialState
} from '../slices/ingedientsSlice';
import { TIngredient } from '@utils-types';

describe('tests for ingredientSlice', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: { ingredients: initialState }
    });
  });
  const ingredient: TIngredient = {
    _id: 'test_id_bun',
    name: 'Мощная булка',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  it('pending state test', () => {
    store.dispatch(getIngredients.pending('pending'));
    const state = store.getState().ingredients;
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBe('');
  });
  it('fulfilled state test', () => {
    store.dispatch(
      getIngredients.fulfilled(
        [...initialState.ingredients, ingredient],
        'fulfilled'
      )
    );
    const state = store.getState().ingredients;
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toHaveLength(1);
    expect(state.error).toBe('');
  });
  it('reject state test', () => {
    store.dispatch(getIngredients.rejected(new Error('Error'), 'Ошибка'));
    const state = store.getState().ingredients;
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toHaveLength(0);
    expect(state.error).toBe('Error');
  });
});
