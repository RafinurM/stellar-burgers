import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { burgerOrders, getOrders } from '../../slices/burgerConstructorSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orders = useSelector(burgerOrders);
  return <ProfileOrdersUI orders={orders} />;
};
