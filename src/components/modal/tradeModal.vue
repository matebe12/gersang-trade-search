<template>
  <modal>
    <template slot="title">
      <span>육의전 정보</span>
    </template>
    <template slot="close">
      <span class="close" @click="closeModal">X</span>
    </template>
    <template slot="content">
      <div v-if="tradeList.length < 1">
        <h1>해당 검색어의 아이템 목록이 없습니다.</h1>
      </div>
      <div v-if="tradeList.length >= 1 && typeSelect == 1">
        <div class="content-table">
          <h1 class="total_cnt">
            서버 - {{ serverName }} 총 {{ tradeList.length }}건 검색
          </h1>
          <table>
            <thead>
              <th></th>
              <th>이름</th>
              <th>수량</th>
              <th>가격</th>
              <th>판매자 아이디</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tradeList" :key="index">
                <td
                  v-if="
                    item.hasOwnProperty('image_url') && item.image_url !== null
                  "
                >
                  <img
                    :src="item.image_url"
                    :class="{
                      'item-img':
                        item.hasOwnProperty('image_url') &&
                        item.image_url !== null,
                    }"
                  />
                </td>
                <td v-else>
                  <img :src="require('@/assets/basic.jpg')" class="item-img" />
                </td>
                <td class="item_content">{{ item.item_name }}</td>
                <td class="item_content">{{ item.quantity }}</td>
                <td class="item_content">{{ item.price }}</td>
                <td class="item_content">{{ item.user_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="tradeList.length >= 1 && typeSelect == 3">
        <div class="content-table">
          <h1>서버 - {{ serverName }}총 {{ tradeList.length }}건 검색</h1>
          <table>
            <thead>
              <th></th>
              <th>이름</th>
              <th>레벨</th>
              <th>스텟</th>
              <th>가격</th>
              <th>판매자 아이디</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tradeList" :key="index">
                <td>
                  <img
                    :src="item.image_url"
                    :class="{
                      'item-img':
                        item.hasOwnProperty('image_url') &&
                        item.image_url !== null,
                    }"
                  />
                </td>
                <td class="item_name">{{ item.merc_name }}</td>
                <td class="item_name">{{ item.lvl }}</td>
                <td class="stat">
                  <p>힘:{{ item.str }} 민:{{ item.agi }}</p>

                  <p>생:{{ item.vit }} 지:{{ item.int }}</p>
                </td>
                <td class="username">{{ item.price }}</td>
                <td class="item_name">{{ item.user_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import modal from '@/components/common/modal';
export default {
  props: ['tradeList', 'typeSelect', 'serverSelect'],
  data() {
    return {
      serverName: '',
    };
  },
  components: {
    modal,
  },
  mounted() {
    switch (this.serverSelect) {
      case '1':
        this.serverName = '백호';
        break;
      case '2':
        this.serverName = '주작';
        break;
      case '3':
        this.serverName = '현무';
        break;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>
<style scoped src="@/assets/css/modal.css"></style>
