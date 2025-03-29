const state = {
    currencies: JSON.parse(localStorage.getItem('currencies')) || null,
};

const mutations = {
    SET_CURRENCIES(state, currencies) {
        state.currencies = currencies;
        localStorage.setItem('currencies', JSON.stringify(currencies));
    }
};

const actions = {
    async setCurrencies({ commit }, currencies) {
        try {
            commit("SET_CURRENCIES", currencies);
        } catch (error) {
            console.error("Error setting currencies:", error);
        } 
    },
};

const getters = {
    getCurrencies(state) {
        return state.currencies ? state.currencies : [];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};