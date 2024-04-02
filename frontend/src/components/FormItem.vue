<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="secretMessage"
        id="secmess"
        placeholder="Enter your secret message here..."
      ></textarea>
      <button type="submit">Blink</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ApiResponse {
  message: string
}

const secretMessage = ref<string>('')

function handleSubmit() {
  fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: secretMessage.value })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() as Promise<ApiResponse>
    })
    .then((data) => {
      console.log(data.message)
    })
    .catch((error) => {
      console.error('Error submitting data:', error)
    })
}
</script>

<style scoped>
#secmess {
  width: 300px;
}
</style>
