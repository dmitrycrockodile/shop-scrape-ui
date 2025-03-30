<script>
import ProductDetails from "@/components/ProductDetails.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { getProducts } from "@/services/retailersService";

export default {
  name: "Retailer Products",
  mounted() {
    this.handleGetProducts();
  },
  data() {
    return {
      products: [],
      pagination: [],
      page: 1,
      dataPerPage: 9,
      // isPageLoading: true,
      // isProductsLoading: true,
    };
  },
  components: {
    ProductDetails,
    ArgonButton,
  },
  computed: {
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
  <div class="pt-6 pb-4 flex-grow-1">
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
        <h6 v-if="!products.length" class="ps-4">The products for this retailer are not provided</h6>
        <div class="table-responsive p-0">
          <ProductDetails :products="products" />
        </div>

        <div v-if="pagination.last_page > 1" class="row">
          <div
            class="col-12 d-flex justify-content-center wow fadeInUp animated"
          >
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
                <a
                  @click.prevent="setPage(pagination.current_page + 1)"
                  href="#0"
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
