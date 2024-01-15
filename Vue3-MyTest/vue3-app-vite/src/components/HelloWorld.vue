<template>
  <button @click="increase">count is: {{ countRef }}</button>
</template>

<script>
import { ref } from "vue"
export default {
  setup() {
    let countRef = ref(0)
    const increase = () => {
      countRef.value++
    }
    return {
      countRef,
      increase,
    }
  }
}
</script>
