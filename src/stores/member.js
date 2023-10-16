import { defineStore } from 'pinia'
import {
  getMembersRequest,
  blockDeleteMembersRequest,
  createMember,
  EditMember
} from '../api/member'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const useMemberStore = defineStore('member', {
  state: () => {
    return { list: [] }
  },
  getters: {},
  actions: {
    async getListMember(data) {
      const res = await getMembersRequest(data)
      this.list = res.data.data
    },
    async blockDeleteMember(params) {
      await blockDeleteMembersRequest(params)
      await this.getListMember()
    },
    async actionCreateMember(data) {
      try {
        const res = await createMember(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        await this.getListMember()
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error'
        })
      }
    },
    async actionEditMember(data) {
      try {
        const res = await EditMember(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        })
        await this.getListMember()
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
