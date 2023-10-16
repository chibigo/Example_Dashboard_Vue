import SSRRequest from "../axios";

export const createProduct = async (body) => {
  const res = await SSRRequest({
    url: `/admin/product/create`,
    method: "POST",
    data: JSON.stringify(body),
  });
  return res.data;
};

export const updateProduct = async (body) => {
  const res = await SSRRequest({
    url: `/admin/product/update`,
    method: "POST",
    data: JSON.stringify(body),
  });
  return res.data;
};

export const getListProduct = async (params) => {
  const res = await SSRRequest({
    url: `/admin/product/list${params ? params : ""}`,
    method: "GET",
  });
  return res.data;
};

export const actionProduct = async (productCode, type) => {
  const res = await SSRRequest({
    url: `/admin/product/action?productCode=${productCode}&type=${type}`,
    method: "GET",
  });
  return res.data;
};

export const createProductSku = async (body) => {
  const res = await SSRRequest({
    url: `admin/productSkuPrice/create`,
    method: "POST",
    data: JSON.stringify(body),
  });
  return res.data;
};
