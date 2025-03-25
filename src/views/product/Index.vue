<template>
    <div class="pt-6">
        <ProductsTable />
    </div>
</template>

<script>
    import ProductsTable from '../components/ProductsTable.vue';
    export default {
        name: "Products Index",
        data() {
            return {
                
            }
        },
        components: {
            ProductsTable
        }
    }
</script>

<style lang="scss" scoped>

</style>