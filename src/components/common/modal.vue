<template>
  <transition name="modal">
    <div class="modal">
      <div class="wrapper">
        <div
          class="container"
          id="container"
          tabindex="1"
          @blur="closeModal"
          onload="this.focus()"
        >
          <div class="header">
            <div class="title">
              <slot name="title"></slot>
            </div>
            <div class="close">
              <slot name="close"></slot>
            </div>
          </div>
          <div class="content">
            <slot name="content"></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  mounted() {
    document.getElementById('container').focus();
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>
<style src="@/assets/css/modal.css"></style>
