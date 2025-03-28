const state = {
    products: JSON.parse(localStorage.getItem('products')) || [],
    meta: JSON.parse(localStorage.getItem('meta')) || [],
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
        localStorage.setItem('products', JSON.stringify(products));
    },
    SET_META(state, meta) {
        state.meta = meta;
        localStorage.setItem('meta', JSON.stringify(meta));
    },
    ADD_PRODUCT(state, product) {
        state.products.push(product);
    },
    UPDATE_PRODUCT(state, updatedProduct) {
        state.products = state.products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
    },
    REMOVE_PRODUCT(state, productId) {
        state.products = state.products.filter(product => product.id !== productId);
    }
};

const actions = {
    async setProducts({ commit }, products) {
        try {
            commit("SET_PRODUCTS", products);
        } catch (error) {
            console.error("Error setting products:", error);
        } 
    },

    async setMetaData({ commit }, meta) {
        try {
            commit("SET_META", meta);
        } catch (error) {
            console.error("Error setting products:", error);
        } 
    },

    async addProduct({ commit, dispatch }, productData) {
        try {
            commit("ADD_PRODUCT", productData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error adding product:", error);
        }
    },

    async updateProduct({ commit, dispatch }, productData ) {
        try {
            commit("UPDATE_PRODUCT", productData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error updating product:", error);
        }
    },

    async removeProduct({ commit, dispatch }, productId) {
        try {
            commit("REMOVE_PRODUCT", productId);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    },

    updateStorage({ state }) {
        localStorage.setItem('products', JSON.stringify(state.products));
    },
};

const getters = {
    getProducts(state) {
        return state.products ? state.products : [];
    },
    getMetadata(state) {
        return state.meta ? state.meta : [];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};