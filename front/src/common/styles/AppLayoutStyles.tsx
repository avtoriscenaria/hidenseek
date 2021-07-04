import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    padding: 24,
    height: "100%",
  },
});

export default styles;
