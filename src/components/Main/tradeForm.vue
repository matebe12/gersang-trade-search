<template>
  <Form @changeServer="changeServer">
    <template slot="modal">
      <tradeModal
        v-if="show"
        @closeModal="closeModal"
        :tradeList="tradeList"
        :typeSelect="typeSelect"
        :serverSelect="serverSelect"
        :inputData="inputData"
        :mercList="mercList"
      />
    </template>
    <template v-slot:serverSelect></template>
    <template slot="type">
      <select name="" id="" v-model="typeSelect">
        <option value="1">아이템</option>
        <option value="2">아이디</option>
        <option value="3">용병</option>
      </select>
    </template>
    <template slot="searchBtn">
      <button type="button" @click="searchItem" class="button" id="searchBtn">
        검색
      </button>
    </template>
    <template slot="keyword">
      <div class="keyword" id="keyword" style="display:none;">
        <div
          v-for="(item, index) in keyword"
          :key="index"
          class="item"
          @click="setInput(index)"
          tabindex="0"
        >
          <div
            v-if="item.hasOwnProperty('image_url') && item.image_url !== null"
          >
            <img
              :src="item.image_url"
              alt=""
              :class="{
                'item-img':
                  item.hasOwnProperty('image_url') && item.image_url !== null,
              }"
            />
          </div>
          <div v-else>
            <img :src="require('@/assets/basic.jpg')" alt="" class="item-img" />
          </div>

          <p class="item_name" v-html="getHighlight(item.item_name)"></p>
        </div>
      </div>
    </template>
  </Form>
</template>

<script>
import { getTradeList, getTradeKeyword } from '@/api/trade';
import MODAL_MIXIN from '@/mixin/modalMix.js';
import DATA_MIXIN from '@/mixin/dataMix.js';
import tradeModal from '@/components/modal/tradeModal.vue';
import Form from '@/components/common/form';
export default {
  mixins: [MODAL_MIXIN, DATA_MIXIN],
  data() {
    return {
      timer: null,
      keyword: null,
      currentCount: -1,
      tradeList: [],
      inputData: '',
      mercList: [],
    };
  },
  components: {
    tradeModal,
    Form,
  },
  mounted() {
    let input = document.getElementById('inputData');

    document.addEventListener('click', function(e) {
      let x = document.getElementsByClassName('item');
      let inp = document.getElementById('inputData');
      //for (var i = 0; i < x.length; i++) {
      if (e.target != x && e.target != inp) {
        let key = document.getElementById('keyword');
        key.style.display = 'none';
      }
      //}
    });
    input.addEventListener('keyup', event => {
      let key = document.getElementById('keyword');
      let x = key.getElementsByClassName('item');
      if (event.keyCode === 40) {
        this.currentCount++;
        this.addActive(x);
        return;
      } else if (event.keyCode == 38) {
        this.currentCount--;
        this.addActive(x);
        return;
      } else if (event.keyCode == 13) {
        event.preventDefault();
        if (this.currentCount > -1) {
          if (x) this.setInput(this.currentCount);
          key.style.display = 'none';
          this.removeActive(x);
          this.currentCount = -1;
          this.searchItem();
          return;
        } else {
          this.searchItem();
        }
      } else if (event.keyCode == 37) return;
      else if (event.keyCode == 39) return;
      else {
        this.removeActive(x);
        this.currentCount = -1;
      }
      this.inputData = input.value;
      try {
        if (this.typeSelect == '1') {
          if (this.timer) clearTimeout(this.timer);
          this.timer = setTimeout(async () => {
            const req = {
              inputData: input.value,
            };
            const res = await getTradeKeyword(req);
            if (res.data.length > 0 && res.data !== 'OK') {
              this.keyword = res.data
                .sort()
                .reverse()
                .slice(0, 6);
              key.style.display = 'block';
            } else {
              key.style.display = 'none';
            }
          }, 500);
        }
      } catch (error) {
        alert(error);
      }
    });
  },
  methods: {
    async searchItem() {
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

        if (req.type == 1) {
          const { data } = await getTradeList(req);
          this.tradeList = data.sort();
        } else if (req.type == 3) {
          const { data } = await getTradeList(req);
          this.mercList = data.sort();
        } else {
          const { item, merc } = await getTradeList(req);
          this.tradeList = item.data.sort();
          this.mercList = merc.data.sort();
        }
        this.showModal();
      } catch (error) {
        alert(error);
      }
    },
    addActive(x) {
      if (!x) return false;
      this.removeActive(x);
      if (this.currentCount >= x.length) this.currentCount = 0;
      if (this.currentCount < 0) this.currentCount = x.length - 1;
      x[this.currentCount].classList.add('autocomplete-active');
    },
    removeActive(x) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    },
    setInput(i) {
      let key = document.getElementById('keyword');
      let x = key.getElementsByClassName('item');
      document.getElementById('inputData').value = x[i].lastChild.innerText;
      this.inputData = x[i].lastChild.innerText;
      this.removeActive(x);
      key.style.display = 'none';
      this.currentCount = -1;
      this.searchItem();
    },
    getHighlight(name) {
      let regex = new RegExp(document.getElementById('inputData').value, 'g');
      let result = name.replace(
        regex,
        `<span class="highlight" style="font-weight:bold;">${
          document.getElementById('inputData').value
        }</span>`,
      );
      return result;
    },
  },
};
</script>
