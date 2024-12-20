import { Header } from './components/header';
import { Outlet } from 'react-router';
import { useMount } from 'ahooks';
import './App.css';
import { useCloudBase } from './hooks/use-cloud-base';
import { useState } from 'react';
import { Spinner } from '@nextui-org/react';

function App() {
  const { login } = useCloudBase();
  const [isLogin, setIsLogin] = useState(false);

  useMount(async () => {
    await login();
    setIsLogin(true);
  });

  if (!isLogin) {
    return <div className='flex items-center justify-center' style={{ width: '100vw', height: '100vh' }}>
      <Spinner />
    </div>;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
