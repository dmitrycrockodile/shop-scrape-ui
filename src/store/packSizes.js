const state = {
    packSizes: JSON.parse(localStorage.getItem('packSizes')) || null,
    meta: JSON.parse(localStorage.getItem('meta')) || [],
};

const mutations = {
    SET_PACKSIZES(state, packSizes) {
        state.packSizes = packSizes;
        localStorage.setItem('packSizes', JSON.stringify(packSizes));
    },
    SET_META(state, meta) {
        state.meta = meta;
        localStorage.setItem('meta', JSON.stringify(meta));
    },
    ADD_PACKSIZE(state, packSize) {
        state.packSizes.push(packSize);
    },
    UPDATE_PACKSIZE(state, updatedPackSize) {
        state.packSizes = state.packSizes.map(packSize =>
            packSize.id === updatedPackSize.id ? updatedPackSize : packSize
        );
    },
    REMOVE_PACKSIZE(state, packSizeId) {
        state.packSizes = state.packSizes.filter(packSize => packSize.id !== packSizeId);
    }
};

const actions = {
    async setPackSizes({ commit }, packSizes) {
        try {
            commit("SET_PACKSIZES", packSizes);
        } catch (error) {
            console.error("Error setting packSizes:", error);
        } 
    },

    async setMetaData({ commit }, meta) {
        try {
            commit("SET_META", meta);
        } catch (error) {
            console.error("Error setting products:", error);
        } 
    },

    async addPackSize({ commit, dispatch }, packSizeData) {
        try {
            commit("ADD_PACKSIZE", packSizeData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error adding packSize:", error);
        }
    },

    async updatePackSize({ commit, dispatch }, packSizeData ) {
        try {
            commit("UPDATE_PACKSIZE", packSizeData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error updating packSize:", error);
        }
    },

    async removePackSize({ commit, dispatch }, packSizeId) {
        try {
            commit("REMOVE_PACKSIZE", packSizeId);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error deleting packSize:", error);
        }
    },

    updateStorage({ state }) {
        localStorage.setItem('packSizes', JSON.stringify(state.packSizes));
    },
};

const getters = {
    getPackSizes(state) {
        return state.packSizes ? state.packSizes : [];
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