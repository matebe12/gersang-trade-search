<template>
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
                item.hasOwnProperty('image_url') && item.image_url !== null,
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
</template>

<script>
export default {
  props: ['mercList'],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style></style>
