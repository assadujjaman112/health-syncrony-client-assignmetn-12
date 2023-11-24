import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

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
  ]);