import SSRRequest from "../axios";

export const CategoryRequest = async data => {
    const res = await SSRRequest({
        url: '/admin/category/create',
        method: 'POST',
        data
    })
    return res
}