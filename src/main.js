import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from 'axios';
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";

const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(
    response => response,
    err => {
        // Token has expired or user is unauthorized
        if (err.response && (err.response.status === 401 || err.response.status === 419)) {
            store.dispatch('auth/clearExpiredSession');
            router.push({ name: 'Signin' });
        } else if (err.response && err.response.status === 403) {
            router.push({ name: 'forbidden' });
        }
        return Promise.reject(err);
    }
);
appInstance.config.globalProperties.axios = axios;

appInstance.mount("#app");