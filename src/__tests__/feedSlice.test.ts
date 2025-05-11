import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import feedSlice, { getFeed, initialState } from '../slices/feedSlice';
import { TFeedsResponse } from '@api';
import { TOrdersData } from '@utils-types';

describe('feedSlice tests', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        feedState: feedSlice.reducer
      },
      preloadedState: { feedState: initialState }
    });
  });
  const order = {
    _id: 'test',
    status: 'done',
    name: 'testOrder',
    createdAt: '2025',
    updatedAt: '2025',
    number: 1,
    ingredients: ['Булка']
  }
  const feedResponce: TFeedsResponse = {
    orders: [order],
    total: 1,
    totalToday: 1,
    success: true
  };
  it('getFeed fulfiled test', () => {
    store.dispatch(getFeed.fulfilled(feedResponce, 'fulfilled'));
    const newState: TOrdersData = store.getState().feedState;
    expect(newState.orders).toContain(order);
    expect(newState.total).toBe(1);
    expect(newState.totalToday).toBe(1);
  });
});
