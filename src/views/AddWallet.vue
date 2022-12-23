<template>
  <ViewTitle title="ДОБАВЛЕНИЕ СЧЕТА" />
  <form action="" class="add-wallet form">
    <AppInput
      type="number"
      name="balance"
      placeholder="1000"
      v-model="v$.balance.$model"
      :errorMessages="errorsBy('balance')"
      class="add-wallet__input"
    >
      <span clas="base-currency">{{ selectedCurrency }}</span>
    </AppInput>
    <div class="add-wallet__name">
      <label for="wallet-name" class="add-wallet__name-label">
        Имя счёта
      </label>
      <AppInput
        type="text"
        id="wallet-name"
        name="wallet-name"
        placeholder="введите имя счёта"
        v-model="v$.name.$model"
        :errorMessages="errorsBy('name')"
        class="add-wallet__input"
      />
    </div>
    <div class="add-wallet__icon-select">
      <AppIconSelect :itemList="iconList" @select="changeIcon" />
    </div>
    <div class="add-wallet__currency" @click="openCoiceCurrency = true">
      <div class="add-wallet__currency-label">Выбор валюты</div>
      <div class="add-wallet__currency-selection currency-selection">
        <div class="currency-selection__currency">{{ selectedCurrency }}</div>
        <span></span>
      </div>
    </div>
    <button
      class="add-wallet__submot-btn submit-btn"
      @click.prevent="createWallet"
    >
      добавить
    </button>
  </form>
  <Teleport to=".wrapper">
    <AppChoiceCurrency
      v-if="openCoiceCurrency"
      @close="openCoiceCurrency = false"
      @selectCurrency="changeCurrency"
    />
  </Teleport>
</template>

<script>
import ViewTitle from "@/components/AppViewTitle.vue";
import AppIconSelect from "@/components/AppIconSelect.vue";
import AppChoiceCurrency from "@/components/AppChoiceCurrency.vue";
import AppInput from "@/components/AppInput.vue";
import inputValidationMixin from "@/mixins/inputValidationMixin";

export default {
  mixins: [inputValidationMixin],
  validations() {
    return {
      balance: {
        required: this.defaultReqired,
        numeric: this.defaultNumeric,
      },
      name: { required: this.defaultReqired },
      icon_id: { required: this.defaultReqired },
      currency_id: { required: this.defaultReqired },
    };
  },
  data() {
    return {
      icon_id: "",
      name: "",
      balance: "",
      currency_id: "1",
      openCoiceCurrency: false,
    };
  },
  methods: {
    changeIcon(icon) {
      console.log(icon);
      this.icon_id = icon;
    },
    changeCurrency(id) {
      this.openCoiceCurrency = false;
      this.currency_id = id;
    },
    async createWallet() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("balance", this.balance);
      formData.append("icon_id", this.icon_id);
      formData.append("currency_id", this.currency_id);
      this.$store.dispatch("POST_Wallet", formData);
      this.$router.push("/");
      this.$store.commit("addMessage", {
        type: "message",
        text: "Добавлена новый счёт.",
      });
    },
  },
  components: {
    ViewTitle,
    AppIconSelect,
    AppChoiceCurrency,
    AppInput,
  },
  computed: {
    iconList() {
      return this.$store.getters.getIcons;
    },
    selectedCurrency() {
      return this.$store.getters.getCurrencies.find(
        (cur) => cur.id == this.currency_id
      ).name;
    },
  },
};
</script>

<style scoped>
</style>
