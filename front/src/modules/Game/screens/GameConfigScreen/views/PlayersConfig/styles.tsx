const styles = () => ({
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  gameKeyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  gameKeyLabel: {
    fontFamily: "NotoSans-Bold",
    paddingRight: 6,
  },
  gameKey: {
    fontFamily: "NotoSans-Italic",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 6,
  },
  playerColor: {
    width: 70,
    textAlign: "center",
    fontFamily: "NotoSans-Regular",
  },
  nickname: {
    flex: 1,
    fontFamily: "NotoSans-Regular",
  },
  hunter: {
    width: 70,
    textAlign: "center",
    fontFamily: "NotoSans-Regular",
  },
});

export default styles;
