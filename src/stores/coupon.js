import { defineStore } from "pinia";
import { createCoupon, getListCoupon } from "@/api/coupon";

export const useCouponStore = defineStore("coupon", {
  state: () => {
    return { listCoupon: [] };
  },
  getters: {},
  actions: {
    async createCouponAction(data) {
      try {
        const res = await createCoupon(data);
        if (res.success) {
          return res;
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
    },
    async getListCouponAction() {
      try {
        const res = await getListCoupon();
        if (res.success) {
          this.listCoupon = res.data;
        } else {
          this.listCoupon = [];
        }
      } catch (e) {
        this.listCoupon = [];
      }
    },
  },
});
