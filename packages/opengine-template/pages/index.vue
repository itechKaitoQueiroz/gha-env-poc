<template>
  <div class="container">
    <h1>Welcome to {{ slug }}</h1>
    <SomeComponent />
  </div>
</template>

<script setup lang="ts">
const { params: { slug } } = useRoute()
</script>

<style>
html {
  font: 16px sans-serif;
  line-height: 1.6em;
}

body {
  padding: 0;
}

.container {
  padding: 2rem 0;
  width: min(56em, calc(100% - 2rem));
  margin: 0 auto;
}
</style>
