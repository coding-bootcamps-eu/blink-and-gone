<template>
  <h2>Das ist eine geheime Nachricht</h2>
  <button v-on:click="getMessage()" v-if="clicked === false">KLICK MICH</button>
  <p v-if="clicked === true">{{ secmess }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
let secmess = ''
let clicked = ref<boolean>(false)

async function getMessage() {
  const response = await fetch('http://localhost:3000/data/' + id)
  const result = await response.json()
  secmess = result
  clicked.value = true
  return result
}
</script>
