import useCheckIsAuthorized from "../../services/useCheckAuthorized";

import Loader from "./Loader";



export function AuthProvider( {children} ) {
  const { isLoading } = useCheckIsAuthorized();

  if (isLoading) return <Loader />;

  return children;
}
