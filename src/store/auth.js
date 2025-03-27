import axios from "axios";


const state = {
   user: JSON.parse(localStorage.getItem('user')) || null,
   token: JSON.parse(localStorage.getItem('token')) || null,
   status: '',
}

const mutations = {
    AUTH_SUCCESS(state, { token }) {
        state.token = token;
        state.status = '';
  
        localStorage.setItem('token', JSON.stringify(token));
    }, 
    SET_USER(state, { user }) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
    AUTH_ERROR(state) {
        state.status = 'error';
    },
    LOGOUT_USER(state) {
        state.user = null;
        state.token = null;

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}

const actions = {
    async login({ commit, dispatch }, payload) {
        await axios.get('http://localhost:8876/api/sanctum/csrf-cookie');

        try {
            const res = await axios.post("http://localhost:8876/api/login", payload);

            if (res.status === 200) {
                const user = res.data.data;
                const token = res.data.data.token;

                commit('AUTH_SUCCESS', { token });
                commit('SET_USER', { user });
                dispatch('retailers/setRetailers', user.retailers, { root: true })

                return res;
            }
        } catch (err) {
            console.error(err)
            commit('AUTH_ERROR');

            return Promise.reject(err);
        }
    },
    async logout({ commit }) {
        try {
            await axios.post('http://localhost:8876/api/logout');

            commit('LOGOUT_USER');
        } catch(err) {
            console.error(err.response.status)
            if (err.response.status !== 401) {
                console.error(err);

                return Promise.reject(err);
            } 

            return err;
        }
    },
    async clearExpiredSession({ commit }) {
        commit('LOGOUT_USER');
    },
}

const getters = {
    isAuthenticated(state) {
        return !!state.token;
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