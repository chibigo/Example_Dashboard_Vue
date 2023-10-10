<template>
  <div class="card">
    <div class="add-member">Create Member</div>
    <div class="d-flex">
      <span class="p-float-label">
        <!-- <InputText id="username" v-model="value" /> -->
        <label for="username">Username</label>
      </span>
      <Dropdown v-model="selectedCity" :options="title" optionLabel="name" placeholder="All" class="w-full md:w-14rem" />
      <Button onclick="handleSubmit" class="all-submit" type="submit" label="Success" />
    </div>
    <div class="table">
      <!-- <TreeTable :value="testtable" paginator :rows="2" :rowsPerPageOptions="[2, 10, 20, 50]" tableStyle="min-width: 50rem">
        <Column field="id" header="Name" expander></Column>
        <Column field="parentCategoryId" header="Size"></Column>
        <Column field="nameCategory" header="Type"></Column>
        <Column field="description" header="Name"></Column>
        <Column field="createDate" header="Size"></Column>
        <Column field="isBlock" header="Type"></Column>
      </TreeTable> -->
      <TreeTable :value="testtable">
        <Column field="label" header="Name" expander></Column>
        <Column field="key" header="Size"></Column>
        <Column field="data" header="Type"></Column>
      </TreeTable>
    </div>
  </div>
</template>
   
<script setup>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';

const selectedCity = ref();
const title = ref([
  { name: 'All' },
  { name: 'Name' },
  { name: 'Action' },
])

const handleSubmit = () => {

}

const testtable = [
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
]
</script>

<style lang="scss" scoped></style>

//create name,image, description,

