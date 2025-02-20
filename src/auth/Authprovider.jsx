import LoadingPage from "../component/Loader";
import { setup } from "../services/axios";
import useCheckIsAuthorized from "./http/useGetAuthorized";

export function AuthProvider({ children }) {
  setup();

  const { isLoading } = useCheckIsAuthorized();
  if (isLoading) return <LoadingPage />;
  return children;
}
