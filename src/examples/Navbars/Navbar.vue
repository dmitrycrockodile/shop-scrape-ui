<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { handleLogout } from "@/services/authService";
import Breadcrumbs from "../Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState("ui", ["isRTL"]),
    ...mapGetters("auth", ["isAuthenticated"]),
    
    currentRouteName() {
      return this.$route.name;
    },
    currentDirectory() {
      let dir = this.$route.path.split("/")[1];
      return dir.charAt(0).toUpperCase() + dir.slice(1);
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("ui", ["minimizeSidebar"]),
    async handleLogout() {
        const res = await handleLogout();

        if (res.success) {
            this.logout();
            this.$router.push({ name: "Signin" })
        } 
    },
    closeMenu() {
      setTimeout(() => {
        this.showMenu = false;
      }, 100);
    },
  },
};
</script>

<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs
        :current-page="currentRouteName"
        :current-directory="currentDirectory"
      />

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center ms-md-auto"
        >
        </div>
        <ul class="navbar-nav justify-content-end">
          <li v-if="!isAuthenticated" class="nav-item d-flex align-items-center">
            <router-link
              :to="{ name: 'Signin' }"
              class="px-0 nav-link font-weight-bold text-white"
            >
              <i class="fa fa-user me-sm-2"></i>
              <span class="d-sm-inline d-none">Sign In</span>
            </router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <form method="post" @submit.prevent="handleLogout">
              <button type="submit" class="nav-link font-weight-bold text-white bg-transparent logout__button">Logout</button>
            </form>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center me-4">
            <a
              href="#"
              @click="minimizeSidebar"
              class="p-0 nav-link text-white"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
