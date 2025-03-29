<script>
    import { mapGetters, mapActions } from "vuex";

    import ArgonButton from "@/components/ArgonButton.vue";
    import ArgonInput from "@/components/ArgonInput.vue";
    import CurrencySelect from "@/components/CurrencySelect.vue";

    import { updateRetailer } from "@/services/retailersService";

    export default {
        name: "Retailer Edit",
        components: {
            ArgonInput,
            ArgonButton,
            CurrencySelect
        },
        data() {
            return {
                updateRetailerForm: {
                    title: "",
                    logo: "",
                    url: "",
                    currency_id: null,
                },
                loading: false,
                error: null,
                availableCurrencies: [
                { id: 1, name: "USD", code: "USD" },
                { id: 2, name: "EUR", code: "EUR" },
                { id: 3, name: "GBP", code: "GBP" }
            ],
            }
        },
        computed: {
            ...mapGetters("retailers", ["getRetailers"]),
            retailerId() {
                return this.$route.params.id; 
            },
            selectedRetailer() {
                return this.getRetailers.find(retailer => retailer.id == this.retailerId);
            },
        },
        watch: {
            selectedRetailer: {
                immediate: true,
                handler(newRetailer) {
                    if (newRetailer) {
                        this.updateRetailerForm = { 
                            title: newRetailer.title,
                            logo: newRetailer.logo,
                            url: newRetailer.url,
                            currency_id: newRetailer.currency.id,
                        };
                    }
                },
            },
        },
        methods: {
            ...mapActions('retailers', ['updateRetailer']),
            async handleUpdate() {
                const res = await updateRetailer(this.updateRetailerForm, this.$refs.logoFile.files[0], this.retailerId);

                if (res.success) {
                    this.updateRetailer(res.data);
                    this.$router.push({ name: "Retailers" }); 
                }
            }
        },
    }
</script>

<template>
    <div class="container-fluid py-4 flex-grow-1">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto w-75">
                <div class="card">
                    <div class="card-header pb-0 text-center">
                        <h6 class="text-primary">Edit Retailer</h6>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="handleUpdate">
                            <div class="mb-3">
                                <label class="form-label">Retailer Title</label>
                                <argon-input v-model="updateRetailerForm.title" type="text" placeholder="Enter retailer name" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Logo</label>
                                <div>
                                  <img v-if="updateRetailerForm.logo" :src="updateRetailerForm.logo" alt="Current logo" class="img-fluid mb-4 w-50" />
                                  <input
                                    ref="logoFile"
                                    type="file"
                                    class="form-control"
                                    accept="image/*"
                                    placeholder="Upload a new logo"
                                  />
                                </div>
                              </div>

                              <div class="mb-3">
                                <label class="form-label">URL</label>
                                <argon-input v-model="updateRetailerForm.url" type="url" placeholder="Enter URL" required />
                              </div>

                            <div class="mb-3 w-25">
                                <label class="form-label">Currency</label>
                                <currency-select
                                    :options="availableCurrencies"
                                    v-model="updateRetailerForm.currency_id"
                                    name="currency"
                                />
                            </div>

                            <div class="text-center">
                                <argon-button type="submit" color="primary" :disabled="loading">
                                    {{ loading ? "Updating..." : "Update Retailer" }}
                                </argon-button>
                                <argon-button color="secondary" class="ms-2" @click="$router.push('/retailers')">
                                    Cancel
                                </argon-button>
                            </div>

                            <div v-if="error" class="alert alert-danger text-center mt-3">{{ error }}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>