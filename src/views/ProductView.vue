<template>
    <div>
        {{couted.getAI}}
        <button @click="couted.increment">asdsa</button> <button @click="handle">111111111111111111</button>
    </div>
</template>

<script setup>

import {onMounted} from 'vue'
import {loginRequest} from '../api/login'
import {useCounterStore } from '../stores/counter.js'


onMounted(async () => {
    await loginRequest({username:'admin',password:'123'})
});

const couted = useCounterStore()

const handle=()=>{
}
</script>

<style lang="scss" scoped>

</style>