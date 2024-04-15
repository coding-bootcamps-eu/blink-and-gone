<template>
  <div class="container">
    <h2 class="headline">Error!</h2>
    <p class="text">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import '../assets/base.css'

defineProps({
  text: String
})
</script>

<style scoped>
.container {
  border: 2px solid var(--vt-c-warn);
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  background-color: var(--vt-c-warn-soft);
}
.headline {
  text-align: center;
}
.text {
  text-align: justify;
}
</style>
