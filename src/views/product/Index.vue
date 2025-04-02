<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ProductsTable from "../components/ProductsTable.vue";
import { mapGetters, mapActions } from "vuex";
import { fetchProducts } from "@/services/productsService";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Product Index",
  mounted() {
    this.handleProductsFetch();
  },
  data() {
    return {
      page: 1,
      dataPerPage: 25,
      // isPageLoading: true,
      // isProductsLoading: true,
    };
  },
  components: {
    ArgonButton,
    ProductsTable,
    Pagination,
  },
  computed: {
    ...mapGetters({
      products: "products/getProducts",
      pagination: "products/getMetadata",
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
              color="success"
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
  </div>
</template>
