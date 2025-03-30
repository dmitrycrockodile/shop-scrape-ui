const state = {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
};
  
const mutations = {
    TOGGLE_CONFIGURATOR(state) {
        state.showConfig = !state.showConfig;
    },
    SIDEBAR_MINIMIZE(state) {
        let sidenav_show = document.querySelector("#app");
        if (state.isPinned) {
            sidenav_show.classList.add("g-sidenav-hidden");
            sidenav_show.classList.remove("g-sidenav-pinned");
            state.isPinned = false;
        } else {
            sidenav_show.classList.add("g-sidenav-pinned");
            sidenav_show.classList.remove("g-sidenav-hidden");
            state.isPinned = true;
        }
    },
    SET_SIDEBAR_TYPE(state, payload) {
        state.sidebarType = payload;
    },
    SET_NAVBAR_FIXED(state) {
        state.isNavFixed = !state.isNavFixed;
    },
};
  
const actions = {
    toggleSidebarColor({ commit }, payload) {
        commit("sidebarType", payload);
    },
    toggleConfigurator({ commit }) {
        commit("TOGGLE_CONFIGURATOR");
    },
    setSidebarType({ commit }) {
        commit("SET_SIDEBAR_TYPE");
    },
    setNavbarFixed({ commit }) {
        commit("SET_NAVBAR_FIXED");
    },
    minimizeSidebar({ commit }) {
        commit("SIDEBAR_MINIMIZE");
    },
};
  
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};  