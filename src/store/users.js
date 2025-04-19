const state = {
    users: JSON.parse(localStorage.getItem('users')) || []
};

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
        localStorage.setItem('users', JSON.stringify(users));
    },
    ADD_USER(state, user) {
        state.users.push(user);
    },
    UPDATE_USER(state, updatedUser) {
        state.users = state.users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
    },
    REMOVE_USER(state, userId) {
        state.users = state.users.filter(user => user.id !== userId);
    },
    UPDATE_USER_RETAILERS(state, { id, retailers }) {
        const user = state.users.find(user => user.id == id);
        
        if (user) {
            user.retailers = retailers;
        }
    }
};

const actions = {
    async setUsers({ commit }, users) {
        try {
            commit("SET_USERS", users);
        } catch (error) {
            console.error("Error setting users:", error);
        } 
    },

    async addUser({ commit, dispatch }, userData) {
        try {
            commit("ADD_USER", userData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error adding user:", error);
        }
    },

    async updateUser({ commit, dispatch }, userData ) {
        try {
            commit("UPDATE_USER", userData);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    },

    async removeUser({ commit, dispatch }, userId) {
        try {
            commit("REMOVE_USER", userId);
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    },

    async updateUserRetailers({ commit, dispatch }, { id, retailers }) {
        try {
            commit("UPDATE_USER_RETAILERS", { id, retailers });
            dispatch('updateStorage');
        } catch (error) {
            console.error("Error updating user retailers:", error);
        }
    },

    updateStorage({ state }) {
        localStorage.setItem('users', JSON.stringify(state.users));
    },
};

const getters = {
    getUsers(state) {
        return state.users ? state.users : [];
    },
    getUserRetailers: (state) => (id) => {
        const user = state.users.find(user => user.id == id);
        return user?.retailers ?? [];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};