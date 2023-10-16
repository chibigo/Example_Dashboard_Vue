import moment from "moment";

export const convertMoney = (money) => {
  return parseInt(money ?? 0).toLocaleString("en");
};

export const formatDate = (dateString) => {
  return moment(new Date(dateString)).format("L");
};

export const formatDateV2 = (dateString) => {
  return moment(new Date(dateString)).format("YYYY-MM-DD");
};
