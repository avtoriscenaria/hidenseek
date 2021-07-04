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
    marginBottom: 20,
  },
  password: {
    marginBottom: 24,
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
