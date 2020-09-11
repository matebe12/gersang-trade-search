<template>
  <div class="main">
    <img :src="require('@/assets/fox.png')" alt="" />
    <searchForm />
  </div>
</template>

<script>
import searchForm from '@/components/Main/searchForm';
export default {
  components: {
    searchForm,
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .main {
    width: 100%;
    height: 100vh;
    background-color: #58acfa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .back-img {
    z-index: 1;
  }
}
@media (max-width: 768px) {
  .main {
    width: 100%;
    height: 100vh;
    background-color: #58acfa;
    display: block;
    justify-content: center;
    align-items: center;
  }
  .back-img {
    z-index: 1;
  }
}
</style>
