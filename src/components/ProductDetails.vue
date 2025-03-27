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
          <div class="card-body">
            <div class="text-center card-body__image">
                <img
                    v-if="product.images.length"
                    :src="product.images[0].file_url"
                    class="img-fluid rounded shadow-sm mb-4"
                    :alt="product.file_name"
                />
            </div>

            <p class="text-muted">{{ product.description }}</p>

            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <strong>ID:</strong> {{ product.id }}
              </li>
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
            <argon-button color="primary" @click="$router.push({ path: `products/edit/${product.id}`, params: { id: product.id } })">Edit</argon-button>
            <argon-button color="secondary" @click="handleDelete(product.id)" class="ms-2">Delete</argon-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { deleteProduct } from "@/services/productsService";
import { mapActions } from "vuex";

export default {
  name: "ProductList",
    components: {
        ArgonButton,
    },
    props: {
        products: Array, 
    },
    methods: {
        ...mapActions('products', ['removeProduct']),
        async handleDelete(id) {
            const res = await deleteProduct(id);

            if (res.success) {
                this.removeProduct(id);
            }
        }
    }
};
</script>

<style scoped>
.list-group-item {
  border: none;
  background: transparent;
}
.card-body__image {
    margin-top: -30px;
}
</style>
