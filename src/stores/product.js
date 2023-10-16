import { defineStore } from 'pinia'
import { getListProduct, createProduct, createProductSku } from '@/api/product'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const useProductStore = defineStore('product', {
  state: () => {
    return { listProduct: [], loading: false }
  },
  getters: {},
  actions: {
    async getListProductAction() {
      try {
        this.loading = true
        const res = await getListProduct()
        if (res.success) {
          this.listProduct = res.data
        } else {
          this.listProduct = []
        }
        this.loading = false
      } catch (e) {}
    },
    async createProductAction(data) {
      try {
        const res = await createProduct(data)
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
    },
    async createProductSkuAction(data) {
      try {
        const res = await createProductSku(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
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
