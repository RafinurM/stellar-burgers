import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type burgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
};

const initialState: burgerConstructorState = {
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

export const getOrders = createAsyncThunk('burger/getOrders', async () =>
  getOrdersApi()
);

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      switch (action.payload.type) {
        case 'bun':
          state.constructorItems.bun = action.payload;
          // state.orders.push(action.payload);
          break;
        default:
          state.constructorItems.ingredients.push(action.payload);
        // state.orders.push(action.payload._id);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
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
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
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
export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice;
