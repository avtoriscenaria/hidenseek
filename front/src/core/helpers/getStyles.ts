import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const getStyles = (styles: (theme: Theme, props?: any) => any, props?: any) =>
  makeStyles((theme: Theme) => createStyles(styles(theme, props)))();

export default getStyles;
