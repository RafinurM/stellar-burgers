import { useDispatch, useSelector } from '../../services/store';
import {
  userAuthCheck,
  userAuthSelector,
  userSelector
} from '../../slices/userSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const isAuth = useSelector(userAuthSelector);
  const isAuthCheck = useSelector(userAuthCheck);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthCheck) {
    return <Preloader />;
  }

  if (!user && !isPublic) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/profile' };
    return <Navigate to={from} />;
  }

  return children;
};
