import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorItems,
  burgerOrderModalData,
  burgerOrderRequest,
  burgerIngredients,
  createOrder
} from '../../slices/burgerConstructorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { userSelector } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(burgerConstructorItems);
  const orderRequest = useSelector(burgerOrderRequest);
  const orderModalData = useSelector(burgerOrderModalData);
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(burgerIngredients);
  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const orderList = ingredients.map((item) => item._id);
    dispatch(createOrder(orderList));
  };
  const closeOrderModal = () => {
    console.log(111);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
