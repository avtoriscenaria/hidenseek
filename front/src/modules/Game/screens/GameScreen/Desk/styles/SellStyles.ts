import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme, { color }: { color?: string }) => ({
  cell: {
    width: 50,
    height: 50,
    border: "1px solid gainsboro",
  },
  cross: {
    width: "100%",
    height: "100%",
    color,
  },
});

export default styles;
