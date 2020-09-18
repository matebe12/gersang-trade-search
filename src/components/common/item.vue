<template>
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
        <td v-if="item.hasOwnProperty('image_url') && item.image_url !== null">
          <img
            :src="item.image_url"
            :class="{
              'item-img':
                item.hasOwnProperty('image_url') && item.image_url !== null,
            }"
          />
        </td>
        <td v-else>
          <img :src="require('@/assets/basic.jpg')" class="item-img" />
        </td>
        <td class="item_content">{{ item.item_name }}</td>
        <td class="item_content">{{ item.quantity }}</td>
        <td class="item_content">{{ numberWithCommas(item.price) }}전</td>
        <td class="item_content">{{ item.user_name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['tradeList'],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style></style>
