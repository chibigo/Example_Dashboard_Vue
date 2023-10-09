import SSRRequest from "../axios";

export const loginRequest = async data => {
  const res = await SSRRequest({
      url: '/auth/admin/login',
      method: 'POST',
      data
  })

  return res
} 

