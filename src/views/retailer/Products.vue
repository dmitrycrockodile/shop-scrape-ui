<script>
import ProductDetails from "@/components/ProductDetails.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Pagination from "@/components/Pagination.vue";
import { getProducts } from "@/services/retailersService";
import { mapGetters } from "vuex";

export default {
  name: "Retailer Products",
  mounted() {
    if (this.isAuthenticated) {
      this.handleGetProducts();
    }
  },
  data() {
    return {
      products: [],
      pagination: [],
      page: 1,
      dataPerPage: 9,
    };
  },
  components: {
    ProductDetails,
    ArgonButton,
    Pagination,
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
    }),
    retailerId() {
      return this.$route.params.id;
    },
  },
  methods: {
    setPage(newPage) {
      this.page = newPage;
    },
    async handleGetProducts() {
      const res = await getProducts(
        this.retailerId,
        this.dataPerPage,
        this.page
      );

      if (res.success) {
        this.products = res.data;
        this.pagination = res.meta;
      }
    },
  },
  watch: {
    page() {
      this.handleGetProducts();
    },
  },
};
</script>

<template>
  <div class="container-fluid pt-6 pb-4 flex-grow-1">
    <div class="card">
      <div
        class="card-header pb-3 d-flex align-items-center justify-content-between"
      >
        <h6 class="pe-4">Retailer Products</h6>

        <argon-button
          type="submit"
          color="primary"
          @click="$router.push(`/retailers/${retailerId}/products/add`)"
        >
          Add Product
        </argon-button>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <h6 v-if="!products.length" class="ps-4">
          The products for this retailer are not provided
        </h6>
        <div class="table-responsive p-0">
          <ProductDetails :products="products" />
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
