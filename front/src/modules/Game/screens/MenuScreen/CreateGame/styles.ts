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
  createButton: {
    marginBottom: 16,
  },
  createDescription: {
    color: colors.description,
    fontSize: 11,
    whiteSpace: "break-spaces",
  },
});

export default styles;
