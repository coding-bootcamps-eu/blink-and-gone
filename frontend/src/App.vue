<template>Burn on read service upcoming</template>

<script setup lang="ts">
import BlinkGone from '@/views/BlinkGone.vue'
// @TODO: to be deleted... only for testing-purposes! --> start
async function getData() {
  const response = await fetch('http://localhost:3000/data')
  const data = await response.json()
  console.log(data)
}

getData()

// <-- end
</script>

<template>
  <BlinkGone />
</template>