<template>
  <h2 class="headline">Your secret message</h2>
  <hr />
  <div class="center">
    <button v-on:click="getMessage()" v-if="clicked === false">
      <span class="btn-text">Open message</span>
    </button>
  </div>
  <MessageItem v-if="clicked === true" :text="secmess" />
  <ErrorMessageItem v-if="errorOccurred === true" :text="errorText" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import MessageItem from '../components/MessageItem.vue'
import ErrorMessageItem from '@/components/ErrorMessageItem.vue'

const route = useRoute()
const id = route.params.id
const errorText =
  'An error has occurred. Either the message you requested does not exist or it has already been read and therefore deleted.'
let secmess = ref<string>('')
let clicked = ref<boolean>(false)
let errorOccurred = ref<boolean>(false)

async function getMessage() {
  try {
    const response = await fetch('http://localhost:3000/messages/' + id)
    const result = await response.json()
    secmess = result.message
    clicked.value = true
    return result
  } catch (error) {
    errorOccurred.value = true
  }
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  padding: 15px;
}
.headline {
  text-align: center;
}
button {
  width: 200px;
}
</style>
