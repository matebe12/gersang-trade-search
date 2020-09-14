let DATA_MIXIN = {
  data() {
    return {
      serverSelect: '1',
      typeSelect: '1',
    };
  },
  methods: {
    changeServer(data) {
      this.serverSelect = data;
    },
  },
};

export default DATA_MIXIN;
