import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../slices/userSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .catch((error) => error);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
