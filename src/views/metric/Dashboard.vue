<script>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import MetricCards from "@/components/MetricCards.vue";
import Pagination from "@/components/Pagination.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import RetailersSelect from "@/components/RetailersSelect.vue";
import {
  fetchMetrics,
  fetchWeeklyRatings,
  fetchWeeklyPricings,
  downloadMetricsCSV,
} from "@/services/metricsService";
import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  name: "Retailers Metrics Dashboard",
  components: {
    GradientLineChart,
    MetricCards,
    Pagination,
    ArgonButton,
    RetailersSelect,
  },
  mounted() {
    if (this.isAuthenticated) {
      this.handleMetricsFetch();
      this.handleWeeklyRatingsFetch();
      this.handleWeeklyPricingssFetch();
    }
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
        retailers: [],
      },
      ratingChartData: {
        labels: [],
        datasets: [],
      },
      pricingChartData: {
        labels: [],
        datasets: [],
      },
      chartColors: [
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 205, 86, 1)",
        "rgba(231, 76, 60, 1)",
        "rgba(46, 204, 113, 1)",
        "rgba(52, 152, 219, 1)",
      ],
      loading: false,
      filtersLoading: false,
    };
  },
  methods: {
    setPage(newPage) {
      this.filters.page = newPage;
      this.handleMetricsFetch();
    },
    async handleMetricsFetch() {
        this.filtersLoading = true;
      try {
        const res = await fetchMetrics(this.filters);

        if (res.success) {
          this.metrics = res.data;
          this.pagination = res.meta;
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }

      this.filtersLoading = false;
    },
    async handleWeeklyRatingsFetch() {
      try {
        const res = await fetchWeeklyRatings();

        if (res.success) {
          this.createRatingChartData(res.data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    },
    async handleWeeklyPricingssFetch() {
      try {
        const res = await fetchWeeklyPricings();

        if (res.success) {
          this.createPricingChartData(res.data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    },
    createRatingChartData(metrics) {
      this.ratingChartData.datasets = [];

      const uniqueDates = Array.from({ length: 7 }, (_, i) =>
        dayjs()
          .subtract(6 - i, "day")
          .format("YYYY-MM-DD")
      );

      this.ratingChartData.labels = uniqueDates;

      metrics.forEach((metric, i) => {
        const ratingMap = new Map(
          metric.avg_ratings.map((r) => [r.date, r.avg_rating])
        );

        this.ratingChartData.datasets.push({
          label: metric.retailer_title,
          data: uniqueDates.map((date) => ratingMap.get(date) ?? null),
          borderColor: this.chartColors[i % this.chartColors.length],
          backgroundColor: `rgba(${i * 50 + 75}, 100, 192, 0.05)`,
          fill: false,
        });
      });
    },
    createPricingChartData(metrics) {
      this.pricingChartData.datasets = [];

      const uniqueDates = Array.from({ length: 7 }, (_, i) =>
        dayjs()
          .subtract(6 - i, "day")
          .format("YYYY-MM-DD")
      );

      this.pricingChartData.labels = uniqueDates;

      metrics.forEach((metric, i) => {
        const priceMap = new Map(
          metric.avg_prices.map((p) => [p.date, p.avg_price])
        );

        this.pricingChartData.datasets.push({
          label: metric.retailer_title,
          data: uniqueDates.map((date) => priceMap.get(date) ?? null),
          borderColor: this.chartColors[i % this.chartColors.length],
          backgroundColor: `rgba(${i * 50 + 75}, 100, 192, 0.1)`,
          fill: false,
        });
      });
    },
    async downloadCSV() {
      this.loading = true;
      try {
        await downloadMetricsCSV(this.filters);
      } catch (error) {
        console.error("CSV download error:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    "filters.page": function () {
      this.handleMetricsFetch();
    },
  },
  computed: {
    ...mapGetters({
      retailers: "retailers/getRetailers",
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
};
</script>

<template>
  <div
    v-show="!metrics.length"
    class="container-fluid flex-grow-1 mt-7 me-2"
  >
    <div class="card p-3 empty-message">
      <h5 class="mb-2">
        It seems like you do not have access to any metrics (or they are loading).
      </h5>
      <p>
        Please wait or contact our administrators to get access you want.
      </p>
    </div>
  </div>

  <div class="py-4 container-fluid flex-grow-1 h-100">
    <div class="row">
      <div class="col-lg-6 mb-lg">
        <div v-if="ratingChartData.datasets.length > 0 && metrics.length" class="card z-index-2">
          <gradient-line-chart
            id="rating-charts"
            title="Weekly Ratings Overview"
            :chart="ratingChartData"
          />
        </div>
      </div>

      <div class="col-lg-6 mb-lg">
        <div v-if="pricingChartData.datasets.length > 0 && metrics.length" class="card z-index-2">
          <gradient-line-chart
            id="pricing-charts"
            title="Weekly Pricing Overview"
            :chart="pricingChartData"
          />
        </div>
      </div>
    </div>

    <div v-if="metrics.length" class="row mb-4 mt-5 align-items-end">
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
      <div class="col-lg-2">
        <RetailersSelect
          v-model="filters.retailers"
          :options="retailers"
          name="retailers"
        />
      </div>
      <div class="col-lg-2">
        <button class="btn btn-primary w-100 mb-0" :disabled="filtersLoading" @click="handleMetricsFetch">
            <i v-if="filtersLoading" class="fas fa-spinner fa-spin me-2"></i>
            <i v-else class="fas fa-download me-1"></i>
            {{ filtersLoading ? "Applying..." : "Apply Filter" }}
        </button>
      </div>

      <div class="col-lg-1">
        <argon-button
          type="submit"
          :disabled="loading"
          color="success"
          class="d-flex align-items-center"
          @click="downloadCSV()"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
          <i v-else class="fas fa-download me-1"></i>
          {{ loading ? "Exporting..." : "Export" }}
        </argon-button>
      </div>
    </div>

    <div class="row mt-4">
      <metric-cards :metrics="metrics" />
    </div>

    <Pagination
      v-if="pagination.last_page > 1"
      :pagination="pagination"
      @setPage="setPage"
    />
  </div>
</template>

<style scoped>
.empty-message {
  height: 20vh;
}
</style>
