import SSRRequest from "../axios";

export const getListCategoryApi = async () => {
    const res = await SSRRequest({
        url: '/admin/category/list',
        method: 'GET'
    })
    return res
}