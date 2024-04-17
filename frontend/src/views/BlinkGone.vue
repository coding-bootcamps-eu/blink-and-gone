<template>
  <h1 class="title"><span class="blink">Blink</span> and <span class="gone">Gone</span></h1>
  <hr />
  <FormItem class="form" />
</template>

<script setup lang="ts">
import FormItem from '../components/FormItem.vue'
</script>

<style scoped>
.title {
  text-align: center;
}
.blink {
  animation: blink 2s forwards;
}
.gone {
  display: inline-block;
  animation: gone 4s forwards;
}
.form {
  padding-top: 10px;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes gone {
  50% {
    transform: translateX(-5px);
  }
  75% {
    opacity: 0.5;
  }
  98% {
    transform: translateX(600px);
    opacity: 0;
  }
  99% {
    transform: translateX(0);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
