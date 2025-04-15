import { Navigate } from "react-router-dom";
import useCheckIsAuthorized from "../../services/useCheckAuthorized";
import Loader from "./Loader";



const AuthGuard = ( {children} ) => {

const {isLoading} = useCheckIsAuthorized()


console.log(isLoading)

if(isLoading){
    return <Loader/>
}


  return <>{children}</>;
};

export default AuthGuard;
