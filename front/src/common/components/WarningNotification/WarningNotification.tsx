import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";

import { getWarningMessage } from "common/selectors";
import { useAppSelector } from "redux/hooks";
import { setOption } from "redux/reducers";

const Consumer = ({ children }: { children: any }) => {
  const warningMessage = useAppSelector(getWarningMessage);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    if (warningMessage) {
      enqueueSnackbar(warningMessage, { variant: "warning" });
      dispatch(setOption({ warningMessage: null }));
    }
  }, [warningMessage, dispatch, enqueueSnackbar]);

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
