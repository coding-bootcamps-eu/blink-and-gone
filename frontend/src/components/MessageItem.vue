<template>
  <div class="container">
    <h2 class="headline">{{ headline }}</h2>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  headline: String,
  text: String
})
</script>

<style scoped>
.container {
  padding: 5px;
  border: 2px solid white;
}
.headline {
  text-align: center;
}
.text {
  text-align: justify;
}
</style>
