<template>
  <AppHeader></AppHeader>
  <main>
    <operation-type-select />
    <TheOperationsAmount>
      <ThePieChartVue
        :operation-type="operationType"
        :operationsList="operations"
      />
      <template v-slot:periodSelection>
        <AppPeriodSelection @periodSelect="setDates" />
      </template>
    </TheOperationsAmount>
    <AppOperationsList :operationList="operations" />
  </main>
</template>

<script>
import AppHeader from "@/components/header/AppHeader.vue";
import TheOperationsAmount from "@/components/TheOperationsAmount.vue";
import AppOperationsList from "@/components/AppOperationsList.vue";
import AppPeriodSelection from "@/components/AppPeriodSelection.vue";
import ThePieChartVue from "@/components/ThePieChart.vue";
import operationTypeMixin from "@/mixins/operationTypeMixin";

export default {
  mixins: [operationTypeMixin],
  methods: {
    setDates(dates, period) {
      this.selectedDates = dates;
      this.period = period;
    },
    //////////////////////////////Дубликат из datePicker
    dateFormatting(date, ofset = 0) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = this.dayFormating(date.getDate());
      return `${year}-${month}-${day}`;
    },
    dayFormating(day) {
      return day > 10 ? day : "0" + day;
    },
    ////////////////////////////////
  },
  data() {
    return {
      selectedDates: [new Date()],
      period: "day",
    };
  },
  computed: {
    selectedWallet() {
      return this.$store.getters.getSelectedWallet;
    },
    operations() {
      let operations = [];
      const operationsSum = [];

      if (this.operationType == "expenses") {
        operations = this.$store.getters.getTransactionsExpenses;
      }
      if (this.operationType == "income") {
        operations = this.$store.getters.getTransactionsIncomes;
      }
      operations = operations.filter((item) => {
        let dateMatch = false;
        const itemDate = new Date(item.date);
        const firstSelectedDate = this.selectedDates[0];

        switch (this.period) {
          case "day":
            dateMatch =
              itemDate.setHours(0, 0, 0, 0) ==
              firstSelectedDate.setHours(0, 0, 0, 0);
            break;
          case "month":
            dateMatch = itemDate.getMonth() == firstSelectedDate.getMonth();
            break;
          case "year":
            dateMatch =
              itemDate.getFullYear() == firstSelectedDate.getFullYear();
            break;
          case "period":
            const lastSelectedDate = this.selectedDates[1].setHours(0, 0, 0, 0);
            itemDate.setHours(0, 0, 0, 0);
            dateMatch =
              firstSelectedDate <= itemDate && lastSelectedDate >= itemDate;
        }

        return item.wallet_id == this.selectedWallet.id && dateMatch;
      });
      operations.forEach((operation) => {
        const index = operationsSum.findIndex(
          (el) => el.category_id == operation.category_id
        );
        if (index >= 0) {
          operationsSum[index].sum += operation.sum;
        } else {
          let operationClone = {};
          for (let key in operation) {
            operationClone[key] = operation[key];
          }
          operationsSum.push(operationClone);
        }
      });
      return operationsSum.map((item) => {
        const category = this.$store.getters.getCategories.find(
          (category) => category.id == item.category_id
        );
        return {
          id: item.id,
          category: category.name,
          percent: (
            (item.sum /
              operationsSum.reduce((acc, operation) => {
                return (acc += operation.sum);
              }, 0)) *
            100
          ).toFixed(2),
          sum: item.sum,
          image: this.$store.getters.getIcons.find(
            (icon) => icon.id == category.icon_id
          ).image,
          color: category.color,
          wallet_id: item.wallet_id,
          date: item.date,
        };
      });
    },
  },
  components: {
    AppHeader,
    TheOperationsAmount,
    AppOperationsList,
    ThePieChartVue,
    AppPeriodSelection,
  },
};
</script>
