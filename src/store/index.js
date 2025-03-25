import { createStore } from "vuex";
import ui from "./ui";
import auth from "./auth";

export default createStore({
    modules: {
        ui,
        auth
    },
});