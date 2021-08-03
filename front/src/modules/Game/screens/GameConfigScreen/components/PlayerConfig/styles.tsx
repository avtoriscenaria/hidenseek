const styles = () => ({
  container: {
    margin: "3px 0",
    "&:last-child": {
      marginBottom: 12,
    },
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  playerColor: {
    width: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > .color": {
      width: 24,
      height: 24,
      borderRadius: 4,
    },
  },
  nickname: {
    flex: 1,
    fontFamily: "NotoSans-Regular",
  },
  hunter: {
    width: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
