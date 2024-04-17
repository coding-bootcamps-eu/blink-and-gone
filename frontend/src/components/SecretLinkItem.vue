<template>
  <div class="container">
    <h2 class="headline">Your secret link:</h2>
    <a target="_blank" :href="secretLink" class="link">{{ secretLink }}</a>
    <div class="btn-container">
      <button v-on:click="copy(secretLink!)">
        <span v-if="copied === false" class="btn-text">Copy</span
        ><span v-else class="btn-text">Copied ✅</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  secretLink: String
})

let copied = ref<boolean>(false)

async function copy(secretLink: string) {
  try {
    await navigator.clipboard.writeText(secretLink)
    copied.value = true
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.container {
  border: 2px solid currentColor;
  border-radius: 5px;
  margin: 10px 0;
  padding: 5px;
  text-align: center;
}
.headline {
  text-align: center;
}
.link {
  font-size: small;
}
button {
  width: 100%;
  height: 40px;
}
.btn-container {
  display: flex;
  margin-top: 10px;
}
</style>
