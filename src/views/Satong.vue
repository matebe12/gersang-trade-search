<template>
  <div class="main">
    <img :src="require('@/assets/fox.png')" alt="" class="backimg" />
    <satongForm />
  </div>
</template>

<script>
import satongForm from '@/components/Satong/satongForm';
export default {
  components: {
    satongForm,
  },
};
</script>

<style scoped src="@/assets/css/mainCommon.css"></style>
