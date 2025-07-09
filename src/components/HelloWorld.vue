<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="min-h-screen bg-red-700 text-yellow-300 flex items-center justify-center">
    <h1 class="text-4xl font-bold">Hello from Good Friends</h1>
  </div>
</template>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
