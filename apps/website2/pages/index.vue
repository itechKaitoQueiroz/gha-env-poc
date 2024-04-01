<template>
  <div class="container">
    <h1>Welcome to Website 2</h1>
    <SomeComponent />
    <AnotherComponent />
    {{ environmentName }}
  </div>
</template>

<script setup>
const { environmentName } = useRuntimeConfig().public
const config = useRuntimeConfig()
console.log(config.value)
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
