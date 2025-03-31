<script>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import MetricCards from "@/components/MetricCards.vue";
import Pagination from "@/components/Pagination.vue";
import {
  fetchMetrics,
  fetchWeeklyRatings,
  fetchWeeklyPricings,
} from "@/services/metricsService";
import dayjs from "dayjs";

export default {
  name: "Retailers Metrics Dashboard",
  components: {
    GradientLineChart,
    MetricCards,
    Pagination
  },
  mounted() {
    this.handleMetricsFetch();
    this.handleWeeklyRatingsFetch();
    this.handleWeeklyPricingssFetch();
  },
  data() {
    return {
      metrics: [],
      pagination: [],
      filters: {
        dataPerPage: 9,
        page: 1,
        start_date: null,
        end_date: null,
      },
      ratingChartData: {
        labels: [],
        datasets: [],
      },
      pricingChartData: {
        labels: [],
        datasets: [],
      },
    };
  },
  methods: {
    setPage(newPage) {
      this.filters.page = newPage;
      this.handleMetricsFetch();
    },
    async handleMetricsFetch() {
      try {
        const res = await fetchMetrics(this.filters);

        if (res.success) {
          this.metrics = res.data;
          this.pagination = res.meta;
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    },
    async handleWeeklyRatingsFetch() {
      try {
        const res = await fetchWeeklyRatings();

        if (res.success) {
          this.createRatingCharData(res.data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    },
    async handleWeeklyPricingssFetch() {
      try {
        const res = await fetchWeeklyPricings();

        if (res.success) {
          this.createPricingCharData(res.data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    },
    createRatingCharData(metrics) {
      this.ratingChartData.datasets = [];

      const uniqueDates = [
        ...new Set(
          metrics.flatMap((m) =>
            m.avg_ratings.map((r, i) =>
              dayjs()
                .subtract(6 - i, "day")
                .format("YYYY-MM-DD")
            )
          )
        ),
      ].sort();

      this.ratingChartData.labels = uniqueDates;

      metrics.forEach((metric, i) => {
        const ratingMap = new Map(
          metric.avg_ratings.map((r, i) => [
            dayjs()
              .subtract(6 - i, "day")
              .format("YYYY-MM-DD"),
            r,
          ])
        );

        this.ratingChartData.datasets.push({
          label: metric.retailer_title,
          data: uniqueDates.map((date) => ratingMap.get(date) ?? null),
          borderColor: `rgba(${i * 50 + 75}, 100, 192, 1)`,
          fill: false,
        });
      });
    },

    createPricingCharData(metrics) {
      this.pricingChartData.datasets = [];

      const uniqueDates = [
        ...new Set(metrics.flatMap((m) => m.avg_prices.map((p) => p.date))),
      ].sort();

      this.pricingChartData.labels = uniqueDates;

      metrics.forEach((metric, i) => {
        const priceMap = new Map(
          metric.avg_prices.map((p) => [p.date, p.avg_price])
        );

        this.pricingChartData.datasets.push({
          label: metric.retailer_title,
          data: uniqueDates.map((date) => priceMap.get(date) ?? null),
          borderColor: `rgba(${i * 50 + 75}, 100, 192, 1)`,
          fill: false,
        });
      });
    },
  },
  watch: {
    "filters.page": function () {
      this.handleMetricsFetch();
    },
  },
};
</script>

<template>
  <div class="py-4 container-fluid flex-grow-1">
    <div class="row">
      <div class="col-lg-6 mb-lg">
        <div v-if="ratingChartData.datasets.length > 0" class="card z-index-2">
          <gradient-line-chart
            id="rating-charts"
            title="Weekly Ratings Overview"
            :chart="ratingChartData"
          />
        </div>
      </div>

      <div class="col-lg-6 mb-lg">
        <div v-if="pricingChartData.datasets.length > 0" class="card z-index-2">
          <gradient-line-chart
            id="pricing-charts"
            title="Weekly Pricing Overview"
            :chart="pricingChartData"
          />
        </div>
      </div>
    </div>

    <div class="row mb-4 mt-5 align-items-end">
      <div class="col-lg-3">
        <label for="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          v-model="filters.start_date"
          class="form-control"
        />
      </div>
      <div class="col-lg-3">
        <label for="end_date">End Date:</label>
        <input
          type="date"
          id="end_date"
          v-model="filters.end_date"
          class="form-control"
        />
      </div>
      <div class="col-lg-3">
        <button class="btn btn-primary w-100 mb-0" @click="handleMetricsFetch">
          Apply Filter
        </button>
      </div>
    </div>

    <div class="row mt-4">
      <metric-cards :metrics="metrics" />
    </div>

    <Pagination v-if="pagination.last_page > 1" :pagination="pagination" @setPage="setPage" />
  </div>
</template>
