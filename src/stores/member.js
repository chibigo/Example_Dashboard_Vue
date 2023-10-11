import { defineStore } from 'pinia'
import { getMembersRequest, blockDeleteMembersRequest } from '../api/member'

export const useMemberStore = defineStore('member', {
  state: () => {
    return { list:[] }
  },
  getters:{},
  actions: {
    async getListMember() {
      const res = await getMembersRequest()
      this.list = res.data.data
    },
    async blockDeleteMember(params) {;
      const res = await blockDeleteMembersRequest(params)
      await this.getListMember()
    }
  },
})