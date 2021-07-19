import colors from "constants/colors";

const styles = () => ({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 320,
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
    marginBottom: 6,
  },
  nicknameError: {
    marginBottom: 16,
    fontFamily: "NotoSans-Regular",
    fontSize: 11,
    color: colors.error,
    whiteSpace: "break-spaces",
  },
  password: {
    marginBottom: 20,
  },
  confirmPassword: {
    marginBottom: 24,
  },
  signUp: {
    marginBottom: 12,
  },
  loginContainer: {
    fontFamily: "NotoSans-Regular",
    fontSize: 13,
    textAlign: "center",
  },
  login: {
    cursor: "pointer",
    color: colors.link,
    "&:hover": {
      color: colors.hoverLink,
      textDecoration: "underline",
    },
  },
});

export default styles;
