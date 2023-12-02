import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layouts/Dashboard";
import UserProfile from "../Pages/User/UserProfile";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../Components/UpdateProfile/UpdateProfile";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AddATest from "../Pages/AddATest/AddATest";
import AllTests from "../Pages/AllTests/AllTests";
import UpdateItem from "../Components/UpdateItem/UpdateItem";
import AddBanner from "../Pages/AddBanner/AddBanner";
import AllBanners from "../Pages/AllBanners/AllBanners";
import Tests from "../Pages/Tests/Tests";
import TestDetails from "../Components/Test/TestDetails";
import Payment from "../Components/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader : ()=> fetch('http://localhost:5000/banners')
      },
      {
        path : "/tests/:id",
        element : <TestDetails></TestDetails>,
        loader : ({params})=> fetch(`http://localhost:5000/tests/${params.id}`)
      },
      {
        path : "/allTests",
        element : <Tests></Tests>
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path : "allUsers",
        element : <AllUsers></AllUsers>
      },
      {
        path : "addTest",
        element : <AddATest></AddATest>
      },
      {
        path : "allTests",
        element : <AllTests></AllTests>
      },
      {
        path : 'updateTest/:id',
        element : <UpdateItem></UpdateItem>,
        loader : ({params}) => fetch(`http://localhost:5000/tests/${params.id}`)
      },
      {
        path : "AddBanner",
        element : <AddBanner></AddBanner>
      },
      {
        path : "allBanner",
        element : <AllBanners></AllBanners>
      },


      // User Routes
      {
        path: "userProfile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProfile/:email",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },{
        path : "payment",
        element : <Payment></Payment>
      }
    ],
  },
]);
