<template>
  <div>
    <q-layout view="hHh Lpr lff" container style="height: 100vh; width: 100vw;">
      <!-- Header -->
      <q-header elevated class="header-bar">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>
            <q-icon name="pets" class="q-mr-sm" /> COMVET
          </q-toolbar-title>

          <q-btn color="green-6" icon="logout" label="Salir" to="/logout" rounded unelevated />
        </q-toolbar>
      </q-header>

      <!-- Drawer -->
      <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500" bordered class="drawer-style">
        <q-scroll-area class="fit">
          <q-list>

            <!-- Usuario -->
            <q-item class="user-card">
              <div class="row items-center justify-center">
                <q-icon name="account_circle" color="green-6" size="70px" />
              </div>
              <div class="text-center q-mt-sm">
                <q-item-label class="text-green-8 text-subtitle1 text-weight-bold">{{ usuario.nombres }}
                  {{ usuario.apellido_paterno }}</q-item-label>
                <q-item-label class="text-caption text-grey-8">{{ usuario.email }}</q-item-label>
                <q-item-label class="text-caption text-primary">{{ rol.nombre }}</q-item-label>
              </div>
            </q-item>

            <q-separator spaced />

            <!-- Menú dinámico -->
            <q-item v-if="rol.id == 1 || rol.id == 2" clickable v-ripple :active="link === 'home'"
              @click="link = 'home'" active-class="my-menu-link" to="/inicio">
              <q-item-section avatar><q-icon name="home" /></q-item-section>
              <q-item-section>Inicio</q-item-section>
            </q-item>

            <q-item v-if="rol.id == 1 || rol.id == 2" clickable v-ripple :active="link === 'perfil'"
              @click="link = 'perfil'" active-class="my-menu-link" to="/perfil">
              <q-item-section avatar><q-icon name="assignment_ind" /></q-item-section>
              <q-item-section>Mi Perfil</q-item-section>
            </q-item>

            <q-item v-if="rol.id == 2" clickable v-ripple :active="link === 'cursos-inscritos'"
              @click="link = 'cursos-inscritos'" active-class="my-menu-link" to="/inscripciones-usuario">
              <q-item-section avatar><q-icon name="fact_check" /></q-item-section>
              <q-item-section>Cursos Inscritos</q-item-section>
            </q-item>

            <q-separator v-if="rol.id == 1" spaced />
            <q-item-label v-if="rol.id == 1" header class="text-green-7">Transaccionales</q-item-label>

            <q-item v-if="rol.id == 1" clickable v-ripple :active="link === 'usuarios'" @click="link = 'usuarios'"
              active-class="my-menu-link" to="/usuarios">
              <q-item-section avatar><q-icon name="people" /></q-item-section>
              <q-item-section>Usuarios</q-item-section>
            </q-item>

            <q-item v-if="rol.id == 1" clickable v-ripple :active="link === 'cursos'" @click="link = 'cursos'"
              active-class="my-menu-link" to="/cursos">
              <q-item-section avatar><q-icon name="article" /></q-item-section>
              <q-item-section>Cursos</q-item-section>
            </q-item>

            <q-item v-if="rol.id == 1" clickable v-ripple :active="link === 'inscripciones'"
              @click="link = 'inscripciones'" active-class="my-menu-link" to="/inscripciones">
              <q-item-section avatar><q-icon name="edit_square" /></q-item-section>
              <q-item-section>Inscripciones</q-item-section>
            </q-item>

            <q-separator v-if="rol.id == 1" spaced />
            <q-item-label v-if="rol.id == 1" header class="text-green-7">Paramétricas</q-item-label>

            <q-item v-if="rol.id == 1" clickable v-ripple :active="link === 'roles'" @click="link = 'roles'"
              active-class="my-menu-link" to="/roles">
              <q-item-section avatar><q-icon name="settings_accessibility" /></q-item-section>
              <q-item-section>Roles</q-item-section>
            </q-item>

            <q-item v-if="rol.id == 1" clickable v-ripple :active="link === 'areas'" @click="link = 'areas'"
              active-class="my-menu-link" to="/areas">
              <q-item-section avatar><q-icon name="view_module" /></q-item-section>
              <q-item-section>Áreas</q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <!-- Contenido -->
      <q-page-container class="page-bg">
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue';
import Usuario from '@/entities/Usuario';
import Rol from '@/entities/Rol';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      drawer: ref(false),
      link: ref('home'),

      usuario: {} as Usuario,
      rol: {} as Rol,
    }
  },
  methods: {
    parseoStorage() {
      this.usuario = JSON.parse(atob(localStorage.getItem("usuario") || '{}'));
      this.rol = JSON.parse(atob(localStorage.getItem("rol") || '{}'));
    }
  },
  created() {
    this.parseoStorage();
  }
});
</script>

<style scoped>
/* Header */
.header-bar {
  background: linear-gradient(135deg, #43a047, #2e7d32);
  color: white;
}

/* Drawer */
.drawer-style {
  background: #f5f5f5;
}

/* Card usuario */
.user-card {
  padding: 20px;
  text-align: center;
  background: #e8f5e9;
  border-bottom: 1px solid #c8e6c9;
}

/* Enlace activo */
.my-menu-link {
  color: #2e7d32;
  background: #c8e6c9;
  border-radius: 10px;
  font-weight: bold;
}

/* Fondo con huellitas */
.page-bg {
  background: linear-gradient(135deg, #f1f8e9, #e8f5e9);
  background-image: url("https://www.transparenttextures.com/patterns/paw-print.png");
  background-repeat: repeat;
  background-size: 200px;
}
</style>
