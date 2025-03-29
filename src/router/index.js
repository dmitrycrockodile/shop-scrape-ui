import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/product/Index.vue"),
  },
  {
    path: "/products/create",
    name: "Products / Create",
    component: () => import("../views/product/Create.vue"),
  },
  {
    path: "/products/:id/retailers",
    name: "Products / Retailers",
    component: () => import("../views/product/Retailers.vue"),
  },
  {
    path: "/products/:id/edit",
    name: "Products / Edit",
    component: () => import("../views/product/Edit.vue"),
  },
  {
    path: "/retailers",
    name: "Retailers",
    component: () => import("../views/retailer/Index.vue"),
  },
  {
    path: "/retailers/create",
    name: "Retailers / Create",
    component: () => import("../views/retailer/Create.vue"),
  },
  {
    path: "/retailers/:id/products",
    name: "Retailers / Products",
    component: () => import("../views/retailer/Products.vue"),
  },
  {
    path: "/retailers/:id/products/add",
    name: "Retailers / Products / Add",
    component: () => import("../views/retailer/AddProduct.vue"),
  },
  {
    path: "/retailers/:id/edit",
    name: "Retailers / Edit",
    component: () => import("../views/retailer/Edit.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/user/Index.vue"),
  },
  {
    path: "/users/create",
    name: "Users / Create",
    component: () => import("../views/user/Create.vue"),
  },
  {
    path: "/users/:id/edit",
    name: "Users / Edit",
    component: () => import("../views/user/Edit.vue"),
  },
  {
    path: "/users/:id/retailers",
    name: "Users / Retailers",
    component: () => import("../views/user/Retailers.vue"),
  },
  {
    path: "/users/:id/retailers/assign",
    name: "Users / Retailers / Assign",
    component: () => import("../views/user/AssignRetailers.vue"),
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import("../views/notFound/Index.vue"),
    meta: { title: 'Shop Scrape | Page Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
