<template>
  <Form @changeServer="changeServer">
    <template slot="modal">
      <satongModal
        v-if="show"
        @closeModal="closeModal"
        :satongList="satongList"
        :typeSelect="typeSelect"
        :serverSelect="serverSelect"
      />
    </template>
    <template v-slot:serverSelect></template>
    <template slot="type">
      <select name="" id="" v-model="typeSelect">
        <option value="1">내용</option>
        <option value="2">아이디</option>
      </select>
    </template>
    <template slot="searchBtn">
      <button type="button" @click="searchSatong" class="button" id="searchBtn">
        검색
      </button>
    </template>
  </Form>
</template>

<script>
import { getSatongList } from '@/api/satong';
import MODAL_MIXIN from '@/mixin/modalMix.js';
import DATA_MIXIN from '@/mixin/dataMix.js';
import satongModal from '@/components/modal/satongModal.vue';
import Form from '@/components/common/form';
export default {
  mixins: [MODAL_MIXIN, DATA_MIXIN],
  data() {
    return {
      satongList: null,
    };
  },
  components: {
    satongModal,
    Form,
  },
  mounted() {
    let input = document.getElementById('inputData');
    input.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        event.preventDefault();
        this.searchSatong();
      }
    });
  },
  methods: {
    async searchSatong() {
      if (document.getElementById('inputData').value.length < 1) {
        alert('검색어를 입력해주세요.');
        return;
      }
      try {
        const req = {
          server: this.serverSelect,
          inputData: document.getElementById('inputData').value,
          type: this.typeSelect,
        };
        const { data } = await getSatongList(req);
        this.satongList = data.sort();
        this.showModal();
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>
