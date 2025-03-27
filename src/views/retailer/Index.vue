<template>
    <div class="pt-6 pb-4 flex-grow-1">
        <RetailersTable :retailers="retailers" />
    </div>
</template>

<script>
    import RetailersTable from '../components/RetailersTable.vue';
    import { mapGetters } from "vuex";

    export default {
        name: "Retailer Index",
        data() {
            return {
                
            }
        },
        components: {
            RetailersTable,
        },
        computed: {
            ...mapGetters({
                retailers: 'retailers/getRetailers'
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>