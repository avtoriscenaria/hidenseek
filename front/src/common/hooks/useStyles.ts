import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useMemo } from "react";

const useStyles = (styles: (theme: Theme, props?: any) => any, props?: any) =>
  useMemo(
    () => makeStyles((theme: Theme) => createStyles(styles(theme, props))),
    [props, styles]
  )();

export default useStyles;
