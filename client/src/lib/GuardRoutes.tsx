import { Outlet, Navigate } from "react-router";


export const GuardRoutes = () => {
  const token = localStorage.getItem("token");
  const auth = { token };


  return (
    auth.token ? <Outlet/> : <Navigate to="/"/>
  )
}
