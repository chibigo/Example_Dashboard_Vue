<template>
  <div >
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
               <InputSwitch v-modal="checked"/>
              </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { onBeforeMount , ref  } from 'vue';
import DataTable from 'primevue/datatable';
import InputSwitch from 'primevue/inputswitch';
import Column from 'primevue/column';
import { useMemberStore } from '../../stores/member.js'
import { formatDate } from '../../utils'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const members = useMemberStore()
const checked = ref(false);
onBeforeMount( async () => {
  await members.getListMember()
});

const handleBlockMember = (userName,name) => {
  console.log(userName)
  Swal.fire({
    text: `Do you want block ${name}`,
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