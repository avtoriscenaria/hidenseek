import { Theme } from "@material-ui/core";
import colors from "constants/colors";

interface IStyles {
  won?: boolean;
}

const styles = (theme: Theme, { won }: IStyles) => ({
  container: {
    width: "max-content",
    position: "relative",
  },
  caughtBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  caughtBackdropLabel: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    color: won ? colors.success : colors.error,
  },
  backdrop: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.8,
  },
  deskLine: {
    display: "flex",
  },
});

export default styles;
