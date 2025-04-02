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
                    class="avatar avatar-m me-3 product__img"
                    :alt="product.file_name"
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