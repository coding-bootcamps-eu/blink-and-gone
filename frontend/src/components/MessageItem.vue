<template>
  <div class="container">
    <h2 class="headline">{{ headline }}</h2>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import '../assets/base.css'

defineProps({
  headline: String,
  text: String
})
</script>

<style scoped>
.container {
  padding: 15px;
  border: 2px solid var(--color-border);
  border-radius: 5px;
}
.headline {
  text-align: center;
}
.text {
  text-align: center;
}
</style>
