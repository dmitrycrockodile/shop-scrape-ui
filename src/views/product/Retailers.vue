<script>
import { getRetailers } from "@/services/productsService";

import RetailersTable from "../components/RetailersTable.vue";

export default {
  name: "Product Retailers",
  components: {
    RetailersTable
  },
  data() {
    return {
      retailers: [],
    };
  },
  async mounted() {
    const res = await getRetailers(this.productId);

    if (res.success) {
      this.retailers = res.data;
    }
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
  },
};
</script>

<template>
  <div class="container-fluid pt-6 pb-4 flex-grow-1">
    <div class="card mx-auto">
      <RetailersTable :retailers="retailers" :showActions="false" />
    </div>
  </div>
</template>
