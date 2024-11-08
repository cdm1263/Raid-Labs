export const calculateRate = (wins: number, losses: number) => {
  return Math.round((wins / (wins + losses)) * 1000) / 10;
};
