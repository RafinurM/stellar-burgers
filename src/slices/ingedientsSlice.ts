import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TInitialState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | undefined;
};

const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: ''
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientLoadStatus: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsSelector, getIngredientLoadStatus } =
  ingredientsSlice.selectors;
export default ingredientsSlice;

export const selectBuns = createSelector(
  [getIngredientsSelector],
  (ingredients: TIngredient[]) =>
    ingredients.filter((ing) => ing.type === 'bun')
);
export const selectMains = createSelector(
  [getIngredientsSelector],
  (ingredients: TIngredient[]) =>
    ingredients.filter((ing) => ing.type === 'main')
);
export const selectSauces = createSelector(
  [getIngredientsSelector],
  (ingredients: TIngredient[]) =>
    ingredients.filter((ing) => ing.type === 'sauce')
);
