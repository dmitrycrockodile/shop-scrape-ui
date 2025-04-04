<script>
import ArgonButton from "@/components/ArgonButton.vue";
import PackSizesTable from "../components/PackSizesTable.vue";
import Pagination from "@/components/Pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { fetchPackSizes, deletePackSize } from "@/services/packSizesService";

export default {
  name: "Product Index",
  mounted() {
    this.handlePackSizesFetch();
  },
  data() {
    return {
      page: 1,
      dataPerPage: 10,
      // isPageLoading: true,
      // isProductsLoading: true,
    };
  },
  components: {
    ArgonButton,
    PackSizesTable,
    Pagination
  },
  computed: {
    ...mapGetters({
      packSizes: "packSizes/getPackSizes",
      pagination: "packSizes/getMetadata",
      isAdmin: "auth/isAdmin",
    }),
  },
  methods: {
    ...mapActions({
      setPackSizes: "packSizes/setPackSizes",
      removePackSize: "packSizes/removePackSize",
      setMetaData: "packSizes/setMetaData",
    }),
    async handlePackSizesFetch() {
      const res = await fetchPackSizes(this.dataPerPage, this.page);

      if (res.success) {
        this.setPackSizes(res.data);
        this.setMetaData(res.meta);
      }
    },
    async handleDelete(id) {
      const res = await deletePackSize(id);

      if (res.success) {
        this.removePackSize(id);
      }
    },
    handleEdit(id) {
      this.$router.push({ name: "Pack sizes / Edit", params: { id } });
    },
    setPage(newPage) {
      this.page = newPage;
    },
  },
  watch: {
    page() {
      this.handlePackSizesFetch();
    },
  },
};
</script>

<template>
  <div class="pt-6 pb-4 flex-grow-1">
    <PackSizesTable
      :packSizes="packSizes"
      :showActions="isAdmin"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #create-button>
        <argon-button
          type="submit"
          color="primary"
          @click="$router.push('/pack-sizes/create')"
        >
          Create
        </argon-button>
      </template>
    </PackSizesTable>

    <Pagination v-if="pagination.last_page > 1" :pagination="pagination" @setPage="setPage" />
  </div>
</template>
