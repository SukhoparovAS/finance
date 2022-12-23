<template>
  <header class="header">
    <header-burger></header-burger>
    <wallet-selection></wallet-selection>
    <back-button v-if="backButton" />
    <operations-button v-else />
  </header>
</template>

<script>
import WalletSelection from "@/components/header/AppWalletSelection.vue";
import HeaderBurger from "@/components/header/AppBurger.vue";
import OperationsButton from "@/components/header/AppOperationListButton.vue";
import BackButton from "@/components/header/AppBackButton.vue";

export default {
  props: ["backButton"],
  components: {
    WalletSelection,
    HeaderBurger,
    OperationsButton,
    BackButton,
  },
};
</script>
