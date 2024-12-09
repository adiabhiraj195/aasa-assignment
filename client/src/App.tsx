import './App.css';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Register from './pages/register/register.page';
import Login from './pages/login/login.page';
import Dashboard from './pages/dashboard';

const App: FC = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/register' Component={Register} />
        <Route path='/' Component={Login} />
        <Route path='/dashboard' Component={Dashboard} />
      </Routes>
    </div>
  );
}

export default App;
