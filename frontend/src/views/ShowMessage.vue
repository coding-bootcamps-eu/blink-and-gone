<template>
  <h2>Das ist eine geheime Nachricht</h2>
  <button v-on:click="getMessage()" v-if="clicked === false">KLICK MICH</button>
  <MessageItem v-if="clicked === true" :text="secmess" />
  <p v-if="errorOccurred === true">
    Es ist ein Fehler aufgetreten. Entweder existiert die von Ihnen angeforderte Nachricht nicht
    oder sie wurde bereits gelesen und somit gelöscht.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import MessageItem from '../components/MessageItem.vue'

const route = useRoute()
const id = route.params.id
let secmess = ''
let clicked = ref<boolean>(false)
let errorOccurred = ref<boolean>(false)

async function getMessage() {
  try {
    const response = await fetch('http://localhost:3000/data/' + id)
    const result = await response.json()
    secmess = result.message
    clicked.value = true
    return result
  } catch (error) {
    errorOccurred.value = true
  }
}
</script>
