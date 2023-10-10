import { defineStore } from 'pinia'
import { getListCategoryApi } from '../api/category'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return { list:[] }
  },
  getters:{
    doubleCount(state) {
        return state.count * 2
      },
  },
  actions: {
    async getListCategory() {;
      const res = await getListCategoryApi()
      this.list = res.data.data
    },
  },
})