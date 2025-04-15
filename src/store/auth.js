const state = {
   user: JSON.parse(localStorage.getItem('user')) || null,
   status: '',
}

const mutations = {
    SET_USER(state, { user }) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    AUTH_ERROR(state) {
        state.status = 'error';
    },
    LOGOUT_USER(state) {
        state.user = null;

        localStorage.removeItem('user');
    }
}

const actions = {
    login({ commit, dispatch }, user) {
        commit('SET_USER', { user });
        console.log(user)
        dispatch('retailers/setRetailers', user.retailers, { root: true })
    },
    async logout({ commit, dispatch }) {
        commit('LOGOUT_USER');

        dispatch('users/setUsers', [], { root: true });
        dispatch('currencies/setCurrencies', [], { root: true });
        dispatch('packSizes/setPackSizes', [], { root: true });
        dispatch('products/setProducts', [], { root: true });
        dispatch('products/setMetaData', [], { root: true });
        dispatch('retailers/setRetailers', [], { root: true });
    },
    async clearExpiredSession({ commit, dispatch }) {
        commit('LOGOUT_USER');

        dispatch('users/setUsers', [], { root: true });
        dispatch('currencies/setCurrencies', [], { root: true });
        dispatch('packSizes/setPackSizes', [], { root: true });
        dispatch('products/setProducts', [], { root: true });
        dispatch('products/setMetaData', [], { root: true });
        dispatch('retailers/setRetailers', [], { root: true });
    },
}

const getters = {
    isAuthenticated(state) {
        return !!state.user;
    },
    isAdmin(state) {
        return state.user?.admin || false;
    },
    getUserData: (state) => state.user,
}

export default {
    namespaced: true, 
    state, 
    mutations, 
    actions,
    getters,
}