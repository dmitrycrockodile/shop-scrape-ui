<script>
    import ProductsTable from '../components/ProductsTable.vue';
    import { mapGetters, mapActions } from "vuex";
    import { fetchProducts } from "@/services/productsService";

    export default {
        name: "Product Index",
        async mounted() {
            const res = await fetchProducts();

            if (res.success) {
                this.setProducts(res.data);
            }
        },
        components: {
            ProductsTable,
        },
        computed: {
            ...mapGetters({
                products: 'products/getProducts'
            })
        },
        methods: {
            ...mapActions('products', ['setProducts'])
        }
    }
</script>

<template>
    <div class="pt-6 pb-4 flex-grow-1">
        <ProductsTable :products="products" />
    </div>
</template>