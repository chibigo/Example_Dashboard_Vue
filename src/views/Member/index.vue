<template>
  <div>
    <div class="member-main">
      <div class="wrap-top">
        <div class="search-wrap">
          <div class="search">
            <InputText v-model="valueSearch" placeholder="Search" />
            <Dropdown
              v-model="selectedStatus"
              :options="status"
              optionLabel="name"
              placeholder="Status"
              class="w-full md:w-8rem"
            />
            <Button
              label="Search"
              severity="success"
              type="button"
              @click="handleSearch"
              class="btn-search"
            />
          </div>
        </div>
        <div class="create">
          <Button
            @click="
              {
                ;(visible = true), (modalMember = 'create')
              }
            "
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
          <Column field="createDate" header="Date Create">
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
          <Column field="isBlock" header="Action">
            <template #body="slotProps">
              <div>
                <i
                  class="pi pi-user-edit"
                  style="cursor: pointer; margin-right: 10px; font-size: 20px"
                  @click="
                    {
                      ;(visible = true), (modalMember = 'edit')
                      handleEditMember(slotProps.data)
                    }
                  "
                ></i>
                <i
                  class="pi pi-trash"
                  style="cursor: pointer; font-size: 20px"
                  @click="
                    handleDeleteMember(
                      slotProps.data.username,
                      slotProps.data.name
                    )
                  "
                ></i>
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
      v-if="modalMember == 'create'"
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
            <InputNumber v-model="phone" />
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
    <Dialog
      v-model:visible="visible"
      modal
      header="Edit Member"
      :style="{ width: '60vw' }"
      v-else
    >
      <form @submit.prevent="submitEditMember">
        <div class="member-modal-add">
          <div class="item-add flex flex-column gap-2">
            <label for="username">User Name</label>
            <InputText :value="edit.username" disabled />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Name</label>
            <InputText v-model="edit.name" required />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Email</label>
            <InputText v-model="edit.email" required />
          </div>
          <div class="item-add flex flex-column gap-2">
            <label for="username">Phone</label>
            <InputNumber v-model="edit.phone" type="number" />
          </div>
        </div>
        <div class="member-btn-add">
          <Button label="Edit" severity="success" type="submit" />
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
import Dropdown from 'primevue/dropdown'
import router from '../../router'
import InputNumber from 'primevue/inputnumber'

const visible = ref(false)
const members = useMemberStore()
const status = ref([
  { name: 'All', code: undefined },
  { name: 'Active', code: 0 },
  { name: 'Block', code: 1 }
])
const filterSelect = status.value.find(
  item => item.code == router.currentRoute.value.query.isBlock
)
const selectedStatus = ref(filterSelect || null)
const valueSearch = ref(router.currentRoute.value.query.textSearch || null)
const modalMember = ref('create')
const edit = ref({
  username: '',
  name: '',
  email: '',
  phone: ''
})

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
  await members.getListMember(router.currentRoute.value.query || null)
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

const handleSearch = async () => {
  const params = {
    isBlock: selectedStatus?.value?.code,
    textSearch: valueSearch?.value ? valueSearch?.value : undefined
  }
  await members.getListMember(params)
  router.push({
    name: 'member',
    query: {
      isBlock: selectedStatus?.value?.code,
      textSearch: valueSearch?.value ? valueSearch?.value : undefined
    }
  })
}

const handleDeleteMember = async (userName, name) => {
  Swal.fire({
    text: `Do you want delete ${name}`
  }).then(async result => {
    if (result.isConfirmed) {
      await members.blockDeleteMember({ username: userName, type: 'DELETE' })
      Swal.fire('Success!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

const handleEditMember = value => {
  edit.value = {
    username: value.username,
    name: value.name,
    email: value.email,
    phone: value.phone
  }
}

const submitEditMember = handleSubmit(async () => {
  visible.value = false
  await members.actionEditMember({
    username: edit.value.username,
    name: edit.value.name,
    email: edit.value.email,
    phone: edit.value.phone
  })
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

  position: relative;
}

.create {
  position: absolute;
  right: 0;
}

.search {
  display: flex;
  gap: 10px;
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

.btn-search {
  justify-content: center;
  width: 110px;
}

@media (max-width: 1023px) {
  .search {
    flex-direction: column;
  }
}
</style>
