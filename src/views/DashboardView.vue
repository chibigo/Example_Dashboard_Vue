<template>
    <div>
        <div class="top-section">
            <div v-for="(item,index) in data" :key="index" class="item-top">
                <div>{{ item.title }}</div>
                <div>{{ item.key === 'money' ? convertMoney(item.amount) : item.amount }}</div>
            </div>
        </div>
        <div class="content">
            <div class="chart-container" style="position: relative; height:60vh;width: 100%;">
                <Bar
                    id="my-chart-id"
                    :data="dataChartBar"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import {convertMoney} from '../utils'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = [
    {
        title: "Total Money",
        amount: 1350000000,
        key: 'money'
    },
    {
        title: "Total Member",
        amount: 500,
        key: 'member'
    }
]

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