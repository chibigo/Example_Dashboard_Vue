import SSRRequest from '../axios'

export const createProduct = async body => {
  const res = await SSRRequest({
    url: `/admin/product/create`,
    method: 'POST',
    data: JSON.stringify(body)
  })
  const { data } = res
  return res.data
}

export const getListProduct = async () => {
  const res = await SSRRequest({
    url: `/admin/product/list`,
    method: 'GET'
  })
  const { data } = res
  return res
}
