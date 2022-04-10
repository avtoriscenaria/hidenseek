import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";

import { getMessage } from "common/selectors";
import { useAppSelector } from "redux/hooks";
import { setOption } from "redux/reducers";

const Consumer = ({ children }: { children: any }) => {
  const message = useAppSelector(getMessage);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const { text, type } = message;
      enqueueSnackbar(text, { variant: type });
      dispatch(setOption({ message: null }));
    }
  }, [message, dispatch, enqueueSnackbar]);

  return <>{children}</>;
};

const WarningNotification = ({ children }: { children: any }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Consumer>{children}</Consumer>
    </SnackbarProvider>
  );
};

export default WarningNotification;
