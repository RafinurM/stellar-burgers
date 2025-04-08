import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getFeedSelector } from '../../slices/feedSlice';
import { getIngredientsSelector } from '../../slices/ingedientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { burgerOrders } from '../../slices/burgerConstructorSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const location = useLocation();
  let ordersData = [];
  location.pathname === `/feed/${number}`
    ? (ordersData = useSelector(getFeedSelector).orders)
    : (ordersData = useSelector(burgerOrders));

  const orderData = ordersData.find((item) => item.number === Number(number));
  const ingredients = useSelector(getIngredientsSelector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
