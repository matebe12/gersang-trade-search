<template>
  <modal @closeModal="closeModal">
    <template slot="title">
      <span>육의전 정보</span>
    </template>
    <template slot="close">
      <span class="close" @click="closeModal">X</span>
    </template>
    <template slot="content">
      <div v-if="tradeList.length < 1 && mercList.length < 1">
        <h1>해당 검색어의 아이템 목록이 없습니다.</h1>
      </div>
      <div v-if="tradeList.length >= 1 && typeSelect == 1">
        <div class="content-table">
          <h1 class="total_cnt">
            서버 - {{ serverName }} 총 {{ tradeList.length }}건 검색
          </h1>
          <canvas id="minmaxCanvas" style="height:100px"></canvas>
          <item :tradeList="tradeList" />
        </div>
      </div>
      <div v-if="mercList.length >= 1 && typeSelect == 3">
        <div class="content-table">
          <h1>서버 - {{ serverName }}총 {{ mercList.length }}건 용병 검색</h1>
          <merc :mercList="mercList" />
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
          <item :tradeList="tradeList" />
        </div>
        <div
          class="content-table"
          v-if="mercList.length >= 1"
          :class="{ both: tradeList.length > 0 }"
        >
          <h1>서버 - {{ serverName }}총 {{ mercList.length }}건 용병 검색</h1>
          <merc :mercList="mercList" />
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import modal from '@/components/common/modal';
import item from '@/components/common/item';
import merc from '@/components/common/merc';
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
    item,
    merc,
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

    if (this.typeSelect == 1) {
      let { data } = await getTradeListAvg({
        server: this.serverSelect,
        inputData: this.inputData,
        type: 1,
      });
      this.itemData = data;
    }

    if (this.typeSelect == 1 && this.itemData[0].hasOwnProperty('series')) {
      this.itemData[0].series.reverse();
      if (this.chartData.length > 0)
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
    },
  },
};
</script>
<style scoped src="@/assets/css/modal.css"></style>
