<template>
  <div
    class="header__wallet-selection wallet-selection"
    @click="change"
    v-if="selectedWallet"
  >
    <div class="wallet-selection__container">
      <img
        :src="selectedWallet.image"
        alt="wallet icon"
        class="wallet-selection__icon"
      />
      <span class="wallet-selection__wallet-name">
        {{ selectedWallet.name }}
      </span>
      <span class="wallet-selection__select-arrow"></span>
    </div>
    <div class="wallet-selection__balance">
      {{ selectedWallet.balance
      }}<span class="base-currency">{{ selectedWallet.currency }}</span>
    </div>
  </div>
  <teleport to=".wrapper">
    <AppChoiceWallet v-if="isOpenChoiceWallet" />
  </teleport>
</template>

<script>
import AppChoiceWallet from "@/components/AppChoiceWallet.vue";

export default {
  methods: {
    change() {
      this.$store.commit("setIsOpenChoiceWallet", true);
    },
  },
  computed: {
    selectedWallet() {
      return this.$store.getters.getSelectedWallet;
    },

    isOpenChoiceWallet() {
      return this.$store.getters.getIsOpenChoiceWallet;
    },
  },
  components: {
    AppChoiceWallet,
  },
};
</script>

<style scoped>
</style>
