import { createStore } from "vuex";
import ui from "./ui";
import auth from "./auth";
import retailers from "./retailers";
import products from "./products";
import users from "./users";
import packSizes from "./packSizes";

export default createStore({
    modules: {
        ui,
        auth,
        retailers,
        products,
        users,
        packSizes
    },
});