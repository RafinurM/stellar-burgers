import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  burgerIngredients
} from '../../slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const { v4: uuidv4 } = require('uuid');
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredients = useSelector(burgerIngredients);
    const handleAdd = () => {
      if (ingredients.length >= 5) {
        return;
      }
      dispatch(addIngredient({ ...ingredient, id: uuidv4() }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
