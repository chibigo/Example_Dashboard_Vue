// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count:100 }
  },
  getters:{
    getAI:(state)=>{
return state.count/3
    }
  },
  actions: {
    increment() {
      this.count++
    },
  },
})