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
    meta: {requiresAuth: true},
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
        path: "/usuarios/edit/:id",
        name: "edit-usuario",
        component: () => import("./components/usuario/EditUsuario.vue"),
      },
      {
        path: "/cursos",
        name: "list-curso",
        component: () => import("./components/curso/ListCurso.vue"),
      },
      {
        path: "/cursos/create",
        name: "create-curso",
        component: () => import("./components/curso/CreateCurso.vue"),
      },
      {
        path: "/cursos/edit/:id",
        name: "edit-curso",
        component: () => import("./components/curso/EditCurso.vue"),
      },
      {
        path: "/cursos/edit-imagen/:id",
        name: "edit-imagen-curso",
        component: () => import("./components/curso/EditImagenCurso.vue"),
      },
      {
        path: "/inscripciones",
        name: "list-inscripcion",
        component: () => import("./components/inscripcion/ListInscripcion.vue"),
      },
      {
        path: "/inscripciones/create",
        name: "create-inscripcion",
        component: () => import("./components/inscripcion/CreateInscripcion.vue"),
      },
      {
        path: "/inscripciones/edit/:id",
        name: "edit-inscripcion",
        component: () => import("./components/inscripcion/EditInscripcion.vue"),
      },
      {
        path: "/inscripciones-usuario",
        name: "list-inscripcion-usuario",
        component: () => import("./components/inscripcion-usuario/ListInscripcion.vue"),
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
        path: "/areas",
        name: "list-area",
        component: () => import("./components/area/ListArea.vue"),
      },
      {
        path: "/areas/create",
        name: "create-area",
        component: () => import("./components/area/CreateArea.vue"),
      },
      {
        path: "/areas/edit/:id",
        name: "edit-area",
        component: () => import("./components/area/EditArea.vue"),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if ( to.name !== 'login' && !store.getters.loggedIn){
    router.push({ path: '/login' }).catch(()=>{});
  }
  else{
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