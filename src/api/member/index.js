import SSRRequest from "../axios";
import queryString from 'query-string';

export const getMembersRequest = async (params) => {
  const queryParams = queryString.stringify(params)
  const res = await SSRRequest({
      url: `/admin/member/list-member${params ? '?' : ''}${queryParams}`,
      method: 'GET',
  })

  const { data } = res

  return res
} 


