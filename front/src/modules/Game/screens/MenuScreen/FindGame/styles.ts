import colors from "constants/colors";

const styles = () => ({
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: "NotoSans-Bold",
    fontSize: 18,
    marginBottom: 18,
  },
  findButton: {
    marginBottom: 16,
  },
  findByKeyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  findByKeyLabel: {
    fontFamily: "NotoSans-Regular",
    fontSize: 13,
    color: colors.link,
    cursor: "pointer",
    userSelect: "none",
    marginBottom: 8,
  },
  keyInput: {
    visibility: "hidden",
  },
});

export default styles;
