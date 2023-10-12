import { defineStore } from 'pinia'
import { getListProduct, createProduct } from '@/api/product'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const useProductStore = defineStore('product', {
  state: () => {
    return { listProduct: [] }
  },
  getters: {},
  actions: {
    async getListProductAction() {
      const res = await getListProduct()
      this.listProduct = res.data.data
    },
    async createProductAction(data) {
      try {
        const res = await createProduct(data)
        console.log(123)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        await this.getListProductAction()
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error'
        })
      }
    }
  }
})
