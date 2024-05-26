<template>
  <div class="parent">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
}
</script>

<style scoped>
.parent {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loader {
  border: 3px solid #b9b9b9;
  /* Light grey */
  border-top: 3px solid #181818;
  /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>