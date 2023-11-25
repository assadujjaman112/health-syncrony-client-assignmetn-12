import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }
  if(user){
    return children;
  }
  return <Navigate state={location?.state} to="/login"></Navigate> ;
};

export default PrivateRoute;
