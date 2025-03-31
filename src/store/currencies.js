const state = {
    currencies: JSON.parse(localStorage.getItem('currencies')) || null,
    meta: JSON.parse(localStorage.getItem('meta')) || [],
};

const mutations = {
    SET_CURRENCIES(state, currencies) {
        state.currencies = currencies;
        localStorage.setItem('currencies', JSON.stringify(currencies));
    },
    SET_META(state, meta) {
        state.meta = meta;
        localStorage.setItem('meta', JSON.stringify(meta));
    },
};

const actions = {
    async setCurrencies({ commit }, currencies) {
        try {
            commit("SET_CURRENCIES", currencies);
        } catch (error) {
            console.error("Error setting currencies:", error);
        } 
    },
    async setMetaData({ commit }, meta) {
        try {
            commit("SET_META", meta);
        } catch (error) {
            console.error("Error setting products:", error);
        } 
    },
};

const getters = {
    getCurrencies(state) {
        return state.currencies ? state.currencies : [];
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