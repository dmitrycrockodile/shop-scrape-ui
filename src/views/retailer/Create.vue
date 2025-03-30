<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import CurrencySelect from "@/components/CurrencySelect.vue";

import { createRetailer } from "@/services/retailersService";
import { mapActions, mapGetters } from "vuex";

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
      validationErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      currencies: "currencies/getCurrencies",
    }),
  },
  methods: {
    ...mapActions("retailers", ["addRetailer"]),
    async handleCreate() {
      this.validationErrors = {};
      const res = await createRetailer(
        this.createRetailerForm,
        this.$refs.logoFile.files[0]
      );

      if (res.success) {
        this.addRetailer(res.data);
        this.$router.push({ name: "Retailers" });
      } else {
        if (res.errors) {
          this.validationErrors = res.errors;
        }
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-lg-6 col-md-8 mx-auto w-75">
        <div class="card">
          <div class="card-header pb-0 text-center">
            <h6 class="text-primary">Create Retailer</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleCreate">
              <div class="mb-3">
                <label class="form-label">Retailer Title</label>
                <argon-input
                  v-model.trim.lazy="createRetailerForm.title"
                  type="text"
                  placeholder="Enter retailer name"
                  required
                />
                <div v-if="validationErrors.title" class="text-danger">
                  {{ validationErrors.title[0] }}
                </div>
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
                  <div v-if="validationErrors.logo" class="text-danger">
                    {{ validationErrors.logo[0] }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">URL</label>
                <argon-input
                  v-model.trim.lazy="createRetailerForm.url"
                  type="url"
                  placeholder="Enter URL"
                  required
                />
                <div v-if="validationErrors.url" class="text-danger">
                  {{ validationErrors.url[0] }}
                </div>
              </div>

              <div class="mb-3 w-25">
                <label class="form-label">Currency</label>
                <currency-select
                  :options="currencies"
                  v-model="createRetailerForm.currency_id"
                  name="currency"
                />
                <div v-if="validationErrors.currency_id" class="text-danger">
                  {{ validationErrors.currency_id[0] }}
                </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
