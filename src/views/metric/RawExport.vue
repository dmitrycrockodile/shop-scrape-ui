<script>
import ArgonButton from "@/components/ArgonButton.vue";
import RetailersSelect from "@/components/RetailersSelect.vue";
import ProductsSelect from "@/components/ProductsSelect.vue";
import { downloadScrapedDataCSV } from "@/services/metricsService";
import { mapGetters } from "vuex";

export default {
  name: "RawExport",
  data() {
    return {
      filters: {
        startDate: "",
        endDate: "",
        retailers: [],
        products: [],
      },
      loading: false,
    };
  },
  components: {
    ArgonButton,
    RetailersSelect,
    ProductsSelect,
  },
  methods: {
    async downloadCSV() {
      this.loading = true;
      try {
        await downloadScrapedDataCSV(
          this.filters.startDate,
          this.filters.endDate,
          this.filters.retailers,
          this.filters.products
        );
      } catch (err) {
        console.error("Failed to download CSV:", err);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      retailers: "retailers/getRetailers",
      products: "products/getProducts",
    }),
  },
};
</script>

<template>
  <div class="mt-4 px-4 flex-grow-1">
    <div class="card shadow border-0">
      <div class="card-header border-0">
        <h3 class="mb-0">Export Raw Scraped Data</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-control-label">Start Date</label>
            <input
              type="date"
              v-model="filters.startDate"
              class="form-control"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-control-label">End Date</label>
            <input type="date" v-model="filters.endDate" class="form-control" />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-control-label">Retailers</label>
            <RetailersSelect
              v-model="filters.retailers"
              :options="retailers"
              name="retailers"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-control-label">Products</label>
            <ProductsSelect
              v-model="filters.products"
              :options="products"
              name="products"
            />
          </div>
        </div>

        <argon-button
          type="submit"
          :disabled="loading"
          color="success"
          class="d-flex align-items-center"
          @click="downloadCSV"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
          <i v-else class="fas fa-download me-1"></i>
          {{ loading ? "Exporting..." : "Export CSV" }}
        </argon-button>
      </div>
    </div>
  </div>
</template>
