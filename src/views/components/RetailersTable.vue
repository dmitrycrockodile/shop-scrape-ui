<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "Retailers Table",
  props: {
    retailers: { type: Array, required: true },
    showActions: { type: Boolean, default: true },
    revokeAble: { type: Boolean, default: false },
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
    handleProductsShow(id) {
      this.$emit("showProducts", id);
    },
    handleRevoke(id) {
      this.$emit("revoke", id);
    },
    handleImageNotFound(e) {
        e.target.onerror = null;
        e.target.src =
        "data:image/png;base64,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"; 
    },
  },
};
</script>

<template>
  <div class="card">
    <div
      class="card-header pb-4 d-flex align-items-center"
    >
      <h6 class="pe-5 mb-0">Retailers table</h6>
      <div>
          <slot name="create-button"></slot>
      </div>
    </div>
    <div class="card-body px-0 pt-2 pb-2 ps-4 pe-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 fs-7">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Logo
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Title
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Currency
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Website URL
              </th>
              <th
                v-if="showActions"
                class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7"
              >
                Actions
              </th>
              <th
                v-if="revokeAble"
                class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7"
              >
                Revoke
              </th>
            </tr>
          </thead>
          <tbody>
            <h6 class="ms-4 mt-2" v-if="!retailers.length">
              There is no available retailers
            </h6>
            <tr v-for="retailer in retailers" :key="retailer.id">
              <td>
                <img
                  :src="retailer.logo"
                  class="avatar avatar-m me-3"
                  :alt="`${retailer.title}'s logo`"
                  :title="`${retailer.title}'s logo`"
                  @error="handleImageNotFound"
                />
              </td>
              <td class="align-middle text-sm">
                <p class="font-weight-bold mb-0">{{ retailer.title }}</p>
              </td>
              <td class="align-middle">
                <span class="badge badge-sm bg-gradient-warning"
                  >{{ retailer.currency.symbol }} ({{
                    retailer.currency.name
                  }})</span
                >
              </td>
              <td class="align-middle text-center">
                <a
                  :href="retailer.url"
                  class="text-secondary font-weight-bold"
                  data-toggle="tooltip"
                  data-original-title="Visit website"
                  target="_blank"
                  >Visit website</a
                >
              </td>
              <td v-if="showActions" class="align-middle">
                <argon-button @click="handleEdit(retailer.id)" color="primary"
                  >Edit</argon-button
                >
                <argon-button
                  color="warning"
                  class="ms-2"
                  @click="handleDelete(retailer.id)"
                  >Delete</argon-button
                >
                <argon-button
                  color="dark"
                  class="ms-2"
                  @click="handleProductsShow(retailer.id)"
                  >Products</argon-button
                >
              </td>
              <td v-if="revokeAble" class="align-middle">
                <argon-button
                  color="warning"
                  class="ms-2"
                  @click="handleRevoke(retailer.id)"
                  >Revoke</argon-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
