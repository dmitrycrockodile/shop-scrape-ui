<script>
import { mapGetters, mapActions } from "vuex";
import { fetchProducts, downloadProductsCSV } from "@/services/productsService";
import ArgonButton from "@/components/ArgonButton.vue";
import Pagination from "@/components/Pagination.vue";
import ProductsTable from "../components/ProductsTable.vue";
import RetailersSelect from "@/components/RetailersSelect.vue";

export default {
  name: "Product Index",
  mounted() {
    if (this.isAuthenticated) {
      this.handleProductsFetch();
    }
  },
  data() {
    return {
      page: 1,
      dataPerPage: 30,
      loading: false,
      showExportModal: false,
      filter: {
        startDate: "",
        endDate: "",
        retailers: [],
      },
      RetailersSelect,
    };
  },
  components: {
    ArgonButton,
    ProductsTable,
    Pagination,
    RetailersSelect,
  },
  computed: {
    ...mapGetters({
      products: "products/getProducts",
      pagination: "products/getMetadata",
      retailers: "retailers/getRetailers",
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      setProducts: "products/setProducts",
      setMetaData: "products/setMetaData",
    }),
    async handleProductsFetch() {
      const res = await fetchProducts(this.dataPerPage, this.page);

      if (res.success) {
        this.setProducts(res.data);
        this.setMetaData(res.meta);
      }
    },
    setPage(newPage) {
      this.page = newPage;
    },
    async downloadCSV() {
      this.loading = true;
      try {
        await downloadProductsCSV(
          this.filter.startDate,
          this.filter.endDate,
          this.filter.retailers
        );
        this.showExportModal = false;
      } catch (error) {
        console.error("CSV export failed:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    page() {
      this.handleProductsFetch();
    },
  },
};
</script>

<template>
  <div class="pt-6 pb-4 flex-grow-1">
    <div class="card">
      <div
        class="card-header pb-3 d-flex align-items-center justify-content-between"
      >
        <h6 class="pe-4">Products table</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="d-flex ps-4">
          <argon-button
            type="submit"
            color="info"
            @click="$router.push('/products/import')"
          >
            Import
          </argon-button>
          <argon-button
            type="submit"
            color="primary"
            class="ms-3"
            @click="$router.push('/products/create')"
          >
            Create
          </argon-button>
          <argon-button
            type="button"
            color="success"
            class="ms-3 d-flex align-items-center"
            @click="showExportModal = true"
          >
            <i class="fas fa-download me-1"></i>
            Export
          </argon-button>
        </div>

        <h6 v-if="!products.length" class="ps-4">
          You do not have any products
        </h6>
        <div class="table-responsive p-0">
          <ProductsTable :products="products" />
        </div>
        <Pagination
          v-if="pagination.last_page > 1"
          :pagination="pagination"
          @setPage="setPage"
        />
      </div>
    </div>

    <div v-if="showExportModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Export Products</h5>
        <label class="form-label">Start Date</label>
        <input type="date" v-model="filter.startDate" class="form-control" />

        <label class="form-label mt-2">End Date</label>
        <input type="date" v-model="filter.endDate" class="form-control" />

        <label class="form-label mt-2">Retailers</label>
        <RetailersSelect
          v-model="filter.retailers"
          :options="retailers"
          name="retailers"
        />

        <div class="modal-buttons mt-3">
          <argon-button color="secondary" @click="showExportModal = false"
            >Cancel</argon-button
          >
          <argon-button
            color="success"
            @click="downloadCSV"
            :disabled="loading"
            class="ms-2 d-flex align-items-center"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
            <i v-else class="fas fa-download me-1"></i>
            {{ loading ? "Exporting..." : "Export" }}
          </argon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
