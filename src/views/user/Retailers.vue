<script>
import RetailersTable from "../components/RetailersTable.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapGetters, mapActions } from "vuex";
import { revokeRetailers } from "@/services/usersService";

export default {
  name: "Product Retailers",
  components: {
    RetailersTable,
    ArgonButton,
  },
  methods: {
    ...mapActions("users", ["updateUserRetailers"]),
    async handleRetailerRevoke(retailerId) {
      const res = await revokeRetailers(this.userId, retailerId);

      if (res.success) {
        this.updateUserRetailers({ id: this.userId, retailers: res.data });
      }
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    ...mapGetters("users", ["getUserRetailers"]),
    retailers() {
      return this.getUserRetailers(this.userId);
    },
  },
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-lg-12 col-md-8 mx-auto">
        <RetailersTable
          :retailers="retailers"
          :showActions="false"
          :revokeAble="true"
          @revoke="handleRetailerRevoke"
        >
          <template #create-button>
            <argon-button
              type="submit"
              color="primary"
              @click="$router.push(`/users/${userId}/retailers/assign`)"
            >
              Assign
            </argon-button>
          </template>
        </RetailersTable>
      </div>
    </div>
  </div>
</template>
