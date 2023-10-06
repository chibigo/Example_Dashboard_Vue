export const convertMoney = (money) => {
  return parseInt(money ?? 0).toLocaleString("en");
};