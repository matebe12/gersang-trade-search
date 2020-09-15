<template>
  <modal>
    <template slot="title">
      <span>사통팔달 정보</span>
    </template>
    <template slot="close">
      <span class="close" @click="closeModal">X</span>
    </template>
    <template slot="content">
      <div v-if="satongList.length < 1">
        <h1>해당 검색어의 목록이 없습니다.</h1>
      </div>
      <div v-if="satongList.length >= 1">
        <div class="content-table">
          <h1>서버 - {{ serverName }} 총 {{ satongList.length }}건 검색</h1>
          <table>
            <thead>
              <th>이름</th>
              <th>내용</th>
              <th>시간</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in satongList" :key="index">
                <td class="item_content">{{ item.user_name }}</td>
                <td class="item_content">{{ item.message }}</td>
                <td class="item_content">
                  {{ dateTimeToFormatted(item.timestamp) }}
                </td>
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
  props: ['satongList', 'typeSelect', 'serverSelect'],
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
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    dateTimeToFormatted(dt) {
      let min = 60 * 1000;
      let c = new Date();
      let d = new Date(dt);
      let minsAgo = Math.floor((c - d) / min);

      let result = {
        raw:
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1 > 9 ? '' : '0') +
          (d.getMonth() + 1) +
          '-' +
          (d.getDate() > 9 ? '' : '0') +
          d.getDate() +
          ' ' +
          (d.getHours() > 9 ? '' : '0') +
          d.getHours() +
          ':' +
          (d.getMinutes() > 9 ? '' : '0') +
          d.getMinutes() +
          ':' +
          (d.getSeconds() > 9 ? '' : '0') +
          d.getSeconds(),
        formatted: '',
      };

      if (minsAgo < 60) {
        // 1시간 내
        result.formatted = minsAgo + '분 전';
      } else if (minsAgo < 60 * 24) {
        // 하루 내
        result.formatted = Math.floor(minsAgo / 60) + '시간 전';
      } else {
        // 하루 이상
        result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
      }

      return result.formatted;
    },
  },
};
</script>
