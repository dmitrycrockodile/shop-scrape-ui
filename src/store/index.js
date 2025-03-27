import { createStore } from "vuex";
import ui from "./ui";
import auth from "./auth";
import retailers from "./retailers";

export default createStore({
    modules: {
        ui,
        auth,
        retailers
    },
});