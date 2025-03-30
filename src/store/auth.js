const state = {
   user: JSON.parse(localStorage.getItem('user')) || null,
//    token: JSON.parse(localStorage.getItem('token')) || null,
   status: '',
}

const mutations = {
    // AUTH_SUCCESS(state, { token }) {
    //     state.token = token;
    //     state.status = '';
  
    //     localStorage.setItem('token', JSON.stringify(token));
    // }, 
    SET_USER(state, { user }) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    AUTH_ERROR(state) {
        state.status = 'error';
    },
    LOGOUT_USER(state) {
        state.user = null;
        // state.token = null;

        localStorage.removeItem('user');
        // localStorage.removeItem('token');
    }
}

const actions = {
    login({ commit, dispatch }, user) {
        commit('SET_USER', { user });
        dispatch('retailers/setRetailers', user.retailers, { root: true })
    },
    async logout({ commit }) {
        commit('LOGOUT_USER');
    },
    async clearExpiredSession({ commit }) {
        commit('LOGOUT_USER');
    },
}

const getters = {
    isAuthenticated(state) {
        return !!state.user;
    },
    getUserData: (state) => state.user
}

export default {
    namespaced: true, 
    state, 
    mutations, 
    actions,
    getters,
}