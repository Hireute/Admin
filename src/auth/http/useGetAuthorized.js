import { useQuery } from '@tanstack/react-query';



import axiosInstance from '../../services/axios';
import { authendpoints } from '../../services/apis';
import { setIsAuthorized, setToken, updateUser } from '../../store/userSlice/userSlice';
import { useDispatch } from 'react-redux';


async function getUser() {
  const { data } = await axiosInstance.get(authendpoints.IS_AUTORIZED);

  return data;
}

const useCheckIsAuthorized = () => {
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await getUser();
      dispatch(updateUser(res.admin));
      dispatch(setIsAuthorized(true));

      return res;
    } catch (error) {
      dispatch(setIsAuthorized(false));
      dispatch(setToken(''))
      return error;
    }
  };
  return useQuery({
    queryKey: [authendpoints.IS_AUTORIZED],
    queryFn: fetchUser,
    enabled: true,
  });
};
export default useCheckIsAuthorized;