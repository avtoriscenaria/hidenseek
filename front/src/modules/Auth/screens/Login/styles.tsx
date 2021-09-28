import colors from "constants/colors";

const styles = () => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 360,
    padding: 24,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontFamily: "NotoSans-Bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  inputFields: {},
  nickname: {
    marginBottom: 20,
  },
  password: {
    marginBottom: 6,
  },
  error: {
    minHeight: 14,
    marginBottom: 14,
    fontFamily: "NotoSans-Regular",
    fontSize: 11,
    color: colors.error,
  },
  login: {
    marginBottom: 12,
  },
  registrationContainer: {
    fontFamily: "NotoSans-Regular",
    fontSize: 13,
    textAlign: "center",
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
