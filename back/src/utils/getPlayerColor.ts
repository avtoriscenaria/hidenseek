import { COLORS } from 'src/constants/index';

const getPlayerColor = (colors = []) => {
  const index = getRandom(0, 5);
  const playerColor = COLORS[index];

  if (colors.some((color) => color === playerColor)) {
    return getPlayerColor(colors);
  } else {
    return playerColor;
  }
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export default getPlayerColor;
