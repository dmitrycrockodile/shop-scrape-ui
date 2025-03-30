<script>
import ArgonButton from "@/components/ArgonButton.vue";
import PackSizesTable from "../components/PackSizesTable.vue";
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
          v-if="isAdmin"
          type="submit"
          color="primary"
          @click="$router.push('/pack-sizes/create')"
        >
          Create
        </argon-button>
      </template>
    </PackSizesTable>

    <div v-if="pagination.last_page > 1" class="row">
      <div class="col-12 d-flex justify-content-center wow fadeInUp animated">
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
            <a @click.prevent="setPage(pagination.current_page + 1)" href="#0">
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
