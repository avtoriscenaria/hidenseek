const styles = () => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "flex-end",
  },
  pannel: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    padding: 8,
    userSelect: "none",
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    userSelect: "none",
    cursor: "pointer",
    width: "max-content",
  },
  notAuthorizedTitle: {
    userSelect: "none",
    width: "max-content",
  },
});

export default styles;
