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
    PackSizeSelect,
  },
  data() {
    return {
      updateProductForm: {
        title: "",
        description: "",
        manufacturer_part_number: "",
        pack_size_id: null,
        images: [],
      },
      maxImages: 5,
      newImages: [],
      loading: false,
      validationErrors: {},
    };
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
    ...mapGetters({
      packSizes: "packSizes/getPackSizes",
    }),
    productId() {
      return this.$route.params.id;
    },
    selectedProduct() {
      return this.getProducts.find((product) => product.id == this.productId);
    },
    totalImagesCount() {
      return this.updateProductForm.images.length + this.newImages.length;
    },
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
            images: newProduct.images || [],
          };
          this.newImages = [];
        }
      },
    },
  },
  methods: {
    ...mapActions("products", ["updateProduct"]),
    async handleUpdate() {
        this.validationErrors = {};
      const res = await updateProduct(
        this.updateProductForm,
        this.newImages,
        this.productId
      );

      if (res.success) {
        this.updateProduct(res.data);
        this.$router.push({ name: "Products" });
      } else {
        if (res.errors) {
          this.validationErrors = res.errors;
        }
      }
    },
    handleFileChange(event, index) {
      const file = event.target.files[0];
      if (file) {
        this.newImages[index] = file;
      }
    },
    addNewInputField() {
      if (this.totalImagesCount < this.maxImages) {
        this.newImages.push(null);
      }
    },
    removeNewInputField() {
      if (this.newImages.length > 0) {
        this.newImages.pop();
      }
    },
    removeExistingImage(index) {
      this.updateProductForm.images.splice(index, 1);
    },
    getPreviewUrl(file) {
      return file && window.URL ? window.URL.createObjectURL(file) : "";
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
            <h6 class="text-primary">Edit Product</h6>
          </div>

          <div class="card-body">
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label class="form-label">Product Title</label>
                <argon-input
                  v-model.trim.lazy="updateProductForm.title"
                  type="text"
                  placeholder="Enter product name"
                  required
                />
                <div v-if="validationErrors.title" class="text-danger">{{ validationErrors.title[0] }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  v-model.trim.lazy="updateProductForm.description"
                  class="form-control"
                  placeholder="Enter product description"
                ></textarea>
                <div v-if="validationErrors.description" class="text-danger">{{ validationErrors.description[0] }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Manufacturer Part Number</label>
                <argon-input
                  v-model.trim.lazy="updateProductForm.manufacturer_part_number"
                  type="text"
                  placeholder="Enter manufacturer part number"
                  required
                />
                <div v-if="validationErrors.manufacturer_part_number" class="text-danger">{{ validationErrors.manufacturer_part_number[0] }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Pack Size</label>
                <pack-size-select
                  :options="packSizes"
                  v-model="updateProductForm.pack_size_id"
                  name="pack_size"
                />
                <div v-if="validationErrors.pack_size_id" class="text-danger">{{ validationErrors.pack_size_id[0] }}</div>
              </div>

              <div class="mb-3" v-if="updateProductForm.images.length">
                <label class="form-label">Images</label>
                <div
                  v-for="(image, index) in updateProductForm.images"
                  :key="image.id"
                >
                  <div class="mb-3 d-flex flex-column">
                    <img
                      :src="image.file_url"
                      :alt="image.file_name"
                      class="img-thumbnail m-1 w-50"
                      width="100"
                    />
                    <argon-button
                      color="danger"
                      class="ms-2 w-15 mt-2"
                      @click="removeExistingImage(index)"
                      >Remove</argon-button
                    >
                  </div>
                  
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">New Images</label>
                <div v-if="validationErrors.images" class="text-danger">{{ validationErrors.images[0] }}</div>
                <div
                  v-for="(file, index) in newImages"
                  :key="'new-' + index"
                  class="mb-3"
                >
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    @change="handleFileChange($event, index)"
                  />
                  <div v-if="file">
                    <img
                      :src="getPreviewUrl(file)"
                      alt="New image preview"
                      class="img-thumbnail m-1 w-50"
                      width="100"
                    />
                  </div>
                  <div v-if="validationErrors[`images.${index}`]" class="text-danger">
                    {{ validationErrors[`images.${index}`][0] }}
                </div>
                </div>
              </div>

              <argon-button
                color="primary"
                class="mt-2 mb-4"
                @click.prevent="addNewInputField"
                :disabled="totalImagesCount >= maxImages"
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
                  {{ loading ? "Updating..." : "Update Product" }}
                </argon-button>
                <argon-button
                  color="secondary"
                  class="ms-2"
                  @click="$router.push('/products')"
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
