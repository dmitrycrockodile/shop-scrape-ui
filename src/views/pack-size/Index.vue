<script>
    import ArgonButton from "@/components/ArgonButton.vue";
    import PackSizesTable from "../components/PackSizesTable.vue"
    import { mapGetters, mapActions } from "vuex";
    import { fetchPackSizes, deletePackSize } from "@/services/packSizesService";

    export default {
        name: "Product Index",
        mounted() {
            this.handlePackSizesFetch();
        },
        data() {
            return {
                page: 1,
                dataPerPage: 9,
                // isPageLoading: true,
                // isProductsLoading: true,
            }
        },
        components: {
            ArgonButton,
            PackSizesTable
        },
        computed: {
            ...mapGetters({
                packSizes: 'packSizes/getPackSizes',
            })
        },
        methods: {
            ...mapActions({
                setPackSizes: 'packSizes/setPackSizes',
                removePackSize: 'packSizes/removePackSize'
            }),
            async handlePackSizesFetch() {
                const res = await fetchPackSizes(this.dataPerPage, this.page);

                if (res.success) {
                    this.setPackSizes(res.data);
                }
            },
            async handleDelete(id) {
                const res = await deletePackSize(id);

                if (res.success) {
                    this.removePackSize(id);
                }
            },
            handleEdit(id) {
                this.$router.push({ name: 'Pack sizes / Edit', params: { id } });
            }
        }
    }
</script>

<template>
    <div class="pt-6 pb-4 flex-grow-1">
        <PackSizesTable 
            :packSizes="packSizes"
            :showActions="true"
            @edit="handleEdit"
            @delete="handleDelete"
        >
            <template #create-button>
                <argon-button type="submit" color="primary" @click="$router.push('/pack-sizes/create')">
                    Create
                </argon-button>
            </template>
        </PackSizesTable>  
    </div>
</template>