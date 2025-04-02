import { createRouter, createWebHistory } from "vue-router";
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
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
    path: "/products/import",
    name: "Products / Import",
    component: () => import("../views/product/Import.vue"),
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
    path: "/pack-sizes",
    name: "Pack sizes",
    component: () => import("../views/pack-size/Index.vue"),
  },
  {
    path: "/pack-sizes/create",
    name: "Pack sizes / Create",
    component: () => import("../views/pack-size/Create.vue"),
  },
  {
    path: "/pack-sizes/:id/edit",
    name: "Pack sizes / Edit",
    component: () => import("../views/pack-size/Edit.vue"),
  },
  {
    path: "/currencies",
    name: "Currencies",
    component: () => import("../views/currency/Index.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/metric/Dashboard.vue"),
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
