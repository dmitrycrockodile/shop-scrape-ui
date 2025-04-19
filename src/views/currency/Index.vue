<script>
import CurrenciesTable from "../components/CurrenciesTable.vue";
import { mapGetters, mapActions } from "vuex";
import { fetchCurrencies } from "@/services/currenciesService";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Currency Index",
  mounted() {
    if (this.isAuthenticated) {
        this.handleCurrenciesFetch();
    }
  },
  data() {
    return {
      page: 1,
      dataPerPage: 30,
    };
  },
  components: {
    CurrenciesTable,
    Pagination,
  },
  computed: {
    ...mapGetters({
      currencies: "currencies/getCurrencies",
      pagination: "packSizes/getMetadata",
      isAuthenticated: "auth/isAuthenticated",
    }),
  },
  methods: {
    ...mapActions({
      setCurrencies: "currencies/setCurrencies",
      setMetaData: "packSizes/setMetaData",
    }),
    async handleCurrenciesFetch() {
      const res = await fetchCurrencies(this.dataPerPage, this.page);

      if (res.success) {
        this.setCurrencies(res.data);
        this.setMetaData(res.meta);
      }
    },
    setPage(newPage) {
      this.page = newPage;
    },
  },
  watch: {
    page() {
      this.handleCurrenciesFetch();
    },
  },
};
</script>

<template>
  <div class="pt-6 pb-4 flex-grow-1">
    <CurrenciesTable :currencies="currencies" />

    <div class="mt-4">
      <Pagination
        v-if="pagination.last_page > 1"
        :pagination="pagination"
        @setPage="setPage"
      />
    </div>
  </div>
</template>
