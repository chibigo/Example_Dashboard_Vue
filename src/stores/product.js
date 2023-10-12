import { defineStore } from "pinia";
import { getListProduct } from "@/api/product";

export const useProductStore = defineStore("product", {
  state: () => {
    return { listProduct: [] };
  },
  getters: {},
  actions: {
    async getListProductAction() {
      const res = await getListProduct();
      this.listProduct = res.data.data;
    },
  },
});
