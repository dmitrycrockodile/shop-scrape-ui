import { createStore } from "vuex";
import ui from "./ui";
import auth from "./auth";
import retailers from "./retailers";
import products from "./products";
import users from "./users";

export default createStore({
    modules: {
        ui,
        auth,
        retailers,
        products,
        users
    },
});