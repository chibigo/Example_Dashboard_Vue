import SSRRequest from "../axios";

export const getListCategoryApi = async () => {
    const res = await SSRRequest({
        url: '/admin/category/list',
        method: 'GET'
    })
    return res
}

export const blockDeleteCategoryRequest = async params => {
    const queryParams = queryString.stringify(params)
    const res = await SSRRequest({
        url: `/admin/category/action${params ? '?' : ''}${queryParams}`,
        method: 'GET'
    })

    return res
}

export const createCategory = async data => {
    const res = await SSRRequest({
        url: '/admin/category/create',
        method: 'POST',
        data
    })

    return res.data
}
