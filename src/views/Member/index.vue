<template>
  <div class="">
        <DataTable :value="data" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="index" header="Number"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="createDate" header="createDate">
              <template #body="slotProps">
                {{ formatDate(slotProps.node.data.createDate) }}
              </template>
            </Column>
            <Column field="isBlock" header="isBlock"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount  } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useMemberStore } from '../../stores/member.js'
import { formatDate } from '../../utils'

const data = ref()

const members = useMemberStore()

onMounted(() => {
  data.value = members.list;
});

onBeforeMount( async () => {
  await members.getListMember()
});

</script>

<style lang="scss" scoped>

</style>