import colors from "constants/colors";

const styles = () => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontFamily: "NotoSans-Bold",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 12,
  },
  inputFields: {},
  registrationContainer: {
    fontFamily: "NotoSans-Regular",
    fontSize: 13,
  },
  registration: {
    cursor: "pointer",
    color: colors.link,
    "&:hover": {
      color: colors.hoverLink,
      textDecoration: "underline",
    },
  },
});

export default styles;
