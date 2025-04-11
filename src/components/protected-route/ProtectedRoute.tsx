import { useSelector } from '../../services/store';
import { userAuthCheck, userSelector } from '../../slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const isAuthCheck = useSelector(userAuthCheck);
  const user = useSelector(userSelector);
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
