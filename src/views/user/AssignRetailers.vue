<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import { assignRetailers } from "@/services/usersService";
import { mapActions } from "vuex";

export default {
    name: "User Retailers Assign",
    components: {
        ArgonInput,
        ArgonButton
    },
    data() {
        return {
            retailersToAdd: [{ id: null }],
            loading: false,
            error: null,
        };
    },
    computed: {
        userId() {
            return this.$route.params.id;
        },
    },
    methods: {
        ...mapActions('users', ['updateUserRetailers']),
        addRetailer() {
            this.retailersToAdd.push({ id: null });
        },
        removeRetailer(index) {
            this.retailersToAdd.splice(index, 1);
        },
        async handleAssign() {
            this.loading = true;
            try {
                const res = await assignRetailers(this.userId, this.retailersToAdd);
                
                if (res.success) {
                    console.log(res)
                    this.updateUserRetailers({ id: this.userId, retailers: res.data});
                    this.$router.push(`/users/${this.userId}/retailers`);
                } else {
                    this.error = res.message;
                }
            } catch (error) {
                this.error = "Something went wrong. Please try again.";
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<template>
    <div class="container-fluid py-4 flex-grow-1">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header pb-0 text-center">
                        <h6 class="text-primary">Assign Retailers</h6>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleAssign">
                            <div class="mb-3">
                                <label class="form-label">Retailers</label>
                                <div v-for="(retailer, index) in retailersToAdd" :key="retailer" class="mb-2">
                                    <div class="d-flex">
                                        <argon-input
                                            v-model="retailer.id"
                                            type="number"
                                            placeholder="Retailer ID"
                                            class="me-2"
                                            required
                                        />
                                        <argon-button class="h-100" color="danger" :disabled="retailersToAdd.length <= 1" @click="removeRetailer(index)" type="button">Remove</argon-button>
                                    </div>
                                </div>
                                <argon-button color="primary" @click="addRetailer" type="button">Add Retailer</argon-button>
                            </div>
                            <div class="text-center">
                                <argon-button type="submit" color="primary" :disabled="loading">
                                    {{ loading ? "Saving..." : "Save Retailers" }}
                                </argon-button>
                                <argon-button color="secondary" class="ms-2" @click="$router.push(`/retailers/${retailerId}/products`)">
                                    Cancel
                                </argon-button>
                            </div>
                            <div v-if="error" class="alert alert-danger text-center text-white mt-3">{{ error }}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
