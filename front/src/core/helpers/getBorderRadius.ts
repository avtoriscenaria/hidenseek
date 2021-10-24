const getBorderRadius = (
  i: number,
  rowSize: number,
  j: number,
  columnSize: number
) =>
  `${i === 0 && j === 0 ? 4 : 0}px ${i === rowSize && j === 0 ? 4 : 0}px ${
    i === rowSize && j === columnSize ? 4 : 0
  }px ${i === 0 && j === columnSize ? 4 : 0}px`;

export default getBorderRadius;
