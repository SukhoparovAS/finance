<template>
  <div class="choice-wallet popup">
    <div class="choice-wallet__title title">Выберете валюту</div>
    <form action="" class="choice-wallet__form">
      <ul class="choice-wallet__wallet-list">
        <li
          class="choice-wallet__list-item"
          v-for="currency in currencies"
          :key="currency.id"
        >
          <div class="choice-wallet__radio-btn">
            <input
              type="radio"
              name="wallet"
              :id="`radio_${currency.id}`"
              :value="currency.id"
              v-model="selectedCurrency"
              class="choice-wallet__radio-input"
            />
            <label
              :for="`radio_${currency.id}`"
              class="choice-wallet__radio-label"
            ></label>
          </div>
          <img
            :src="currency.image"
            alt=""
            class="choice-wallet__wallet-icon"
          />
          <div>
            <div class="choice-wallet__wallet-name">
              {{ currency.longName }}
            </div>
          </div>
        </li>
      </ul>
      <AppSelectBtns @cancel="close" @select="selectCurrency" />
    </form>
  </div>
</template>
  
  <script>
import AppSelectBtns from "@/components/AppSelectBtns.vue";

export default {
  data() {
    return {
      selectedCurrency: 1,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    selectCurrency() {
      this.$emit("selectCurrency", this.selectedCurrency);
    },
  },
  computed: {
    currencies() {
      return this.$store.getters.getCurrencies;
    },
  },
  mounted() {},
  components: {
    AppSelectBtns,
  },
};
</script>
  
  <style scoped>
.choice-wallet__wallet-icon {
  width: 30px;
  height: 30px;
}
</style>
