<script>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import MetricCards from "@/components/MetricCards.vue";
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

    <div v-if="pagination.last_page > 1" class="row">
      <div class="col-12 d-flex justify-content-center wow fadeInUp animated">
        <ul class="pagination text-center">
          <li v-if="pagination.current_page !== 1" class="next">
            <a @click.prevent="setPage(1)" href="#0">
              <i class="fa-solid fa-arrow-left"></i>
            </a>
          </li>
          <template v-for="link in pagination.links" :key="link.label">
            <template v-if="Number(link.label)">
              <li
                v-if="
                  (pagination.current_page - link.label > -2 &&
                    pagination.current_page - link.label < 2) ||
                  Number(link.label) === 1 ||
                  Number(link.label) == pagination.last_page
                "
              >
                <a
                  @click.prevent="setPage(link.label)"
                  href="#0"
                  :class="link.active ? 'active' : ''"
                  >{{ link.label }}</a
                >
              </li>
              <li
                v-else-if="
                  pagination.current_page - link.label == 2 ||
                  pagination.current_page - link.label == -2
                "
              >
                <a href="#0"> ... </a>
              </li>
            </template>
          </template>
          <li
            v-if="pagination.current_page !== pagination.last_page"
            class="next"
          >
            <a @click.prevent="setPage(pagination.current_page + 1)" href="#0">
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
