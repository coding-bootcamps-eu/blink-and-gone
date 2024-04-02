<template>
  <div>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: String
})
</script>
