<template>
  <main>
    <form @submit.prevent="handleSubmit" method="post">
      <textarea
        v-model="secretMessage"
        id="secmess"
        placeholder="Enter your secret message here..."
      ></textarea>
      <button type="submit" :disabled="showLink === true">
        <span v-if="showLink === false" class="btn-text">Blink</span
        ><span v-else>...and gone!</span>
      </button>
    </form>
    <ErrorMessageItem v-if="errorOccurred === true" :text="errorText" />
    <SecretLinkItem v-if="showLink === true" :secret-link="secretLink" />
  </main>
</template>

<script setup lang="ts">
import ErrorMessageItem from '../components/ErrorMessageItem.vue'
import SecretLinkItem from '../components/SecretLinkItem.vue'
import { ref } from 'vue'
const { VITE_API, VITE_APP_BASE_URL } = import.meta.env

const errorText: string =
  'Unfortunately, an error occurred with the desired function. Please try again in a few minutes.'
const secretMessage = ref<string>('')
let errorOccurred = ref<boolean>(false)
let showLink = ref<boolean>(false)
let secretLink = ref<string>(`${VITE_APP_BASE_URL}/messages/`)

function handleSubmit() {
  fetch(`${VITE_API}/messages/new`, {
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
  width: 100%;
  resize: none;
  border-radius: 5px;
  margin: 5px 0;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
