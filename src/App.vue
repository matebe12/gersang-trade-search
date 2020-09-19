<template>
  <div id="app">
    <navBar />
    <router-view />
  </div>
</template>

<script>
import navBar from './components/common/navbar';
export default {
  components: {
    navBar,
  },
};
</script>
<style>
body {
  margin: 0;

  height: 100%;
  background-color: #58acfa;
}
</style>
