import { defineStore } from 'pinia'
import { getMembersRequest } from '../api/member'

export const useMemberStore = defineStore('member', {
  state: () => {
    return { list:[] }
  },
  getters:{},
  actions: {
    async getListMember() {;
      const res = await getMembersRequest()
      this.list = res.data
    },
  },
})