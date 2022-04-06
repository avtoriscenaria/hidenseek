import { useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = (styles: (theme: Theme, props?: any) => any, props?: any) =>
  useMemo(
    () => makeStyles((theme: Theme) => createStyles(styles(theme, props))),
    [props, styles]
  )();

export default useStyles;
