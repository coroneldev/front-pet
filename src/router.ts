import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import store from './store';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    alias: "/login",
    name: "login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./components/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/inicio",
        alias: "/inicio",
        name: "inicio",
        component: () => import("./components/Inicio.vue"),
      },
      {
        path: "/logout",
        alias: "/logout",
        name: "logout",
        component: () => import("./components/Logout.vue"),
      },
      {
        path: "/perfil",
        alias: "/perfil",
        name: "perfil",
        component: () => import("./components/perfil/Perfil.vue"),
      },
      {
        path: "/usuarios",
        name: "list-usuario",
        component: () => import("./components/usuario/ListUsuario.vue"),
      },
      {
        path: "/usuarios/create",
        name: "create-usuario",
        component: () => import("./components/usuario/CreateUsuario.vue"),
      },
      {
        path: "/usuarios/show/:id",
        name: "show-usuario",
        component: () => import("./components/usuario/ShowUsuario.vue"),
      },
      {
        path: "/usuarios/edit/:id",
        name: "edit-usuario",
        component: () => import("./components/usuario/EditUsuario.vue"),
      },

      {
        path: "/roles",
        name: "list-rol",
        component: () => import("./components/rol/ListRol.vue"),
      },
      {
        path: "/roles/create",
        name: "create-rol",
        component: () => import("./components/rol/CreateRol.vue"),
      },
      {
        path: "/roles/edit/:id",
        name: "edit-rol",
        component: () => import("./components/rol/EditRol.vue"),
      },
      {
        path: "/clientes",
        name: "list-cliente",
        component: () => import("./components/cliente/ListCliente.vue"),
      },
      {
        path: "/clientes/create",
        name: "create-cliente",
        component: () => import("./components/cliente/CreateCliente.vue"),
      },
      {
        path: "/clientes/edit/:id",
        name: "edit-cliente",
        component: () => import("./components/cliente/EditCliente.vue"),
      },
      {
        path: "/mascotas",
        name: "list-mascota",
        component: () => import("./components/mascota/ListMascota.vue"),
      },
      {
        path: "/mascotas/create",
        name: "create-mascota",
        component: () => import("./components/mascota/CreateMascota.vue"),
      },
      {
        path: "/mascotas/edit/:id",
        name: "edit-mascota",
        component: () => import("./components/mascota/EditMascota.vue"),
      },
      {
        path: "/mascotas/edit-imagen/:id",
        name: "edit-imagen-mascota",
        component: () => import("./components/mascota/EditImagenMascota.vue"),
      },


    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.loggedIn) {
    router.push({ path: '/login' }).catch(() => { });
  }
  else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!store.getters.isLoggedIn) {
//       next({ name: 'login' });
//     } else {
//       next(); // go to wherever I'm going
//     }
//   } else {
//     next(); // does not require auth, make sure to always call next()!
//   }
// });

export default router;