<script>
    import { mapGetters, mapActions } from "vuex";

    import ArgonButton from "@/components/ArgonButton.vue";
    import ArgonInput from "@/components/ArgonInput.vue";
    import PackSizeSelect from "@/components/PackSizeSelect.vue";

    import { updateProduct } from "@/services/productsService";

    export default {
        name: "Product Edit",
        components: {
            ArgonInput,
            ArgonButton,
            PackSizeSelect
        },
        data() {
            return {
                updateProductForm: {
                    title: "",
                    description: "",
                    manufacturer_part_number: "",
                    pack_size_id: null,
                    images: []
                },
                maxImages: 5,
                imagesRefs: [],
                loading: false,
                error: null,
                availablePackSizes: [
                    { id: 13, name: "Small", weight: "5 kg", amount: 10 },
                    { id: 18, name: "Medium", weight: "10 kg", amount: 20 },
                    { id: 19, name: "Large", weight: "20 kg", amount: 30 }
                ]
            }
        },
        computed: {
            ...mapGetters("products", ["getProducts"]),
            productId() {
                return this.$route.params.id;
            },
            selectedProduct() {
                return this.getProducts.find(product => product.id == this.productId);
            }
        },
        watch: {
            selectedProduct: {
                immediate: true,
                handler(newProduct) {
                    if (newProduct) {
                        this.updateProductForm = {
                            title: newProduct.title,
                            description: newProduct.description,
                            manufacturer_part_number: newProduct.manufacturer_part_number,
                            pack_size_id: newProduct.pack_size.id,
                            images: newProduct.images || []
                        };
                    }
                }
            }
        },
        methods: {
            ...mapActions("products", ["updateProduct"]),
            async handleUpdate() {
                const res = await updateProduct(this.updateProductForm, this.imagesRefs, this.productId);

                if (res.success) {
                    this.updateProduct(res.data);
                    this.$router.push({ name: "Products" }); 
                }
            },
            setImageRef(el) {
                if (el) {
                    this.imagesRefs.push(el)
                }
            },
            addNewInputField() {
                this.updateProductForm.images.push({newImage: ""});
            },
            removeNewInputField() {
                const images = this.updateProductForm.images;
                const lastIndex = images.length - 1;
                images.splice(lastIndex, 1);
            }
        },
        beforeUpdate() {
            this.imagesRefs = []
        },
    }
</script>

<template>
    <div class="container-fluid py-4 flex-grow-1">
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header pb-0 text-center">
                        <h6 class="text-primary">Edit Product</h6>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="handleUpdate">
                            <div class="mb-3">
                                <label class="form-label">Product Title</label>
                                <argon-input v-model="updateProductForm.title" type="text" placeholder="Enter product name" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea v-model="updateProductForm.description" class="form-control" placeholder="Enter product description"></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Manufacturer Part Number</label>
                                <argon-input v-model="updateProductForm.manufacturer_part_number" type="text" placeholder="Enter manufacturer part number" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Pack Size</label>
                                <pack-size-select
                                    :options="availablePackSizes"
                                    v-model="updateProductForm.pack_size_id"
                                    name="pack_size"
                                />
                            </div>

                            <div class="mb-3"  v-if="updateProductForm.images.length">
                                <label class="form-label">Images</label>
                                <div v-for="image in updateProductForm.images" :key="image.id">
                                    <div class="mb-3">
                                        <img :src="image.file_url" :alt="image.file_name" class="img-thumbnail m-1" width="100" />
                                    </div>
                                    <input :ref="setImageRef" type="file" class="form-control" multiple accept="image/*" @change="handleFileChange" />
                                </div>
                            </div>

                            <argon-button
                                color="primary"
                                class="mt-2 mb-4"
                                @click.prevent="addNewInputField"
                                :disabled="updateProductForm.images.length >= maxImages"
                            >
                                Add
                            </argon-button>

                            <argon-button
                                color="primary"
                                class="mt-2 mb-4 ms-2"
                                @click.prevent="removeNewInputField"
                                :disabled="updateProductForm.images.length <= 0"
                            >
                                Remove
                            </argon-button>

                            <div class="text-center">
                                <argon-button type="submit" color="primary" :disabled="loading">
                                    {{ loading ? "Updating..." : "Update Product" }}
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