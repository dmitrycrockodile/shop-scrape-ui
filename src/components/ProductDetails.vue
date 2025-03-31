<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { deleteProduct } from "@/services/productsService";
import { mapActions, mapGetters } from "vuex";
import { cutString } from "@/utils/helpers.js";

export default {
  name: "ProductList",
  components: {
    ArgonButton,
  },
  props: {
    products: Array,
  },
  methods: {
    ...mapActions("products", ["removeProduct"]),
    async handleDelete(id) {
      const res = await deleteProduct(id);

      if (res.success) {
        this.removeProduct(id);
      }
    },
    cutString,
  },
  computed: {
    ...mapGetters("auth", ["isAdmin"]),
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="col-lg-4 col-md-6 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-header text-center">
            <h5 class="text-primary">{{ product.title }}</h5>
          </div>
          <div class="card-body pb-0">
            <div class="text-center card-body__image card-body__img-container">
              <img
                v-if="product.images.length"
                :src="product.images[0].file_url"
                class="img-fluid rounded shadow-sm h-100"
                :alt="product.file_name"
              />
            </div>

            <p class="text-muted mt-4">
              {{ cutString(product.description, 75) }}
            </p>

            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>Part #:</strong> {{ product.manufacturer_part_number }}
              </li>
              <li class="list-group-item">
                <strong>Pack:</strong> {{ product.pack_size.name }}
                <small class="text-muted"
                  >({{ product.pack_size.weight }},
                  {{ product.pack_size.amount }} units)</small
                >
              </li>
            </ul>
          </div>

          <div class="card-footer text-center">
            <argon-button
              v-if="isAdmin"
              color="primary"
              @click="$router.push({ path: `products/${product.id}/edit` })"
              >Edit</argon-button
            >
            <argon-button
              color="dark"
              @click="
                $router.push({ path: `products/${product.id}/retailers` })
              "
              class="ms-2"
              >Retailers</argon-button
            >
            <argon-button
              v-if="isAdmin"
              color="warning"
              @click="handleDelete(product.id)"
              class="ms-2"
              >Delete</argon-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  border: none;
  background: transparent;
}
.card-body__image {
  margin-top: -30px;
}
.card-body__img-container {
  height: 250px !important;
}
</style>
