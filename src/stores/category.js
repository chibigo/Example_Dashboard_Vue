import { defineStore } from 'pinia'
import { createCategory, getListCategoryApi, blockDeleteCategoryRequest  } from '../api/category'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return { list:[] }
  },
  getters:{},
  actions: {
    async getListCategory() {;
      const res = await getListCategoryApi()
      this.list = res.data.data
    },
    async blockDeleteCategory(params) {
      const res = await blockDeleteCategoryRequest(params)
      await this.getListCategory()
    },
    async actionCreateCategory(data) {
      try {
        const res = await createCategory(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        await this.getListCategory()
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error'
        })
      }
    }
  },
})