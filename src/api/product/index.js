import SSRRequest from '../axios'
import queryString from 'query-string'

export const createProduct = async body => {
  const res = await SSRRequest({
    url: `/admin/product/create`,
    method: 'POST',
    data: JSON.stringify(body)
  })
  return res.data
}

export const updateProduct = async body => {
  const res = await SSRRequest({
    url: `/admin/product/update`,
    method: 'POST',
    data: JSON.stringify(body)
  })
  return res.data
}

export const getListProduct = async params => {
  const res = await SSRRequest({
    url: `/admin/product/list${params ? params : ''}`,
    method: 'GET'
  })
  return res.data
}

export const actionProduct = async (productCode, type) => {
  const res = await SSRRequest({
    url: `/admin/product/action?productCode=${productCode}&type=${type}`,
    method: 'GET'
  })
  return res.data
}

export const createProductSku = async body => {
  const res = await SSRRequest({
    url: `admin/productSkuPrice/create`,
    method: 'POST',
    data: JSON.stringify(body)
  })
  return res.data
}

export const getListProductSku = async params => {
  const res = await SSRRequest({
    url: `/admin/productSkuPrice/list${params ? params : ''}`,
    method: 'GET'
  })
  return res.data
}

export const productSkuAction = async params => {
  const queryParams = queryString.stringify(params)
  const res = await SSRRequest({
    url: `/admin/productSkuPrice/action${params ? '?' : ''}${queryParams}`,
    method: 'GET'
  })

  return res.data
}

export const updateProductSkuAction = async data => {
  const res = await SSRRequest({
    url: `/admin/productSkuPrice/update`,
    method: 'Post',
    data
  })

  return res.data
}
