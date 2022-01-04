import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { setOption } from "redux/reducers/options";

const useLogout = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem(LSData.authData);

    dispatch(setOption({ isAuthorized: false }));
    // logoutSocket();
    history.push(ROUTES.auth.base);
  };

  return {
    logout,
  };
};

export default useLogout;
