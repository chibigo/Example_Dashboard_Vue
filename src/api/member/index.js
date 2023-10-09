import SSRRequest from "../axios";
import queryString from 'query-string';

export const getMembersRequest = async (params) => {
  const data = queryString.stringify(params)
  const res = await SSRRequest({
      url: `/admin/member/list-member${params ? '?' : ''}${data}`,
      method: 'GET',
  })

  return res
} 


