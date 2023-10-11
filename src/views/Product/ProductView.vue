<script setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Product from "@/views/Product/components/Product.vue";
import ProductSkuPrice from "@/views/Product/components/ProductSkuPrice.vue";
</script>

<template>
  <div>
    <div class="product-main">
      <h3>Product Manager</h3>
      <TabView>
        <TabPanel header="Product">
          <component :is="Product" />
        </TabPanel>
        <TabPanel header="Product Sku Price"
          ><component :is="ProductSkuPrice"
        /></TabPanel>
      </TabView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-main {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
}
</style>

<style>
.product-main .p-tabmenu .p-tabmenu-nav {
  border: none;
}
</style>
