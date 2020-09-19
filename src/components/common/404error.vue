<template>
  <div class="mainbox">
    <div class="err">4</div>
    <i class="far fa-question-circle fa-spin"></i>
    <div class="err2">4</div>
    <div class="msg">
      존재하지 않는 경로 및 잘못된 접근입니다.
      <p><router-link to="/">홈으로</router-link></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
.mainbox {
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}

.err {
  color: #ffffff;
  font-family: 'Poor Story', cursive;
  font-size: 8rem;
  position: absolute;
  left: 20%;
  top: 8%;
}

.far {
  position: absolute;
  font-size: 5rem;
  left: 42%;
  top: 15%;
  color: #ffffff;
}

.err2 {
  color: #ffffff;
  font-family: 'Poor Story', cursive;
  font-size: 8rem;
  position: absolute;
  left: 68%;
  top: 8%;
}

.msg {
  text-align: center;
  font-family: 'Poor Story', cursive;
  font-size: 1.6rem;
  position: absolute;
  left: 16%;
  top: 45%;
  width: 75%;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .mainbox {
    margin: auto;
    height: 600px;
    width: 300px;
    position: relative;
  }
}
</style>
