<script>
import { mapGetters, mapActions } from "vuex";

import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

import { updatePackSize } from "@/services/packSizesService";

export default {
  name: "Pack Size Edit",
  components: {
    ArgonInput,
    ArgonButton
  },
  data() {
    return {
      updatePackSizeForm: {
        name: "",
        weight: "",
        weight_unit: "",
        amount: "",
      },
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters("packSizes", ["getPackSizes"]),
    packSizeId() {
      return this.$route.params.id;
    },
    selectedPackSize() {
      return this.getPackSizes.find(packSize => packSize.id == this.packSizeId);
    }
  },
  watch: {
    selectedPackSize: {
      immediate: true,
      handler(newPackSize) {
        if (newPackSize) {
          this.updatePackSizeForm = {
            name: newPackSize.name,
            weight: newPackSize.weight,
            weight_unit: newPackSize.weight_unit,
            amount: newPackSize.amount
          };
        }
      }
    }
  },
  methods: {
    ...mapActions("packSizes", ["updatePackSize"]),
    async handleUpdate() {
      const res = await updatePackSize(this.updatePackSizeForm, this.packSizeId);

      if (res.success) {
        this.updatePackSize(res.data);
        this.$router.push('/pack-sizes');
      } else {
        this.error = res.message || "An error occurred while updating the pack size.";
      }
    }
  }
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-lg-8 col-md-8 mx-auto">
        <div class="card">
          <div class="card-header pb-0 text-center">
            <h6 class="text-primary">Edit Pack Size</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <argon-input
                  v-model="updatePackSizeForm.name"
                  type="text"
                  placeholder="Enter pack size name"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Weight</label>
                <argon-input
                  v-model="updatePackSizeForm.weight"
                  type="number"
                  placeholder="Enter weight"
                  required
                  min="0"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Weight Unit</label>
                <argon-input
                  v-model="updatePackSizeForm.weight_unit"
                  type="text"
                  placeholder="kg, g, l, ml"
                  required
                  maxlength="10"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Amount</label>
                <argon-input
                  v-model="updatePackSizeForm.amount"
                  type="number"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div class="text-center">
                <argon-button type="submit" color="primary" :disabled="loading">
                  {{ loading ? "Updating..." : "Update Pack Size" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push('/pack-sizes')"
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