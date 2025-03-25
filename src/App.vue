<!--
=========================================================
* Vue Argon Dashboard 2 - v4.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-argon-dashboard
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<script>
import { mapState } from "vuex";
import Sidenav from "./examples/Sidenav";
// import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
// import { mapMutations } from "vuex/dist/vuex.cjs.js";

export default {
  components: {
    Sidenav,
    Navbar,
    // Configurator,
    AppFooter,
  },
  computed: {
    ...mapState("ui", [
      "isNavFixed",
      "darkMode",
      "isAbsolute",
      "showSidenav",
      "layout",
      "showNavbar",
      "showFooter",
    ]),

    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.isNavFixed && !this.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.isNavFixed && this.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.isAbsolute,
        "px-0 mx-4": !this.isAbsolute,
      };
    },
  },
//   methods: {
//     ...mapMutations("ui", ['toggleConfigurator'])
//   },
};
</script>

<template>
  <div
    v-show="layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>

  <sidenav v-if="showSidenav" />

  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- nav -->

    <navbar :class="[navClasses]" v-if="showNavbar" />

    <router-view />

    <app-footer v-show="showFooter" />

    <!-- <configurator
      :toggle="toggleConfigurator"
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    /> -->
  </main>
</template>
