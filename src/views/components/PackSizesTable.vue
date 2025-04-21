<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "Pack Sizes Table",
  props: {
    packSizes: { type: Array, required: true },
    showActions: { type: Boolean, default: true },
  },
  components: {
    ArgonButton,
  },
  methods: {
    handleDelete(id) {
      this.$emit("delete", id);
    },
    handleEdit(id) {
      this.$emit("edit", id);
    },
  },
  computed: {
    ...mapGetters("auth", ["isAdmin"]),
  },
};
</script>

<template>
  <div class="card mb-4">
    <div
      class="card-header pb-4 d-flex align-items-center"
    >
      <h6 class="pe-5 mb-0">Pack Sizes</h6>

      <slot name="create-button"></slot>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive ps-4">
        <table class="table align-items-center mb-0 fs-7">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Weight
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Amount
              </th>
              <th
                class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <h6 class="ms-4 mt-2" v-if="!packSizes.length">
              There are no available pack sizes
            </h6>
            <tr v-for="packSize in packSizes" :key="packSize.id">
              <td>
                <p class="font-weight-bold mb-0">{{ packSize.name }}</p>
              </td>
              <td class="align-middle text-sm">
                <p class="font-weight-bold mb-0">{{ packSize.weight }} {{ packSize.weight_unit }}</p>
              </td>
              <td class="align-middle text-center">
                <p class="font-weight-bold mb-0">{{ packSize.amount }}</p>
              </td>
              <td class="align-middle">
                <argon-button @click="handleEdit(packSize.id)" class="p-2 w-25" color="primary"
                  >Edit</argon-button
                >
                <argon-button
                  color="warning"
                  class="ms-2 p-2 w-25"
                  @click="handleDelete(packSize.id)"
                  >Delete</argon-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
