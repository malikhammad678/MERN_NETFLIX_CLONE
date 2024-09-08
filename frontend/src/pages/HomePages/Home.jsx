import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/Zustand';

const Home = () => {

  const { user } = useAuthStore();
  return (
    <div className=''>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default Home
