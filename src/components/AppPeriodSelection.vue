<template>
  <ul class="transaction-amount__periods-list periods-list">
    <li
      class="periods-list__item"
      :class="[{ 'periods-list__item--active': btn.name == selectedPeriod }]"
      v-for="btn in periodButtons"
      :key="btn.name"
      @click="periodSelection(btn)"
    >
      {{ btn.text }}
    </li>
  </ul>
  <div class="transaction-amount__period" @click="openCalendar = true">
    <div>
      {{ dateString }}
      <span></span>
    </div>
  </div>
  <Teleport to=".wrapper">
    <AppCalendar
      v-if="openCalendar"
      @select="selectDate"
      @cancel="closeCalendar"
      :min-view="selectedPeriod"
    />
  </Teleport>
</template>

<script>
import AppCalendar from "./AppCalendar.vue";

export default {
  components: {
    AppCalendar,
  },
  emits: ["periodSelect"],
  data() {
    return {
      periodButtons: [
        {
          text: "день",
          name: "day",
          active: true,
        },
        {
          text: "месяц",
          name: "month",
        },
        {
          text: "год",
          name: "year",
        },
        {
          text: "период",
          name: "period",
        },
      ],
      openCalendar: false,
      selectedDates: [new Date(), new Date()],
      selectedPeriod: "day",
    };
  },
  mounted() {
    this.selectedDates = this.$store.getters.getPeriod.selectedDates
    this.selectedPeriod = this.$store.getters.getPeriod.selectedPeriod
    this.$emit("periodSelect", this.selectedDates, this.selectedPeriod);
  },
  methods: {
    closeCalendar() {
      this.openCalendar = false;
    },
    periodSelection(btn) {
      this.selectedPeriod = btn.name;
      if (this.selectedPeriod == "period") {
        this.openCalendar = true;
      } else {
        console.log(this.selectedPeriod);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.$store.commit('setPeriod', {selectedDates: this.selectedDates, selectedPeriod: this.selectedPeriod})
        this.$emit("periodSelect", this.selectedDates, this.selectedPeriod);                                        ///Дубль
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    },
    selectDate(dates) {
      this.openCalendar = false;
      if (dates.length) {
        this.selectedDates = dates;
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.$store.commit('setPeriod', {selectedDates: this.selectedDates, selectedPeriod: this.selectedPeriod})
        this.$emit("periodSelect", this.selectedDates, this.selectedPeriod);                                    ///Дубль
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    },
  },
  computed: {
    dateString() {
      const monthList = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "декабря",
      ];
      const selectedDates = this.selectedDates;

      const day = selectedDates[0].getDate();
      const month = monthList[selectedDates[0].getMonth()];
      const year = selectedDates[0].getFullYear();
      const day2 = selectedDates[1].getDate();
      const month2 = monthList[selectedDates[1].getMonth()];

      switch (this.selectedPeriod) {
        case "period":
          return `${day} ${month} - ${day2} ${month2}`;
        case "day":
          return `${day} ${month} ${year}`;
        case "year":
          return `${year}`;
        case "month":
          return `${month} ${year}`;
      }
    },
  },
};
</script>

<style>
</style>
