<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
  background-color: #F6F8FB;
  font-family: 'Roboto';
}
@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.ttf') format('truetype');
  font-style: normal;
}
</style>
