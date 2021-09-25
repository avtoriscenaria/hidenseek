const styles = () => ({
  container: {
    display: "flex",
    marginBottom: 16,
  },
  leftWrapper: {
    width: 520,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  timerContainer: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
  step: {
    width: 42,
    height: 30,
    border: "1px solid grey",
    backgroundColor: "lightgray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,

    marginLeft: 12,
  },
});

export default styles;
