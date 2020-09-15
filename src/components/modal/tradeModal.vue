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
          <canvas id="minmaxCanvas" style="height:100px"></canvas>
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
                <td class="item_content">
                  {{ numberWithCommas(item.price) }}전
                </td>
                <td class="item_content">{{ item.user_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="tradeList.length >= 1 && typeSelect == 3">
        <div class="content-table">
          <h1>서버 - {{ serverName }}총 {{ tradeList.length }}건 용병 검색</h1>
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
                <td class="username">{{ numberWithCommas(item.price) }}</td>
                <td class="item_name">{{ item.user_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="typeSelect == 2" class="flex-box">
        <div
          class="content-table"
          v-if="tradeList.length >= 1"
          :class="{ both: mercList.length > 0 }"
        >
          <h1 class="total_cnt">
            서버 - {{ serverName }} 총 {{ tradeList.length }}건 아이템 검색
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
                <td class="item_content">
                  {{ numberWithCommas(item.price) }}전
                </td>
                <td class="item_content">{{ item.user_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="content-table both"
          v-if="mercList.length >= 1"
          :class="{ both: tradeList.length > 0 }"
        >
          <h1>서버 - {{ serverName }}총 {{ mercList.length }}건 용병 검색</h1>
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
              <tr v-for="(item, index) in mercList" :key="index">
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
                <td class="username">{{ numberWithCommas(item.price) }}전</td>
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
import chartData from '@/util/chart';
import { getTradeListAvg } from '@/api/trade';

import Chart from 'chart.js';
export default {
  props: ['tradeList', 'typeSelect', 'serverSelect', 'inputData', 'mercList'],
  data() {
    return {
      serverName: '',
      chartData: chartData,
      itemData: null,
    };
  },
  components: {
    modal,
  },
  async mounted() {
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
      case '4':
        this.serverName = '청룡';
        break;
      case '5':
        this.serverName = '봉황';
        break;
      case '6':
        this.serverName = '해태';
        break;
      case '7':
        this.serverName = '세종';
        break;
      case '8':
        this.serverName = '신구';
        break;
      case '9':
        this.serverName = '단군';
        break;
      case '10':
        this.serverName = '비호';
        break;
      case '11':
        this.serverName = '태극';
        break;
      case '12':
        this.serverName = '화랑';
        break;
      case '13':
        this.serverName = '태황';
        break;
    }
    let { data } = await getTradeListAvg({
      server: this.serverSelect,
      inputData: this.inputData,
      type: 1,
    });
    this.itemData = data;
    if (this.typeSelect != 2 && this.itemData[0].hasOwnProperty('series')) {
      this.itemData[0].series.reverse();
      this.createChart('minmaxCanvas', this.chartData);
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    createChart(charId, chartData) {
      const ctx = document.getElementById(charId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      }); // 추가된 부분 끝

      myChart.data.datasets[0].data = this.itemData[0].series
        .slice(0, 10)
        .reverse()
        .map(x => x.value);
      myChart.data.labels = this.itemData[0].series
        .slice(0, 10)
        .reverse()
        .map(x => x.time);
      myChart.update();
      console.log(myChart.data.datasets[0].data);
    },
  },
};
</script>
<style scoped src="@/assets/css/modal.css"></style>
