<script>
    import { mapActions } from "vuex";

    import ArgonButton from "@/components/ArgonButton.vue";
    import ArgonInput from "@/components/ArgonInput.vue";
    import PackSizeSelect from "@/components/PackSizeSelect.vue";

    import { createProduct } from "@/services/productsService";

    export default {
        name: "Product Create",
        components: {
            ArgonInput,
            ArgonButton,
            PackSizeSelect
        },
        data() {
            return {
                createProductForm: {
                    title: "",
                    description: "",
                    manufacturer_part_number: "",
                    pack_size_id: null,
                    images: []
                },
                maxImages: 5,
                newImages: [],
                loading: false,
                error: null,
                availablePackSizes: [
                    { id: 13, name: "Small", weight: "5 kg", amount: 10 },
                    { id: 18, name: "Medium", weight: "10 kg", amount: 20 },
                    { id: 19, name: "Large", weight: "20 kg", amount: 30 }
                ]
            }
        },
        methods: {
            ...mapActions("products", ["addProduct"]),
            async handleCreate() {
                const res = await createProduct(this.createProductForm, this.newImages);

                if (res.success) {
                    this.addProduct(res.data);
                    this.$router.push({ name: "Products" }); 
                }
            },
            handleFileChange(event, index) {
                const file = event.target.files[0];
                if (file) {
                    this.newImages[index] = file;
                }
            },
            addNewInputField() {
                if (this.newImages.length < this.maxImages) {
                    this.newImages.push(null);
                }
            },
            removeNewInputField() {
                if (this.newImages.length > 0) {
                    this.newImages.pop();
                }
            },
            getPreviewUrl(file) {
                return file && window.URL ? window.URL.createObjectURL(file) : "";
            }
        }
    }
</script>

<template>
    <div class="container-fluid py-4 flex-grow-1">
        <div class="row">
            <div class="col-lg-8 col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header pb-0 text-center">
                        <h6 class="text-primary">Create Product</h6>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="handleCreate">
                            <div class="mb-3">
                                <label class="form-label">Product Title</label>
                                <argon-input v-model="createProductForm.title" type="text" placeholder="Enter product name" required />
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea v-model="createProductForm.description" class="form-control" placeholder="Enter product description"></textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Manufacturer Part Number</label>
                                <argon-input v-model="createProductForm.manufacturer_part_number" type="text" placeholder="Enter manufacturer part number" required />
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Pack Size</label>
                                <pack-size-select
                                    :options="availablePackSizes"
                                    v-model="createProductForm.pack_size_id"
                                    name="pack_size"
                                />
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">New Images</label>
                                <div v-for="(file, index) in newImages" :key="'new-' + index" class="mb-3">
                                    <input type="file" class="form-control" accept="image/*" @change="handleFileChange($event, index)" />
                                    <div v-if="file">
                                        <img :src="getPreviewUrl(file)" alt="New image preview" class="img-thumbnail m-1 w-50" width="100" />
                                    </div>
                                </div>
                            </div>
                            
                            <argon-button
                                color="primary"
                                class="mt-2 mb-4"
                                @click.prevent="addNewInputField"
                                :disabled="newImages.length >= maxImages"
                            >
                                Add
                            </argon-button>

                            <argon-button
                                color="primary"
                                class="mt-2 mb-4 ms-2"
                                @click.prevent="removeNewInputField"
                                :disabled="newImages.length <= 0"
                            >
                                Remove
                            </argon-button>

                            <div class="text-center">
                                <argon-button type="submit" color="primary" :disabled="loading">
                                    {{ loading ? "Creating..." : "Create Product" }}
                                </argon-button>
                                <argon-button color="secondary" class="ms-2" @click="$router.push('/products')">
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