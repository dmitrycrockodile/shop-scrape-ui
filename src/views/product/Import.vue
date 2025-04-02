<script>
import { uploadProductsCSV } from "@/services/productsService";

export default {
  name: "Product Import",
  data() {
    return {
      selectedFile: null,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    handleFileSelection(event) {
      this.selectedFile = event.target.files[0];
      this.errorMessage = "";
      this.successMessage = "";
    },
    async handleFileUpload() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      const res = await uploadProductsCSV(formData);

      console.log(res);
      if (!res.success) {
        this.errorMessage = res.errors;
        this.successMessage = "";
      } else {
        this.errorMessage = "";
        this.successMessage = "CSV imported successfully!";
      }

      this.selectedFile = null;
      this.$refs.fileInput.value = "";
    },
  },
};
</script>

<template>
  <div class="container-fluid py-4 flex-grow-1">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <div class="card">
          <div class="card-header pb-3 d-flex align-items-start flex-column">
            <h6 class="pe-4">Import the CSV file</h6>

            <input
              type="file"
              ref="fileInput"
              class="form-control mt-2"
              @change="handleFileSelection"
              accept=".csv"
            />

            <p v-if="selectedFile" class="mt-2">
              Selected file: <strong>{{ selectedFile.name }}</strong>
            </p>

            <button class="btn btn-success mt-3" @click="handleFileUpload">
              Upload CSV
            </button>
          </div>
          <div class="card-body px-0 pt-0 pb-2 ps-4 pe-2">
            <div
              v-if="errorMessage"
              class="alert alert-danger text-white"
              role="alert"
            >
              {{ errorMessage }}
            </div>

            <div
              v-if="successMessage"
              class="alert alert-success text-white"
              role="alert"
            >
              {{ successMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
