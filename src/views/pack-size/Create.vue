<script>
import { mapActions } from "vuex";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

import { createPackSize } from "@/services/packSizesService";

export default {
  name: "Pack Size Create",
  components: {
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      createPackSizeForm: {
        name: "",
        weight: "",
        weight_unit: "", 
        amount: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions("packSizes", ["addPackSize"]),
    async handleCreate() {
      this.loading = true;
      const res = await createPackSize(this.createPackSizeForm);

      if (res.success) {
        this.addPackSize(res.data);
        this.$router.push('/pack-sizes');
      } else {
        this.error = res.message;
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-lg-8 col-md-8 mx-auto">
        <div class="card">
          <div class="card-header pb-0 text-center">
            <h6 class="text-primary">Create Pack Size</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleCreate">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <argon-input
                  v-model="createPackSizeForm.name"
                  type="text"
                  :id="'name-input'"
                  placeholder="Enter pack size name"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Weight</label>
                <argon-input
                  v-model="createPackSizeForm.weight"
                  type="number"
                  :id="'weight-input'"
                  placeholder="Enter weight"
                  required
                  min="0"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Weight Unit</label>
                <argon-input
                  v-model="createPackSizeForm.weight_unit"
                  type="text"
                  :id="'weight_unit-input'"
                  placeholder="kg, g, l, ml"
                  required
                  maxlength="10"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Amount</label>
                <argon-input
                  v-model="createPackSizeForm.amount"
                  type="number"
                  :id="'amount-input'"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div class="text-center">
                <argon-button type="submit" color="primary" :disabled="loading">
                  {{ loading ? "Creating..." : "Create Pack Size" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push('/pack-sizes')"
                >
                  Cancel
                </argon-button>
              </div>

              <div v-if="error" class="alert alert-danger text-center text-white mt-3">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
