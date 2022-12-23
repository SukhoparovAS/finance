<template>
  <AppHeader :back-button="true" />

  <operation-type-select />
  <section class="add-operation">
    <div>
      <AppInput
        type="number"
        name="sum"
        placeholder="1000"
        v-model="v$.sum.$model"
        :errorMessages="errorsBy('sum')"
        class="add-operation__iput"
      >
        <span clas="base-currency" v-if="selectedWallet">{{
          selectedWallet.currency
        }}</span>
      </AppInput>
    </div>
    <AppIconSelect
      :itemList="categories"
      :add-button-ref="'/AddCategory'"
      @select="categorySelect"
    />
    <AppDatePicker @setDate="setDate" class="add-operation__date-picker" />
    <button
      class="submit-btn add-operation__submit-btn"
      @click.prevent="createOperation"
    >
      добавить
    </button>
  </section>
</template>

<script>
import AppHeader from "@/components/header/AppHeader.vue";
import AppIconSelect from "@/components/AppIconSelect.vue";
import AppDatePicker from "@/components/AppDatePicker.vue";
import AppInput from "@/components/AppInput.vue";
import operationTypeMixin from "@/mixins/operationTypeMixin";
import inputValidationMixin from "@/mixins/inputValidationMixin";

export default {
  mixins: [operationTypeMixin, inputValidationMixin],
  components: {
    AppHeader,
    AppIconSelect,
    AppDatePicker,
    AppInput,
  },
  validations() {
    return {
      sum: {
        required: this.defaultReqired,
        numeric: this.defaultNumeric,
      },

      category: { required: this.defaultReqired },
    };
  },
  data() {
    return {
      date: "",
      category: "",
      sum: "",
    };
  },
  methods: {
    setDate(date) {
      this.date = date;
    },
    categorySelect(id) {
      this.category = id;
    },
    async createOperation() {
      if (!(await this.v$.$validate())) {
        if (this.errorsBy("category").length) {
          this.$store.commit("addMessage", {
            type: "error",
            text: "Категория не выбрана.",
          });
        }
        return;
      }
      const formData = new FormData();
      const wallet_id = this.selectedWallet.id;
      formData.append("wallet_id", wallet_id);
      formData.append("type", this.operationType);
      formData.append("category_id", this.category);
      formData.append("sum", this.sum);
      formData.append("date", this.date);
      this.$store.dispatch("POST_Transaction", formData);
      this.$router.push("/");
    },
  },
  computed: {
    categories() {
      const categories = this.$store.getters.getCategories.filter((item) => {
        if (item.type == this.operationType) {
          item.image = this.$store.getters.getIcons.find(
            (icon) => icon.id == item.icon_id
          ).image;
          return true;
        }
      });
      return categories;
    },
    selectedWallet() {
      return this.$store.getters.getSelectedWallet;
    },
  },
};
</script>
