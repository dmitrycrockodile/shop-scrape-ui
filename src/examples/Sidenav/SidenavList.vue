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
          to="/dashboard"
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
          to="/users"
          :class="getRoute() === 'users' ? 'active' : ''"
          navText="Users"
        >
          <template v-slot:icon>
            <i
              class="ni ni-single-02 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/pack-sizes"
          :class="getRoute() === 'pack-sizes' ? 'active' : ''"
          navText="Pack sizes"
        >
          <template v-slot:icon>
            <i class="ni ni-app text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/currencies"
          :class="getRoute() === 'currencies' ? 'active' : ''"
          navText="Currencies"
        >
          <template v-slot:icon>
            <i class="ni ni-money-coins text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>