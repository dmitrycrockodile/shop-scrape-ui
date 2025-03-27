<script>
import ArgonButton from "@/components/ArgonButton.vue";
import { deleteRetailer } from "@/services/retailersService";
import { mapActions } from "vuex";

export default {
    name: 'Retailers Table',
    props: {
      "retailers": { type: Array, required: true }
    },
    components: {
        ArgonButton,
    },
    methods: {
        ...mapActions('retailers', ['removeRetailer']),
        async handleDelete(id) {
            const res = await deleteRetailer(id);

            if (res.success) {
                this.removeRetailer(id);
            }
        }
    }
}
</script>

<template>
  <div class="card">
    <div class="card-header pb-3 d-flex align-items-center justify-content-between">
      <h6 class="pe-4">Retailers table</h6>

      <argon-button type="submit" color="primary" @click="$router.push('/retailers/create')">
        Create
     </argon-button>
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
              <th class="text-uppercase text-xxs text-secondary font-weight-bolder opacity-7">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="retailer in retailers" :key="retailer.id">
              <td>
                <div class="d-flex px-2 py-1">
                    <p class="text-xs font-weight-bold mb-0">{{retailer.id}}</p>
                </div>
              </td>
              <td>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/020/662/330/non_2x/store-icon-logo-illustration-vector.jpg"
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
              <td class="align-middle">
                <router-link
                  :to="{ name: 'Retailers / Edit', params: { id: retailer.id } }"
                  class="text-secondary font-weight-bold  me-4"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</router-link>
                <button
                  class="text-secondary font-weight-bold border-0 bg-transparent"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="handleDelete(retailer.id)"
                >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>