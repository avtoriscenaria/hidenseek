const getPlayerStartPlace = (positions = []) => {
  const x = getRandom(1, 10);
  const y = getRandom(1, 10);

  if (positions.some((position) => position?.x === x && position?.y === y)) {
    return getPlayerStartPlace(positions);
  } else {
    return { x, y };
  }
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export default getPlayerStartPlace;
