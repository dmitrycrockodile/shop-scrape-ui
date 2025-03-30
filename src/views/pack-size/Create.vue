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
      validationErrors: {},
    };
  },
  methods: {
    ...mapActions("packSizes", ["addPackSize"]),
    async handleCreate() {
      this.loading = true;
      const res = await createPackSize(this.createPackSizeForm);

      if (res.success) {
        this.addPackSize(res.data);
        this.$router.push("/pack-sizes");
      } else {
        if (res.errors) {
          this.validationErrors = res.errors;
        }
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
                  v-model.trim.lazy="createPackSizeForm.name"
                  type="text"
                  :id="'name-input'"
                  placeholder="Enter pack size name"
                  required
                />
                <div v-if="validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Weight</label>
                <argon-input
                  v-model.trim.lazy="createPackSizeForm.weight"
                  type="number"
                  :id="'weight-input'"
                  placeholder="Enter weight"
                  required
                  min="0"
                />
                <div v-if="validationErrors.weight" class="text-danger">
                  {{ validationErrors.weight[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Weight Unit</label>
                <argon-input
                  v-model.trim.lazy="createPackSizeForm.weight_unit"
                  type="text"
                  :id="'weight_unit-input'"
                  placeholder="kg, g, l, ml"
                  required
                  maxlength="10"
                />
                <div v-if="validationErrors.weight_unit" class="text-danger">
                  {{ validationErrors.weight_unit[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Amount</label>
                <argon-input
                  v-model.trim.lazy="createPackSizeForm.amount"
                  type="number"
                  :id="'amount-input'"
                  placeholder="Enter amount"
                  required
                />
                <div v-if="validationErrors.amount" class="text-danger">
                  {{ validationErrors.amount[0] }}
                </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
