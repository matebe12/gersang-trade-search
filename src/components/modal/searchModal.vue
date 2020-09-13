<template>
  <div class="modal">
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <div class="title">
            <span>육의전 정보</span>
          </div>
          <div class="close" align="right">
            <span class="close" @click="closeModal">X</span>
          </div>
        </div>
        <div class="content">
          <div v-if="tradeList.length < 1">
            <h1>해당 검색어의 아이템 목록이 없습니다.</h1>
          </div>
          <div v-else>
            <div v-for="(item, index) in tradeList" :key="index">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tradeList'],
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal .wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal .container {
  width: 300px;
  height: 500px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 2px;
  margin: 0px auto;
}
.header {
  border-bottom: 1px solid;
  padding: 2%;
  display: flex;
  justify-content: flex-start;
}
.header span {
  font-size: 50px;
  font-family: 'Poor Story', cursive;
}
.header .close {
  cursor: pointer;
  margin-left: auto;
}
</style>
