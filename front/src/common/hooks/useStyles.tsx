import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = (styles: (theme: Theme) => any) =>
  makeStyles((theme: Theme) => createStyles(styles(theme)))();

export default useStyles;
