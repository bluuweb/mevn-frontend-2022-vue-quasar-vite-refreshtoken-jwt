import { api } from "src/boot/axios";

// const redirect = async (to, from, next) => {
//   console.log(to.params.catchAll[0]);
//   try {
//     const { data } = await api.get(`links/${to.params.catchAll[0]}`);
//     window.location.href = data.longLink;
//     next();
//   } catch (error) {
//     console.log(error.response?.data || error);
//     next();
//   }
// };

const redirect = async (to, from, next) => {
  console.log(to.params.nanoid);
  try {
    const { data } = await api.get(`links/${to.params.nanoid}`);
    window.location.href = data.longLink;
    next();
  } catch (error) {
    console.log(error.response?.data || error);
    next("/404");
  }
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      {
        path: "protected",
        component: () => import("pages/ProtectedPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/:nanoid",
        component: () => import("pages/EsperaRedirect.vue"),
        beforeEnter: redirect,
      },
    ],
  },
  {
    path: "/404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    beforeEnter: redirect,
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
