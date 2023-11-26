import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layouts/Dashboard";
import UserProfile from "../Pages/User/UserProfile";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children : [
        {
            path : "/",
            element : <Home></Home>
        },
        {
            path : "/about",
            element : <About></About>
        },
        {
            path : "/signUp",
            element : <SignUp></SignUp>
        },
        {
            path : "/login",
            element : <Login></Login>
        }
      ]
    },
    {
      path : "/dashboard",
      element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children  : [
        {
          path:"userProfile",
          element : <UserProfile></UserProfile>
        }
      ]
    }
  ]);