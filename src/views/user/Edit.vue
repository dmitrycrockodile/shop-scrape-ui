<script>
import { mapGetters, mapActions } from "vuex";

import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

import { updateUser } from "@/services/usersService";

export default {
  name: "User Edit",
  components: {
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      updateUserForm: {
        email: "",
        name: "",
        password: "",
        location: "",
      },
      loading: false,
      validationErrors: {},
    };
  },
  computed: {
    ...mapGetters("users", ["getUsers"]),
    userId() {
      return this.$route.params.id;
    },
    selectedUser() {
      return this.getUsers.find((user) => user.id == this.userId);
    },
  },
  watch: {
    selectedUser: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.updateUserForm = {
            email: newUser.email,
            name: newUser.name,
            password: "",
            location: newUser.location,
          };
        }
      },
    },
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    async handleUpdate() {
      this.validationErrors = {};
      const res = await updateUser(this.updateUserForm, this.userId);

      if (res.success) {
        this.updateUser(res.data);
        this.$router.push({ name: "Users" });
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
      <div class="col-lg-8 col-md-8 mx-auto">
        <div class="card">
          <div class="card-header pb-0 text-center">
            <h6 class="text-primary">Edit User</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <argon-input
                  v-model.trim.lazy="updateUserForm.email"
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <div v-if="validationErrors.email" class="text-danger">
                  {{ validationErrors.email[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Name</label>
                <argon-input
                  v-model.trim.lazy="updateUserForm.name"
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  required
                />
                <div v-if="validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <argon-input
                  v-model.trim.lazy="updateUserForm.password"
                  id="password"
                  type="password"
                  placeholder="Enter password"
                />
                <div v-if="validationErrors.password" class="text-danger">
                  {{ validationErrors.password[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Location</label>
                <argon-input
                  v-model.trim.lazy="updateUserForm.location"
                  id="location"
                  type="text"
                  placeholder="Enter location"
                />
                <div v-if="validationErrors.location" class="text-danger">
                  {{ validationErrors.location[0] }}
                </div>
              </div>

              <div class="text-center">
                <argon-button type="submit" color="primary" :disabled="loading">
                  {{ loading ? "Updating..." : "Update User" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push('/users')"
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
