<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import CurrencySelect from "@/components/CurrencySelect.vue";

import { createRetailer } from "@/services/retailersService";
import { mapActions } from "vuex";

export default {
  name: "Retailer Create",
  components: {
    ArgonInput,
    ArgonButton,
    CurrencySelect,
  },
  data() {
    return {
      createRetailerForm: {
        title: "",
        logo: "",
        url: "",
        currency_id: null,
      },
      loading: false,
      error: null,
      availableCurrencies: [
        { id: 1, name: "USD", code: "USD" },
        { id: 2, name: "EUR", code: "EUR" },
        { id: 3, name: "GBP", code: "GBP" },
      ],
    };
  },
  methods: {
    ...mapActions("retailers", ["addRetailer"]),
    async handleCreate() {
      const res = await createRetailer(
        this.createRetailerForm,
        this.$refs.logoFile.files[0]
      );

      if (res.success) {
        this.addRetailer(res.data);
        this.$router.push({ name: "Retailers" });
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto">
        <div class="card">
          <div class="card-header pb-0 text-center">
            <h6 class="text-primary">Create Retailer</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleCreate">
              <div class="mb-3">
                <label class="form-label">Retailer Title</label>
                <argon-input
                  v-model="createRetailerForm.title"
                  type="text"
                  placeholder="Enter retailer name"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Logo</label>
                <div>
                  <img
                    v-if="createRetailerForm.logo"
                    :src="createRetailerForm.logo"
                    alt="Current logo"
                    class="img-fluid mb-2"
                  />
                  <input
                    ref="logoFile"
                    type="file"
                    class="form-control"
                    accept="image/*"
                    placeholder="Upload a new logo"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">URL</label>
                <argon-input
                  v-model="createRetailerForm.url"
                  type="url"
                  placeholder="Enter URL"
                  required
                />
              </div>

              <div class="mb-3 w-25">
                <label class="form-label">Currency</label>
                <currency-select
                  :options="availableCurrencies"
                  v-model="createRetailerForm.currency_id"
                  name="currency"
                />
              </div>

              <div class="text-center">
                <argon-button type="submit" color="primary" :disabled="loading">
                  {{ loading ? "Creating..." : "Create Retailer" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push('/retailers')"
                >
                  Cancel
                </argon-button>
              </div>

              <div v-if="error" class="alert alert-danger text-center mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
