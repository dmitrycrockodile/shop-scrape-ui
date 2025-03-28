<template>
    <div class="pt-6 pb-4 flex-grow-1">
        <RetailersTable 
            :retailers="retailers"
            :showActions="true"
            @edit="handleEdit"
            @delete="handleDelete"
            @showProducts="handleProductsShow"
        >
            <template #create-button>
                <argon-button type="submit" color="primary" @click="$router.push('/retailers/create')">
                    Create
                </argon-button>
            </template>
        </RetailersTable>
    </div>
</template>

<script>
    import RetailersTable from '../components/RetailersTable.vue';
    import ArgonButton from "@/components/ArgonButton.vue";
    import { mapGetters } from "vuex";
    import { deleteRetailer } from "@/services/retailersService";
    import { mapActions } from "vuex";

    export default {
        name: "Retailer Index",
        components: {
            RetailersTable,
            ArgonButton
        },
        computed: {
            ...mapGetters({
                retailers: 'retailers/getRetailers'
            })
        },
        methods: {
            ...mapActions('retailers', ['removeRetailer']),
            async handleDelete(id) {
                const res = await deleteRetailer(id);

                if (res.success) {
                    this.removeRetailer(id);
                }
            },
            handleEdit(id) {
                this.$router.push({ name: 'Retailers / Edit', params: { id } });
            },
            handleProductsShow(id) {
                this.$router.push({ name: 'Retailers / Products', params: { id } });
            }
        }
    }
</script>