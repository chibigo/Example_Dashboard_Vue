import { defineStore } from 'pinia'
import {
  getListProduct,
  createProduct,
  createProductSku,
  updateProduct,
  actionProduct,
  getListProductSku,
  productSkuAction,
  updateProductSkuAction
} from '@/api/product'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const useProductStore = defineStore('product', {
  state: () => {
    return { listProduct: [], loading: false, listProductSku: [] }
  },
  getters: {},
  actions: {
    async getListProductAction(params) {
      try {
        this.loading = true
        const res = await getListProduct(params)
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
    async updateProductAction(data) {
      try {
        const res = await updateProduct(data)
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
    async actionProductAction(productCode, type) {
      try {
        const res = await actionProduct(productCode, type)
        if (res.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
          await this.getListProductAction()
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Error!',
            icon: 'error'
          })
        }
      } catch (e) {
        Swal.fire({
          title: 'Error!',
          text: e,
          icon: 'error'
        })
      }
    },
    async createProductSkuAction(data) {
      try {
        await createProductSku(data)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        await this.getListProductSkuAction()
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error'
        })
      }
    },
    async getListProductSkuAction(params) {
      try {
        const res = await getListProductSku(params)
        if (res.success) {
          this.listProductSku = res.data
        } else {
          this.listProductSku = []
        }
      } catch (e) {}
    },
    async blockDeleteProductSkuAction(params) {
      try {
        const res = await productSkuAction(params)
        if (res.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          })
          await this.getListProductSkuAction()
        }
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error'
        })
      }
    },
    async updateProductSkuAction(data) {
      try {
        const res = await updateProductSkuAction(data)
        if (res.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          })
          await this.getListProductSkuAction()
        }
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
