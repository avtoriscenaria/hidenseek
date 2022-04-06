import { Theme } from "@material-ui/core";

import colors from "constants/colors";

interface IStyles {
  isHunter: boolean;
  isCaught: boolean;
  isMyGamePlayer: boolean;
}

const styles = (
  theme: Theme,
  { isHunter, isCaught, isMyGamePlayer }: IStyles
) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 12,
    opacity: !isHunter && isCaught ? 0.1 : 1,
  },
  playerColor: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  nickname: {
    paddingLeft: 8,
    width: 120,
    color: isHunter ? colors.error : isMyGamePlayer ? colors.success : "",

    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  status: {
    paddingLeft: 8,
    color: isHunter ? colors.error : "",
  },
  leave: {
    paddingLeft: 8,
    color: "grey",
  },
});

export default styles;
