<script>
    import ArgonButton from "@/components/ArgonButton.vue";
    import ProductDetails from "@/components/ProductDetails.vue"
    import { mapGetters, mapActions } from "vuex";
    import { fetchProducts } from "@/services/productsService";

    export default {
        name: "Product Index",
        mounted() {
            this.handleProductsFetch();
        },
        data() {
            return {
                page: 1,
                dataPerPage: 9,
                // isPageLoading: true,
                // isProductsLoading: true,
            }
        },
        components: {
            ArgonButton,
            ProductDetails
        },
        computed: {
            ...mapGetters({
                products: 'products/getProducts',
                pagination: 'products/getMetadata'
            })
        },
        methods: {
            ...mapActions({
                setProducts: 'products/setProducts',
                setMetaData: 'products/setMetaData'
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
            }
        },
    }
</script>

<template>
    <div class="pt-6 pb-4 flex-grow-1">
        <div class="card">
            <div class="card-header pb-3 d-flex align-items-center justify-content-between">
              <h6 class="pe-4">Products table</h6>
        
              <argon-button type="submit" color="primary" @click="$router.push('/products/create')">
                Create
             </argon-button>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <ProductDetails :products="products" />          
              </div>
              <div v-if="pagination.last_page > 1" class="row">
                <div
                  class="col-12 d-flex justify-content-center wow fadeInUp animated"
                >
                  <ul class="pagination text-center">
                    <li v-if="pagination.current_page !== 1" class="next">
                      <a
                        @click.prevent="setPage(1)"
                        href="#0"
                      >
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