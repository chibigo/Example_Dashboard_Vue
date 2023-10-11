<template>
  <div>
      <div class="wrap-top">
        <div class="search">search</div>
        <div class="create">
          <button>Create Member</button>
        </div>
      </div>
      <div class="table">
        <DataTable :value="members.list" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 60rem">
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
                <InputSwitch :modelValue="slotProps.data.isBlock == 0 ? true : false"  @click="handleBlockMember(slotProps.data.username,slotProps.data.name,slotProps.data.isBlock)" />
               </div>
              </template>
            </Column>
        </DataTable>
      </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import DataTable from 'primevue/datatable';
import InputSwitch from 'primevue/inputswitch';
import Column from 'primevue/column';
import { useMemberStore } from '../../stores/member.js'
import { formatDate } from '../../utils'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const members = useMemberStore()

onBeforeMount( async () => {
  await members.getListMember()
});

const handleBlockMember = (userName,name,status) => {
  Swal.fire({
    text: `Do you want ${status == 0 ? 'block' : 'unblock'} ${name}`,
  }).then( async(result) => {
    await members.blockDeleteMember({username: userName,type: 'BLOCK'})
    if (result.isConfirmed) {
      Swal.fire('Success!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

</script>

<style lang="scss" scoped>
.wrap-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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