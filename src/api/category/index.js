import SSRRequest from "../axios";

export const getListCategoryApi = async () => {
    const res = await SSRRequest({
        url: '/admin/category/list',
        method: 'GET'
    })
    return res
}

export const blockDeleteCategoryRequest = async (categoryId, type) => {
    const res = await SSRRequest({
        url: `/admin/category/action?categoryId=${categoryId}&type=${type}`,
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
