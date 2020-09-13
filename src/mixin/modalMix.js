let MODAL_MIXIN = {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
  },
};

export default MODAL_MIXIN;
