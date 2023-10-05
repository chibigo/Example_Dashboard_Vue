<template>
  <div class="card">
        <DataTable :value="data" paginator :rows="2" :rowsPerPageOptions="[2, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Name"></Column>
            <Column field="country" header="Country"></Column>
            <Column field="company" header="Company"></Column>
            <Column field="age" header="Age"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted  } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const member = [
  {
    name: 'test1',
    country: 'danang',
    company: 'leon',
    age: '11',
  },
  {
    name: 'test2',
    country: 'danang',
    company: 'leon',
    age: '18',
  },
  {
    name: 'test3',
    country: 'danang',
    company: 'leon',
    age: '21',
  },
]

onMounted(() => {
  data.value = member;
});

const data = ref()

console.log(data)

</script>

<style lang="scss" scoped>

</style>