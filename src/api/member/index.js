import SSRRequest from '../axios'
import queryString from 'query-string'

export const getMembersRequest = async params => {
  const queryParams = queryString.stringify(params)
  const res = await SSRRequest({
    url: `/admin/member/list-member${params ? '?' : ''}${queryParams}`,
    method: 'GET'
  })

  const { data } = res

  return res
}

export const blockDeleteMembersRequest = async params => {
  const queryParams = queryString.stringify(params)
  const res = await SSRRequest({
    url: `/admin/member/action${params ? '?' : ''}${queryParams}`,
    method: 'GET'
  })

  return res
}

export const createMember = async data => {
  const res = await SSRRequest({
    url: '/admin/member/create',
    method: 'POST',
    data
  })

  return res.data
}
