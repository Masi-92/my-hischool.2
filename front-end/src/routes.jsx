import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import store from './store/store';
import { Roles } from "./store/slice/auth.slice";
import  Login  from './pages/login/login';

const AppRoutes = () => {

    const {isAuthenticated,role}=useSelector((store)=> store.auth)

    function getPanelAddress() {
        switch (role) {
          case Roles.MANAGER:
            return "/manager";
          case Roles.TEACHER:
            return "/teacher";
          case Roles.PARENT:
            return "/parent";
          case Roles.SUPER_ADMIN:
            return "/admin";
          default:
            return "/";
        }
      }


  return (
   <Routes>
  <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={getPanelAddress()} /> : <Login />}
      />


   </Routes>
  )
}

export default AppRoutes;