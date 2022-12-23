<template>
  <div class="calendar popup">
    <div
      class="datepicker-here"
      data-position="right top"
      id="shufutinsky"
    ></div>
    <AppSelectBtns @cancel="$emit('cancel')" @select="selectDate" />
  </div>
</template>

<script>
import AirDatepicker from "air-datepicker";
import localeRu from "air-datepicker/locale/ru";
import AppSelectBtns from "@/components/AppSelectBtns.vue";
import "air-datepicker/air-datepicker.css";

export default {
  components: {
    AppSelectBtns,
  },
  props: {
    minView: {
      default: "day",
    },
  },
  data() {
    return {
      date: null,
    };
  },
  methods: {
    selectDate() {
      let dates = this.date.selectedDates;

      if (dates && dates.length == 1) {
        dates[1] = dates[0];
      }
      if (!dates.length) {
        dates[0] = dates[1] = new Date();
      }
      this.$emit("select", dates);
    },
  },
  mounted() {
    let minView = "days";
    let range = false;
    switch (this.minView) {
      case "day":
        minView = "days";
        break;
      case "month":
        minView = "months";
        break;
      case "year":
        minView = "years";
        break;
      case "period":
        range = true;
    }

    const startDate = new Date();
    const maxDate = new Date();

    this.date = new AirDatepicker("#shufutinsky", {
      locale: localeRu,
      isMobile: true,
      autoClose: true,
      maxDate,
      view: minView,
      minView,
      range,
      selectedDates: [startDate],
    });
  },
};
</script>

<style scoped>
</style>
