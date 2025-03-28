<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: 'Retailers Table',
    props: {
      "retailers": { type: Array, required: true },
      "showActions": { type: Boolean, default: true }
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
        }
    }
}
</script>

<template>
  <div class="card">
    <div class="card-header pb-3 d-flex align-items-center justify-content-between">
      <h6 class="pe-4">Retailers table</h6>

      <slot name="create-button"></slot>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 fs-7">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ID
              </th>
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
              <th v-if="showActions" class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            <h6 class="ms-4 mt-2" v-if="!retailers.length">There is no available retailers</h6>
            <tr v-for="retailer in retailers" :key="retailer.id">
              <td>
                <div class="d-flex px-2 py-1">
                    <p class="text-xs font-weight-bold mb-0">{{retailer.id}}</p>
                </div>
              </td>
              <td>
                <img
                    :src="retailer.logo"
                    class="avatar avatar-m me-3"
                    :alt="`${retailer.title}s logo`"
                />
              </td>
              <td class="align-middle text-sm">
                <p class="font-weight-bold mb-0">{{ retailer.title }}</p>
              </td>
              <td class="align-middle">
                <span class="badge badge-sm bg-gradient-warning">{{ retailer.currency.symbol }} ({{retailer.currency.name}})</span>
              </td>
              <td class="align-middle text-center">
                <a
                  :href="retailer.url"
                  class="text-secondary font-weight-bold "
                  data-toggle="tooltip"
                  data-original-title="Visit website"
                  target="_blank"
                  >Visit website</a
                >
              </td>
              <td v-if="showActions" class="align-middle">
                <argon-button
                  @click="handleEdit(retailer.id)"
                  color="primary"
                  >Edit</argon-button>
                <argon-button
                  color="warning"
                  class="ms-2"
                  @click="handleDelete(retailer.id)"
                >Delete</argon-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>