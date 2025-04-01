import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink, Outlet } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <>
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to={`/`}>
            {({ isActive }) => (
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
            )}
          </NavLink>
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>

          <NavLink to={`/feed`}>
            {({ isActive }) => (
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
            )}
          </NavLink>
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink to={`/profile`}>
            {({ isActive }) => (
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            )}
          </NavLink>
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </nav>
    </header>
    <Outlet />
  </>
);
