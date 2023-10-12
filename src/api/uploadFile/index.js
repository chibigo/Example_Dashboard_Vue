import SSRRequest from "../axios";

export const updateImage = async (formData) => {
  const res = await SSRRequest({
    url: `/upload/image`,
    method: "POST",
    formData,
  });
  const { data } = res;
  return res;
};
