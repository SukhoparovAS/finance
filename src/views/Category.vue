<template>
  <AppViewTitle title="ДОБАВЛЕНИЕ  КАТЕГОРИЙ" />
  <OperationTypeSelect />
  <form action="" class="add-category-form form">
    <AppInput
      type="text"
      name="category-name"
      placeholder="Название категории"
      v-model="v$.name.$model"
      :errorMessages="errorsBy('name')"
      class="add-category-form__name-input"
    />
    <div class="add-category-form__icon-selection">
      <AppIconSelect
        :itemList="iconList"
        class="add-category-form__icon-list"
        @select="changeIcon"
      />
    </div>
    <AppColorPicker :colorsList="colorList" @changeColor="changeColor" />
    <button
      class="add-category-form__submit-btn submit-btn"
      @click.prevent="createCategory"
    >
      добавить
    </button>
  </form>
</template>

<script>
import AppViewTitle from "@/components/AppViewTitle";
import AppColorPicker from "@/components/AppColorSelect.vue";
import AppIconSelect from "@/components/AppIconSelect.vue";
import AppInput from "@/components/AppInput.vue";
import operationTypeMixin from "@/mixins/operationTypeMixin";
import inputValidationMixin from "@/mixins/inputValidationMixin";

export default {
  mixins: [operationTypeMixin, inputValidationMixin],
  components: {
    AppViewTitle,
    AppIconSelect,
    AppColorPicker,
    AppInput,
  },

  validations() {
    return {
      name: { required: this.defaultReqired },
      icon_id: { required: this.defaultReqired },
      categoryColor: { required: this.defaultReqired },
    };
  },
  data() {
    return {
      categoryColor: "",
      name: "",
      icon_id: "",
    };
  },
  methods: {
    changeColor(color) {
      this.categoryColor = color;
    },
    changeIcon(icon) {
      this.icon_id = icon;
    },
    async createCategory() {
      if (!(await this.v$.$validate())) {
        if (this.errorsBy("icon_id").length) {
          this.$store.commit("addMessage", {
            type: "error",
            text: "Иконка не выбрана.",
          });
        }
        if (this.errorsBy("categoryColor").length) {
          this.$store.commit("addMessage", {
            type: "error",
            text: "Цвет категории не выбран.",
          });
        }
        return;
      }
      const formData = new FormData();
      formData.append("type", this.operationType);
      formData.append("color", this.categoryColor);
      formData.append("name", this.name);
      formData.append("icon_id", this.icon_id);
      await this.$store.dispatch("POST_Categories", formData);
      this.$router.push("/AddOperation");
      this.$store.commit("addMessage", {
        type: "message",
        text: "Добавлена новая категоря.",
      });
    },
  },
  computed: {
    iconList() {
      return this.$store.getters.getIcons.map((item) => {
        if (this.icon_id && this.categoryColor) {
          if (this.icon_id == item.id) {
            item.color = this.categoryColor;
          } else {
            delete item.color;
          }
        } else {
            delete item.color;
        }
        return item;
      });
    },
    colorList() {
      return this.$store.getters.getColors.map((item) => item.color);
    },
  },
};
</script>

<style>
</style>
