import { getOrdersApi, orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type burgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
};

export const initialState: burgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orders: []
};

export const createOrder = createAsyncThunk(
  'burger/createOrder',
  async (order: string[]) => orderBurgerApi(order)
);

export const getOrders = createAsyncThunk('burger/getOrders', getOrdersApi);

const { v4: uuid4 } = require('uuid');

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.constructorItems.bun = action.payload;
            break;
          default:
            state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      swap(
        state.constructorItems.ingredients,
        action.payload,
        action.payload + 1
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      swap(
        state.constructorItems.ingredients,
        action.payload,
        action.payload - 1
      );
    },
    closeModal: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    burgerConstructorItems: (state) => state.constructorItems,
    burgerIngredients: (state) => state.constructorItems.ingredients,
    burgerOrders: (state) => state.orders,
    burgerOrderRequest: (state) => state.orderRequest,
    burgerOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.orders.push(action.payload.order);
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const {
  burgerConstructorItems,
  burgerIngredients,
  burgerOrders,
  burgerOrderRequest,
  burgerOrderModalData
} = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  closeModal
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice;

function swap(arr: TIngredient[], a: number, b: number) {
  arr[a] = arr.splice(b, 1, arr[a])[0];
}
