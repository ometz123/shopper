import { FC, memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Index: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default memo(Index);
