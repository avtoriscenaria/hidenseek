const styles = () => ({
  header: {
    display: "flex",
    marginBottom: 16,
  },
  timerContainer: {
    width: 520,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    display: "flex",

    "& > div:nth-child(2)": {
      marginLeft: 24,
    },
  },
});

export default styles;
