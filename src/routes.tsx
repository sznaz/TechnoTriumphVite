import React from 'react';
import { Routes, Route } from 'react-router-dom';



import LoginPage from './pages/auth/candidate/Login/Login';


const AppRoutes: React.FC = () => {
    return (
      <Routes>
      
        <Route path="/auth/candidate/login" element={<LoginPage />} />
       
      </Routes>
    );
  };
  
  export default AppRoutes;