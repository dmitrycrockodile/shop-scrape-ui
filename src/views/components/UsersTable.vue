<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "Users Table",
  props: {
    users: { type: Array, required: true },
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
    handleRetailersShow(id) {
      this.$emit("showRetailers", id);
    },
  },
};
</script>

<template>
  <div class="card">
    <div
      class="card-header pb-3 d-flex align-items-center justify-content-between"
    >
      <h6 class="pe-4">Users</h6>

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
                Email
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Verified
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Role
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Location
              </th>
              <th
                v-if="showActions"
                class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <h6 class="ms-4 mt-2" v-if="!users.length">
              There is no available users
            </h6>
            <tr v-for="user in users" :key="user.id">
              <td>
                <p class="font-weight-bold mb-0">{{ user.name }}</p>
              </td>
              <td class="align-middle text-sm">
                <p class="font-weight-bold mb-0">{{ user.email }}</p>
              </td>
              <td class="align-middle">
                <span
                  :class="`badge badge-sm bg-gradient-${user.isVerified ? 'success' : 'warning'}`"
                >
                  {{ user.isVerified ? "Verified" : "Not verified" }}
                </span>
              </td>
              <td class="align-middle text-center">
                <p class="font-weight-bold mb-0">{{ user.role }}</p>
              </td>
              <td class="align-middle text-center">
                <p class="font-weight-bold mb-0">{{ user.location }}</p>
              </td>
              <td v-if="showActions" class="align-middle">
                <argon-button
                  @click="handleEdit(user.id)"
                  class="p-2 w-25"
                  color="primary"
                  >Edit</argon-button
                >
                <argon-button
                  color="warning"
                  class="ms-2 p-2"
                  @click="handleDelete(user.id)"
                  >Delete</argon-button
                >
                <argon-button
                  color="dark"
                  class="ms-2 p-2"
                  @click="handleRetailersShow(user.id)"
                  >Retailers</argon-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
