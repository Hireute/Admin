import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const { token } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  return token ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
