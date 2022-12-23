<template>
  <ul class="transaction-list list">
    <li
      class="list__item"
      v-for="operation in list"
      :key="operation.id"
      :style="`color: ${operation.color}`"
    >
      <div class="list__item-left">
        <img :src="operation.image" alt="sport icon" class="list__item-icon" />
        <div class="list__item-name">
          {{ operation.category }}
        </div>
      </div>
      <div class="list__item-right">
        <div class="list__item-percent">{{ operation.percent }}%</div>
        <div class="list__item-summ">
          {{ operation.sum }}
          <span class="base-currency">{{ currency }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    operationList: {
      require: true,
      default: [],
    },
  },
  computed: {
    list() {
      return this.operationList.map((item) => {
        if (+item.sum > 100000) {
          item.sum = +item.sum / 1000 + "k";
        }
        return item;
      });
    },
    currency() {
      return this.$store.getters.getSelectedWallet.currency;
    },
  },
};
</script>

<style>
</style>
