<template>
  <div class="choice-wallet popup">
    <div class="choice-wallet__title title">Выберете счёт</div>
    <form action="" class="choice-wallet__form">
      <ul class="choice-wallet__wallet-list">
        <li
          class="choice-wallet__list-item"
          v-for="wallet in wallets"
          :key="wallet.id"
        >
          <div class="choice-wallet__radio-btn">
            <input
              type="radio"
              name="wallet"
              :id="`radio_${wallet.id}`"
              :value="wallet.id"
              v-model="selectedWallet"
              class="choice-wallet__radio-input"
            />
            <label
              :for="`radio_${wallet.id}`"
              class="choice-wallet__radio-label"
            ></label>
          </div>
          <img :src="wallet.image" alt="" class="choice-wallet__wallet-icon" />
          <div>
            <div class="choice-wallet__wallet-name">{{ wallet.name }}</div>
            <div class="choice-wallet__wallet-ballance">
              {{ wallet.balance
              }}<span class="base-currency">{{ wallet.currency }}</span>
            </div>
          </div>
        </li>
        <li class="choice-wallet__list-item--center">
          <router-link to="/AddWallet">
            <add-button @click="close" />
          </router-link>
        </li>
      </ul>
      <AppSelectBtns @cancel="close" @select="selectWallet" />
    </form>
  </div>
</template>

<script>
import AppSelectBtns from "@/components/AppSelectBtns.vue";

export default {
  data() {
    return {
      selectedWallet: 1,
    };
  },
  methods: {
    close() {
      this.$store.commit("setIsOpenChoiceWallet", false);
    },
    selectWallet() {
      this.$store.commit("setSelectedWallet", this.selectedWallet);
      this.close();
    },
  },
  computed: {
    wallets() {
      return this.$store.getters.getWallets;
    },
  },
  mounted() {
    this.selectedWallet = this.$store.getters.getSelectedWallet.id;
  },
  components: {
    AppSelectBtns,
  },
};
</script>

<style>
</style>
