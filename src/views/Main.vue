<template>
  <div class="main">
    <img :src="require('@/assets/fox.png')" alt="" class="backimg" />
    <tradeForm />
  </div>
</template>

<script>
import tradeForm from '@/components/Main/tradeForm';

export default {
  components: {
    tradeForm,
  },
};
</script>

<style scoped src="@/assets/css/mainCommon.css"></style>
