const state = {
    retailers: JSON.parse(localStorage.getItem('retailers')) || null,
};

const mutations = {
    SET_RETAILERS(state, retailers) {
        state.retailers = retailers;
        localStorage.setItem('retailers', JSON.stringify(retailers));
    },
    ADD_RETAILER(state, retailer) {
        state.retailers.push(retailer);
    },
    UPDATE_RETAILER(state, updatedRetailer) {
        state.retailers = state.retailers.map(retailer =>
            retailer.id === updatedRetailer.id ? updatedRetailer : retailer
        );
    },
    REMOVE_RETAILER(state, retailerId) {
        state.retailers = state.retailers.filter(retailer => retailer.id !== retailerId);
    }
};

const actions = {
    async setRetailers({ commit }, retailers) {
        try {
            commit("SET_RETAILERS", retailers);
        } catch (error) {
            console.error("Error setting retailers:", error);
        } 
    },

    async addRetailer({ commit, dispatch }, retailerData) {
        try {
            commit("ADD_RETAILER", retailerData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error adding retailer:", error);
        }
    },

    async updateRetailer({ commit, dispatch }, retailerData ) {
        try {
            commit("UPDATE_RETAILER", retailerData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error updating retailer:", error);
        }
    },

    async removeRetailer({ commit, dispatch }, retailerId) {
        try {
            commit("REMOVE_RETAILER", retailerId);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error deleting retailer:", error);
        }
    },

    updateStorage({ state }) {
        localStorage.setItem('retailers', JSON.stringify(state.retailers));
    },
};

const getters = {
    getRetailers(state) {
        return state.retailers ? state.retailers : [];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};