const state = {
    packSizes: JSON.parse(localStorage.getItem('packSizes')) || null,
};

const mutations = {
    SET_PACKSIZES(state, packSizes) {
        state.packSizes = packSizes;
        localStorage.setItem('packSizes', JSON.stringify(packSizes));
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
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};