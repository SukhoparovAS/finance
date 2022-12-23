<template>
  <div class="transaction-amount__pie-chart" id="pie-chart">
    <div class="transaction-amount__summ">
      {{ operationsSum }}
      <span class="base-currency" v-if="selectedWallet">
        {{ selectedWallet.currency }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pie: null,
    };
  },
  props: ["operationsList", "currency"],
  mounted() {
    this.drawPie();
  },
  computed: {
    selectedWallet() {
      return this.$store.getters.getSelectedWallet;
    },
    pieData() {
      if (this.operationsList.length > 0) {
        return this.operationsList
          .map((item) => {
            return {
              value: item.percent,
              color: item.color,
            };
          })
          .sort((a, b) => a.value - b.value);
      } else {
        return [
          {
            value: 100,
            color: "#76A3E7",
          },
        ];
      }
    },
    operationsSum() {
      return this.operationsList.reduce((acc, item) => {
        return (acc += item.sum);
      }, 0);
    },
  },
  methods: {
    createPie(container, chartData, config = {}) {
      const svgns = "http://www.w3.org/2000/svg";
      const offsetRatio = {
        top: 0.25,
        right: 0,
        left: 0.5,
        bottom: -0.25,
      };

      const strokeWidth = config.strokeWidth || 5;
      const radiusValue = config.radius || 100;
      const radius = radiusValue - strokeWidth / 2;
      const fullSize = 2 * radiusValue;

      // длина окружности
      const length = 2 * Math.PI * radius;

      // смещение начальной точки
      let startPoint = config.start in offsetRatio ? config.start : "top";
      const chartOffset = length * offsetRatio[startPoint];

      // расчетные данные для построения секторов
      const sectors = [];
      chartData.forEach((sectorData, sectorIndex) => {
        // Длина сектора
        const width = (length * sectorData.value) / 100;
        // Смещение сектора от начальной точки
        let offset = chartOffset;

        if (sectorIndex > 0) {
          let prevSector = sectors[sectorIndex - 1];
          offset = prevSector.offset - prevSector.width;
        }

        sectors.push({
          ...sectorData,
          width,
          offset,
        });
      });

      const svg = createSvgElement("svg", {
        viewBox: `0 0 ${fullSize} ${fullSize}`,
        fill: "none",
        width: fullSize,
        height: fullSize,
      });

      sectors.forEach((sector) => {
        const circle = createSvgElement("circle", {
          cx: radius + strokeWidth / 2,
          cy: radius + strokeWidth / 2,
          r: radius,
          "stroke-dasharray": `${sector.width} ${length - sector.width}`,
          "stroke-dashoffset": sector.offset,
          stroke: sector.color,
          "stroke-width": strokeWidth,
        });

        svg.appendChild(circle);
      });

      container.appendChild(svg);
      this.pie = svg;
      function createSvgElement(elementName, attrs = {}) {
        const el = document.createElementNS(svgns, elementName);
        Object.entries(attrs).forEach(([attrName, attrValue]) => {
          el.setAttributeNS(null, attrName, attrValue);
        });
        return el;
      }
    },
    drawPie() {
      if (this.pie) {
        this.pie.remove();
      }
      this.createPie(document.getElementById("pie-chart"), this.pieData, {
        strokeWidth: 40,
        radius: 120,
        start: "top", // top|left|right|bottom
      });
    },
  },
  watch: {
    operationsList() {
      this.drawPie();
    },
  },
};
</script>

<style>
</style>
