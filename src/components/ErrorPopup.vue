<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <p id="defaultMsg">Uhoh Unexpected Error Occured</p>
      <template v-if="errorMessage"> {{ errorMessage }}</template>
      <button class="close" @click="closeDialog"> Close </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPopup',
  components: {
  },
  props: [
    "errorMessage",
    "hidePopup"
  ],
  methods: {
    closeDialog: function () {
      this.$emit("hidePopup");
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.modal-content {
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px;
  box-shadow: 0 0 5px #c0c0c0;
  color: #000000;
  border-radius: 4px;
  width: 290px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#defaultMsg {
  font-size: 18px;
}

.close {
  font-size: 16px;
  border-radius: 4px;
  color: #FFFFFF;
  background-color: #000000;
  color: #FFFFFF;
  padding: 5px 20px;
  border: none;
}

.close:hover {
  border: none;
  background-color: #005df2;
  transition: all .2s ease-out;
}
</style>