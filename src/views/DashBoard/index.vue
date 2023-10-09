<template>
  <div class="wapper">
    <div class="card">
      <div class="card_item">
        <Fieldset>
          <template #legend>
            <div class="flex align-items-center text-primary">
              <span class="pi pi-users icon_card"></span>
              <span class="font-bold text-lg title_card">Customers</span>
            </div>
          </template>
          <div>
            <div class="quantity_card">
                <span>28441</span>
            </div>
            <p class="targets_card">
                <span>520</span> newly registered
            </p>
          </div>
        </Fieldset>
      </div>
      <div class="card_item">
        <Fieldset>
          <template #legend>
            <div class="flex align-items-center text-primary">
              <span class="pi pi-wallet icon_card"></span>
              <span class="font-bold text-lg title_card">Revenue this month</span>
            </div>
          </template>
          <div>
            <div class="quantity_card">
                <span>$2.100</span>
            </div>
            <p class="targets_card">
                <span>52%+</span> since last month
            </p>
          </div>
        </Fieldset>
      </div>
      <div class="card_item">
        <Fieldset>
          <template #legend>
            <div class="flex align-items-center text-primary">
              <span class="pi pi-money-bill icon_card"></span>
              <span class="font-bold text-lg title_card">Total revenue</span>
            </div>
          </template>
          <div>
            <div class="quantity_card">
                <span >$2.100</span>
            </div>
            <p class="targets_card">
                <span>52%+</span> since last month
            </p>
          </div>
        </Fieldset>
      </div>
    </div>
    <div>
        <div class="content">
            <div class="chart-container" style="position: relative; height:60vh;width: 100%;">
                <Bar
                    id="my-chart-id"
                    :data="dataChartBar"
                />
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import Fieldset from "primevue/fieldset";
import {convertMoney} from '../../utils'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {ref} from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = ref ([
  {
    key:'user',
    titile: 'Users',
    quantity: '28441',
    targets:'520'
  },
  {
    key:'user',
    titile: 'Users',
    quantity: '28441',
    targets:'520'
  },
  {
    key:'user',
    titile: 'Users',
    quantity: '28441',
    targets:'520'
  }
])
const labelChartBar = ['Jan','Feb','Mar','Apr','May','Jun','Aug','Jul','Sep','Nov','Dec']

const dataChartBar = {
    labels: labelChartBar,
    datasets: [{
        label: 'Money Chart',
        data: [0, 0, 0, 20000000, 40000000, 120000000, 400000000,250000000,100000000,15000000,7000000],
        borderWidth: 1,
        backgroundColor: '#4fc08d',
    }],
    chartOptions: {
        responsive: true
    }
}

</script>

<style lang="scss" scoped>
.card{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 10px;
}
.card_item{
    :deep(){
        .p-fieldset-legend, .p-fieldset-content{
            padding: 10px;
        }
    }
    .icon_card{
        color: #1b8052;
        padding: 8px;
        background-color: #9aeeca;
        margin-right: 4px;
        border-radius: 4px;
    }
    .title_card{
        color: #9e9e9e;
    }
    .quantity_card {
        margin-bottom: 4px;
        span{
            color: #212121;
            font-weight: 600;
        }
    }
    .targets_card{
        color:#9e9e9e ;
        span{
            color: #4fc08d;
            font-weight: 600;
        }
    }
}

//Chart
.top-section {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 20px;

    .item-top {
        border: 1px solid;
        padding: 20px;
        text-align: center;
    }
}

#my-chart-id {
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
}
</style>
