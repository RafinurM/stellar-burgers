import burgerConstructorSlice, {
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../slices/burgerConstructorSlice';
import { TIngredient } from '../utils/types';

describe('burgerConstructorSlice', () => {
  const bun: TIngredient = {
    _id: '1',
    name: 'Тесто',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const main: TIngredient = {
    _id: '2',
    name: 'Большая котлета',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const sause: TIngredient = {
    _id: '3',
    name: 'Савус',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  };

  it('should handle adding a bun ingredient', () => {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients).toHaveLength(0);
  });

  it('should handle adding a main ingredient', () => {
    const stateWithBun = {
      ...initialState,
      constructorItems: {
        bun: { ...bun, id: expect.any(String) },
        ingredients: []
      }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithBun,
      addIngredient(main)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual(
      expect.objectContaining({ _id: '2' })
    );
  });

  it('should handle removing an ingredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: { ...bun, id: expect.any(String) },
        ingredients: [{ ...main, id: '2' }]
      }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      removeIngredient('2')
    );

    expect(newState.constructorItems.ingredients).toHaveLength(0);
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  it('should handle moving an ingredient down', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: { ...bun, id: expect.any(String) },
        ingredients: [
          { ...main, id: expect.any(String) },
          { ...sause, id: expect.any(String) }
        ]
      }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sause,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });

  it('should handle moving an ingredient up', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: { ...bun, id: expect.any(String) },
        ingredients: [
          { ...main, id: expect.any(String) },
          { ...sause, id: expect.any(String) }
        ]
      }
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...sause,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });
});
