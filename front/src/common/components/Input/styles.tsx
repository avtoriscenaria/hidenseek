import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
});

export default styles;
