import { createStore } from "vuex";
import ui from "./ui";
import auth from "./auth";
import retailers from "./retailers";
import products from "./products";

export default createStore({
    modules: {
        ui,
        auth,
        retailers,
        products
    },
});