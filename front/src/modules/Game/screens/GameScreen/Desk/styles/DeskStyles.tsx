import colors from "constants/colors";

const styles = () => ({
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
    color: colors.error,
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
