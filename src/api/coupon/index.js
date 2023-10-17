import SSRRequest from "../axios";

export const createCoupon = async (body) => {
  const res = await SSRRequest({
    url: `/admin/coupon/createAndUpdate`,
    method: "POST",
    data: JSON.stringify(body),
  });
  return res.data;
};

export const getListCoupon = async (params) => {
  const res = await SSRRequest({
    url: `/admin/coupon/list`,
    method: "GET",
  });
  return res.data;
};

export const changeStatusCoupon = async (status, couponId) => {
  const res = await SSRRequest({
    url: `/admin/coupon/changeStatus?status=${status}&couponId=${couponId}`,
    method: "GET",
  });
  return res.data;
};
