import { defineStore } from "pinia";
import { loginRequest } from "../api/login";
import Swal from "sweetalert2/dist/sweetalert2.js";
import router from "../router";

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      auth: null,
      profile: {}
    }
  },
  getters: {},
  actions: {
    async login(data) {
      try {
        const res = await loginRequest(data)
        if (!res.success) {
          Swal.fire({
            title: "Error!",
            text: res.message,
            icon: 'error'
          })
        } else {
          this.profile = res.data
          this.auth = res.data.token
          localStorage.setItem('token', res.data.token)
          router.push('/')
          location.reload()
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err,
          icon: 'error'
        })
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.profile = {};
      this.auth = null;
      router.push("/login");
      location.reload();
    },
  },
  persist: true,
});
