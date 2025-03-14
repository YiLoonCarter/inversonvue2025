import { createRouter, createWebHistory } from "vue-router";
import SubMenus from "../components/SubMenus.vue";
import List from "../components/List.vue";
import UserForm from "../components/UserForm.vue";

const routes = [
  //   {
  //     path: "/",
  //     name: "home",
  //     component: SubMenus,
  //   },
  //   {
  //     path: "/sign-in",
  //     name: "signin",
  //     component: SignIn,
  //   },
  {
    path: "/",
    name: "home",
    component: SubMenus,
  },
  {
    path: "/list",
    name: "list",
    component: List,
  },
  {
    path: "/userform/:trxId/:mode",
    name: "UserForm",
    component: UserForm,
    props: true,
  },
  // {
  //   path: "/userform/",
  //   name: "UserForm",
  //   component: UserForm,
  //   // props: true,
  // },
  //   {
  //     path: "/mychart",
  //     name: "mychart",
  //     component: MyChart,
  //   },
  //   {
  //     path: "/edit/:id",
  //     name: "edit",
  //     component: HomeEdit,
  //   },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
