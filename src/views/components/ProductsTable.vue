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
    handleImageNotFound(e) {
        e.target.onerror = null;
        e.target.src =
        "data:image/png;base64,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"; 
    },
    cutString
  },
  computed: {
    ...mapGetters("auth", ["isAdmin"]),
  },
};
</script>

<template>
  <div class="card">
    <div
      class="card-header pb-3 d-flex align-items-center justify-content-between"
    >
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive ps-3 pe-3">
        <table class="table align-items-center mb-0 fs-7">
            <thead>
              <tr>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Preview image
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Title
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                    MPN #
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                    Pack
                </th>
                <th
                  class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <h6 class="ms-4 mt-2" v-if="!products.length">
                There is no available products
              </h6>
              <tr v-for="product in products" :key="product.id">
                <td>
                  <img
                    v-if="product.images.length"
                    :src="product.images[0].file_url"
                    :alt="`${product.file_name}'s logo`"
                    :title="`${product.file_name}'s logo`"
                    @error="handleImageNotFound"
                    class="avatar avatar-m me-3 product__img"
                  />
                </td>
                <td class="align-middle text-sm">
                  <p class="font-weight-bold mb-0">{{ product.title }}</p>
                </td>
                <td class="align-middle text-center">
                    {{ product.manufacturer_part_number }}
                </td>
                <td class="align-middle">
                    {{ product.pack_size.name }}
                    <small class="text-muted"
                    >({{ product.pack_size.weight }},
                    {{ product.pack_size.amount }} units)</small
                    >
                </td>
                <td class="align-middle">
                    <argon-button
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
                    color="warning"
                    @click="handleDelete(product.id)"
                    class="ms-2"
                    >Delete</argon-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>
<style>
.product__img {
    width: 60px;
    height: 60px;
}
</style>