<template>
  <div class="home">
    <slot name="modal"></slot>
    <div class="form">
      <div>
        <slot name="server">
          <select name="" id="" v-model="serverSelect" @change="changeServer">
            <option value="1">백호</option>
            <option value="2">주작</option>
            <option value="3">현무</option>
            <option value="4">청룡</option>
            <option value="5">봉황</option>
            <option value="6">해태</option>
            <option value="7">세종</option>
            <option value="8">신구</option>
            <option value="9">단군</option>
            <option value="10">비호</option>
            <option value="11">태극</option>
            <option value="12">화랑</option>
            <option value="13">태왕</option>
          </select>
        </slot>

        <slot name="type"> </slot>
        <input
          type="text"
          id="inputData"
          placeholder="검색어를 입력 해주세요."
        />
        <slot name="searchBtn"></slot>

        <slot name="keyword"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serverSelect: '1',
    };
  },
  methods: {
    changeServer() {
      this.$emit('changeServer', this.serverSelect);
    },
  },
};
</script>
<style src="@/assets/css/form.css"></style>
