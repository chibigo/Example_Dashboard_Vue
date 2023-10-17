import { defineStore } from "pinia";
import { changeStatusCoupon, createCoupon, getListCoupon } from "@/api/coupon";

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
          await this.getListCouponAction();
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
    async changeStatusCouponAction(status, couponId) {
      try {
        const res = await changeStatusCoupon(status, couponId);
        if (res.success) {
          await this.getListCouponAction();
          return res.success;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
  },
});
