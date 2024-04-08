<template>
  <main>
    <form @submit.prevent="handleSubmit" method="post">
      <textarea
        v-model="secretMessage"
        id="secmess"
        placeholder="Enter your secret message here..."
      ></textarea>
      <button type="submit">Blink</button>
    </form>
    <div v-if="errorOccurred === true">
      <h2>Fehler!</h2>
      <p>
        Bei der gewünschten Funktion ist leider ein Fehler aufgetreten. Bitte versuchen Sie es in
        ein paar Minuten noch einmal.
      </p>
    </div>
    <div v-if="showLink === true">
      <h2>Your secret link</h2>
      <a target="_blank" :href="secretLink">{{ secretLink }}</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ApiResponse {
  message: string
}

const secretMessage = ref<string>('')
let errorOccurred = ref<boolean>(false)
let showLink = ref<boolean>(false)
let secretLink = ref<string>('http://localhost:5173/messages/')

function handleSubmit() {
  fetch('http://localhost:3000/messages/new', {
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
      return response.json()
    })
    .then((data) => {
      console.log(data)
      secretLink.value += `${data.filename}${data.seperator}${data.timestamp}`
      secretMessage.value = ''
      errorOccurred.value = false
      showLink.value = true
    })
    .catch((error) => {
      errorOccurred.value = true
      console.error('Error, submitting is not working:', error)
    })
}
</script>

<style scoped>
#secmess {
  width: 300px;
}
</style>
