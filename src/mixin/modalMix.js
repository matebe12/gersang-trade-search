let MODAL_MIXIN = {
  data() {
    return {
      show: false,
      subShow: false,
    };
  },
  methods: {
    showModal() {
      this.show = true;
    },
    showSubModal() {
      this.subShow = true;
    },
    closeModal() {
      this.mercList = [];
      this.tradeList = [];
      this.show = false;
    },
    closeSubModal() {
      this.subShow = false;
    },
  },
};

export default MODAL_MIXIN;
