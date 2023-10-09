import { defineStore } from 'pinia'
import { CategoryRequest } from '../api/category'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return { list:[] }
  },
  getters:{},
  actions: {
    async getListCategory() {;
      const res = await CategoryRequest()
      this.list = res.data
    },
  },
})