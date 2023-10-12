<template>
  <div>
    <div class="member-main">
      <div class="wrap-top">
        <div class="search">search</div>
        <div class="create">
          <Button
            @click="visible = true"
            rounded
            type="button"
            severity="success"
            label="Add Product"
            icon="pi pi-plus"
          >
            Create Member
          </Button>
        </div>
      </div>
      <div class="table">
        <DataTable
          :value="members.list"
          paginator
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          tableStyle="min-width: 60rem"
        >
          <Column field="index" header="Number">
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="name" header="Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="createDate" header="Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createDate) }}
            </template>
          </Column>
          <Column field="isBlock" header="Status">
            <template #body="slotProps">
              <div>
                <InputSwitch
                  :modelValue="slotProps.data.isBlock == 0 ? true : false"
                  @click="
                    handleBlockMember(
                      slotProps.data.username,
                      slotProps.data.name,
                      slotProps.data.isBlock
                    )
                  "
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Add Member"
      :style="{ width: '60vw' }"
    >
      <form @submit.prevent="handleCreateMember">
        <div class="member-modal-add">
          <div class="item-add flex flex-column gap-2">
            <label for="username">User Name</label>
            <InputText v-model="username" required />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Password</label>
            <InputText v-model="password" required />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Name</label>
            <InputText v-model="name" required />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Email</label>
            <InputText v-model="email" required />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Phone</label>
            <InputText v-model="phone" type="number" />
          </div>
        </div>
        <div class="member-btn-add">
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

<script setup>
import { onBeforeMount, ref } from 'vue'
import DataTable from 'primevue/datatable'
import InputSwitch from 'primevue/inputswitch'
import Column from 'primevue/column'
import { useMemberStore } from '../../stores/member.js'
import { formatDate } from '../../utils'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { schema } from './schema'
import { useForm } from 'vee-validate'

const visible = ref(false)
const members = useMemberStore()

const { handleSubmit, useFieldModel, errors, resetForm } = useForm({
  validationSchema: schema
})

const [username, password, phone, email, name] = useFieldModel([
  'username',
  'password',
  'phone',
  'email',
  'name'
])

onBeforeMount(async () => {
  await members.getListMember()
})

const handleBlockMember = (userName, name, status) => {
  Swal.fire({
    text: `Do you want ${status == 0 ? 'block' : 'unblock'} ${name}`
  }).then(async result => {
    if (result.isConfirmed) {
      await members.blockDeleteMember({ username: userName, type: 'BLOCK' })
      Swal.fire('Success!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

const handleCreateMember = handleSubmit(async values => {
  visible.value = false
  resetForm()
  await members.actionCreateMember(values)
})
</script>

<style lang="scss" scoped>
.member-main {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
}
.wrap-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.member-modal-add {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.member-btn-add {
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
.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background: #4fc08d;
}

.p-inputswitch.p-focus .p-inputswitch-slider {
  box-shadow: none;
}

div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm:focus {
  box-shadow: none;
}

div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm {
  background: #4fc08d;
}
</style>
