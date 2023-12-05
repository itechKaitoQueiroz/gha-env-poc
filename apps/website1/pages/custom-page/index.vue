<template>
  <div class="container">
    <h1>This is a custom page on Website 1</h1>
    <SomeComponent />
    <CustomWebsiteComponent />
  </div>
</template>

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
