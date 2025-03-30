<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import { addProducts } from "@/services/retailersService";

export default {
  name: "RetailerProductsAdd",
  components: {
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      productsToAdd: [{ id: null, url: "" }],
      loading: false,
      validationErrors: {},
    };
  },
  computed: {
    retailerId() {
      return this.$route.params.id;
    },
  },
  methods: {
    addProduct() {
      this.productsToAdd.push({
        id: null,
        url: "",
      });
    },

    removeProduct(index) {
      this.productsToAdd.splice(index, 1);
    },

    async handleCreate() {
      this.loading = true;
      this.validationErrors = {};

      const res = await addProducts(this.retailerId, this.productsToAdd);

      if (res.success) {
        this.$router.push({ name: "Retailers" });
        this.loading = false;
      } else {
        if (res.errors) {
          this.validationErrors = res.errors;
        }
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto">
        <div class="card">
          <div class="card-header pb-0 text-center">
            <h6 class="text-primary">Add Products to Retailer</h6>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleCreate">
              <div class="mb-3">
                <label class="form-label">Products</label>
                <div
                  v-for="(product, index) in productsToAdd"
                  :key="index"
                  class="mb-2"
                >
                  <div class="d-flex">
                    <div class="mb-3">
                      <argon-input
                        v-model="product.id"
                        type="number"
                        placeholder="Product ID"
                        class="me-2"
                        required
                      />

                      <div
                        v-if="validationErrors[`products.${index}.id`]"
                        class="text-danger"
                      >
                        {{ validationErrors[`products.${index}.id`][0] }}
                      </div>
                    </div>
                    <div class="mb-3">
                      <argon-input
                        v-model.trim.lazy="product.url"
                        type="url"
                        placeholder="Product URL"
                        class="me-2"
                        required
                      />

                      <div
                        v-if="validationErrors[`products.${index}.url`]"
                        class="text-danger"
                      >
                        {{ validationErrors[`products.${index}.url`][0] }}
                      </div>
                    </div>

                    <argon-button
                      class="h-100"
                      color="danger"
                      :disabled="productsToAdd.length <= 1"
                      @click="removeProduct(index)"
                      type="button"
                      >Remove</argon-button
                    >
                  </div>
                </div>
                <argon-button color="primary" @click="addProduct" type="button"
                  >Add Product</argon-button
                >
              </div>
              <div class="text-center">
                <argon-button type="submit" color="primary" :disabled="loading">
                  {{ loading ? "Saving..." : "Save Products" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push(`/retailers/${retailerId}/products`)"
                >
                  Cancel
                </argon-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
