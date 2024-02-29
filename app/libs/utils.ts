export const generatePagination = (currentPage: number, totalPages: number) => {
  let min = Math.floor(currentPage / 5);
  if (currentPage % 5 == 0) {
    min -= 1;
  }

  return Array.from(
    { length: Math.min(5, 5 - (5 * (min + 1) - totalPages)) },
    (_, i) => {
      return 5 * min + i + 1;
    }
  );
};
