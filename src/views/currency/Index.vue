<script>
import CurrenciesTable from "../components/CurrenciesTable.vue";
import { mapGetters, mapActions } from "vuex";
import { fetchCurrencies } from "@/services/currenciesService";

export default {
  name: "Currency Index",
  mounted() {
    this.handleCurrenciesFetch();
  },
  data() {
    return {
      // isPageLoading: true,
      // isCurrenciesLoading: true,
    };
  },
  components: {
    CurrenciesTable,
  },
  computed: {
    ...mapGetters({
      currencies: "currencies/getCurrencies",
    }),
  },
  methods: {
    ...mapActions({
      setCurrencies: "currencies/setCurrencies",
    }),
    async handleCurrenciesFetch() {
      const res = await fetchCurrencies();

      if (res.success) {
        this.setCurrencies(res.data);
      }
    },
  },
};
</script>

<template>
  <div class="pt-6 pb-4 flex-grow-1">
    <CurrenciesTable :currencies="currencies" />
  </div>
</template>
