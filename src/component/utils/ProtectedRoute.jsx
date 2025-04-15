
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  
  const isAuthorized = useSelector(state => state.user.isAuthorized)

 console.log("hellloProteced" , isAuthorized)

  return isAuthorized ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
