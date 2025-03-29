<script>
import { mapActions } from "vuex";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

import { createUser } from "@/services/usersService";

export default {
  name: "User Create",
  components: {
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      createUserForm: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
        location: "",
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions("users", ["addUser"]),
    async handleCreate() {
      this.loading = true;
      const res = await createUser(this.createUserForm);

      if (res.success) {
        this.addUser(res.data);
        this.$router.push({ name: "Users" });
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
            <h6 class="text-primary">Create User</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleCreate">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <argon-input
                  v-model="createUserForm.email"
                  type="email"
                  :id="'email-input'" 
                  placeholder="Enter email"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Name</label>
                <argon-input
                  v-model="createUserForm.name"
                  type="text"
                  :id="'name-input'" 
                  placeholder="Enter name"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <argon-input
                  v-model="createUserForm.password"
                  type="password"
                  :id="'password-input'" 
                  placeholder="Enter password"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <argon-input
                  v-model="createUserForm.password_confirmation"
                  type="password"
                  :id="'password_confirmation-input'" 
                  placeholder="Confirm password"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Location</label>
                <argon-input
                  v-model="createUserForm.location"
                  type="text"
                  :id="'location-input'" 
                  placeholder="Enter location"
                  required
                />
              </div>

              <div class="text-center">
                <argon-button type="submit" color="primary" :disabled="loading">
                  {{ loading ? "Creating..." : "Create User" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push('/users')"
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
