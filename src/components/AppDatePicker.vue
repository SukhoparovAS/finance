<template>
  <section class="date-picker">
    <button
      class="date-picker__date-btn"
      v-for="btn in dateButtons"
      :key="btn.date"
      @click="setDate(btn.date)"
      :class="[{ 'date-picker__date-btn--active': date == btn.date }]"
    >
      <div class="date-picker__date">
        {{ btn.dateString }}
      </div>
      <div class="date-picker__text">
        {{ btn.text }}
      </div>
    </button>

    <button class="date-picker__calendar-btn" @click="openCalendar = true">
      <img
        src="@/img/calendar.svg"
        alt=""
        class="date-picker__calendar-btn-icon"
      />
    </button>
    <teleport to=".wrapper">
      <AppCalendar
        v-if="openCalendar"
        @cancel="closeCalendar"
        @select="selectDate"
      />
    </teleport>
  </section>
</template>

<script>
import AppCalendar from "@/components/AppCalendar";

export default {
  components: {
    AppCalendar,
  },
  data() {
    return {
      date: this.dateFormatting(new Date()),
      dateButtons: [
        {
          dateString: this.today(),
          text: "сегодня",
          date: this.dateFormatting(new Date()),
        },
        {
          dateString: this.today(-1),
          text: "вчера",
          date: this.dateFormatting(new Date(), -1),
        },
        {
          dateString: this.today(-2),
          text: "позавчера",
          date: this.dateFormatting(new Date(), -2),
        },
      ],
      openCalendar: false,
    };
  },
  methods: {
    closeCalendar() {
      this.openCalendar = false;
    },
    selectDate(dates) {
      this.setDate(this.dateFormatting(dates[0]));
      this.openCalendar = false;
    },
    dateFormatting(date, ofset = 0) {
      date.setDate(date.getDate() + ofset);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = this.dayFormating(date.getDate());
      return `${year}-${month}-${day}`;
    },
    dayFormating(day) {
      return day >= 10 ? day : "0" + day;
    },
    today(ofset = 0) {
      let date = new Date();
      date.setDate(date.getDate() + ofset);
      const stringDate = `${this.dayFormating(date.getDate())}.${
        date.getMonth() + 1
      }`;
      return stringDate;
    },
    setDate(date) {
      this.date = date;
      this.$emit("setDate", date);
    },
  },
  computed: {},
  mounted() {
    this.setDate(this.date);
  },
};
</script>

<style>
</style>
