<template>
  <div class="container">
    <nav class="navbar">
      <ul>
        <li :class="{ active: $route.path == '/' }">
          <router-link to="/">육의전 검색</router-link>
        </li>
        <li :class="{ active: $route.path == '/satong' }">
          <router-link to="/satong">사통팔달 검색</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
.navbar {
  display: flex;
  justify-content: space-around;
  font-family: 'Poor Story', cursive;
  background: #141d24;
  border-radius: 2px;
}
.navbar ul {
  display: flex;
  width: 100%;
  list-style: none;
}
.navbar ul li a {
  text-decoration: none;
  color: white;
}
.navbar ul li {
  transition-delay: 1s;
  transition: 1s;
}
.navbar ul li:hover {
  border-bottom: solid 1px white;
  color: white;
}
.navbar ul li {
  padding: 0.5%;
}
.active {
  border-bottom: solid 1px white;
}
</style>
