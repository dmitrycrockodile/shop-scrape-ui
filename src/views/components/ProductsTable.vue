<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ProductDetails from "@/components/ProductDetails.vue";

export default {
  name: "Products Table",
  props: {
    products: { type: Array, required: true },
  },
  components: {
    ArgonButton,
    ProductDetails,
  },
};
</script>

<template>
  <div class="card">
    <div
      class="card-header pb-3 d-flex align-items-center justify-content-between"
    >
      <h6 class="pe-4">Products table</h6>

      <argon-button
        type="submit"
        color="primary"
        @click="$router.push('/products/create')"
      >
        Create
      </argon-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <ProductDetails :products="products" />
      </div>
    </div>
  </div>
</template>
