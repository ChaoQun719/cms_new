import { createHashRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";


const router = createHashRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />
  },
])

export default router