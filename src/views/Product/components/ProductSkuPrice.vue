<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import { useProductStore } from '@/stores/product'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const useProduct = useProductStore()
const dataProductSkuCreate = ref({
  nameSale: '',
  price: 0
})
const optionProduct = ref(null)
const selectProduct = ref(null)
const visible = ref(false)

const handleShowModalCreateProductSku = () => {
  visible.value = true
  const options = useProduct.listProduct.map(item => {
    return { name: item.productName, code: item.productCode }
  })
  optionProduct.value = options
}

const handleCreateProductSku = async () => {
  if (
    selectProduct.value &&
    dataProductSkuCreate.value.nameSale &&
    dataProductSkuCreate.value.price > 0
  ) {
    visible.value = false
    await useProduct.createProductSkuAction({
      productCode: selectProduct.value.code,
      nameSale: dataProductSkuCreate.value.nameSale,
      price: dataProductSkuCreate.value.price
    })
  } else {
    Swal.fire('Please enter complete information', '', 'warning')
  }
}
</script>

<template>
  <div>
    <div class="section-top">
      <div></div>
      <div class="create">
        <Button
          @click="handleShowModalCreateProductSku"
          rounded
          type="button"
          severity="success"
          label="Create Product Sku"
          icon="pi pi-plus"
        >
        </Button>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Create Product Sku"
      :style="{ width: '60vw' }"
    >
      <form @submit.prevent="handleCreateProductSku">
        <div class="product-modal-add-sku">
          <div class="item-add flex flex-column gap-2">
            <label for="username">Product</label>
            <Dropdown
              v-model="selectProduct"
              :options="optionProduct"
              optionLabel="name"
              placeholder="Choose Product"
              style="width: 100%"
              :class="selectProduct ? '' : 'p-invalid'"
              required
            />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Name</label>
            <InputText
              v-model="dataProductSkuCreate.nameSale"
              required
              :class="dataProductSkuCreate.nameSale ? '' : 'p-invalid'"
            />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Price</label>
            <InputNumber
              v-model="dataProductSkuCreate.price"
              required
              :class="dataProductSkuCreate.price > 0 ? '' : 'p-invalid'"
            />
          </div>
        </div>
        <div class="product-btn-add-sku">
          <Button label="Create" severity="success" type="submit" />
          <Button
            @click="visible = false"
            label="Cancel"
            severity="secondary"
            type="button"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.section-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-modal-add-sku {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.product-btn-add-sku {
  margin-top: 10px;
  display: flex;
  justify-content: center;

  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>

<style>
.swal2-container {
  z-index: 9999;
}
</style>
