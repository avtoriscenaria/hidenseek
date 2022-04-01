import colors from "constants/colors";

const styles = () => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: 700,
    padding: 24,
  },
  title: {
    textAlign: "center",
    fontFamily: "NotoSans-Bold",
    fontSize: 24,
    marginBottom: 24,
  },
  menuActions: {
    display: "flex",
    marginBottom: 24,
  },
  reloadDescription: {
    fontSize: 12,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: colors.description,
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  startGame: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dividerContainer: {
    padding: "0 24px",
  },
});

export default styles;
