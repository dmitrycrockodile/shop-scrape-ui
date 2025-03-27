<script>
import { useRoute } from "vue-router";

import SidenavItem from "./SidenavItem.vue";

export default {
    components: {
        SidenavItem
    },
    methods: {
        getRoute() {
            const route = useRoute();
            const routeArr = route.path.split("/");
            return routeArr[1];
        },
    }
}
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
        <li class="nav-item">
            <sidenav-item
              to="/products"
              :class="getRoute() === 'products' ? 'active' : ''"
              navText="Products"
            >
              <template v-slot:icon>
                <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </template>
            </sidenav-item>
        </li>

        <li class="nav-item">
            <sidenav-item
              to="/retailers"
              :class="getRoute() === 'retailers' ? 'active' : ''"
              navText="Retailers"
            >
              <template v-slot:icon>
                <i class="ni ni-building text-primary text-sm opacity-10"></i>
              </template>
            </sidenav-item>
        </li>

      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          navText="Dashboard"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          navText="Tables"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/billing"
          :class="getRoute() === 'billing' ? 'active' : ''"
          navText="Billing"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/virtual-reality"
          :class="getRoute() === 'virtual-reality' ? 'active' : ''"
          navText="Virtual Reality"
        >
          <template v-slot:icon>
            <i class="ni ni-app text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2"
        >
          ACCOUNT PAGES
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          navText="Profile"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>