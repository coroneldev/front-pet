<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Usuarios</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row justify-end q-mb-md">
          <q-btn color="green-7" text-color="white" label="Nuevo" icon-right="add" to="/usuarios/create" />
        </div>

        <q-markup-table flat bordered>
          <thead class="bg-green-2">
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Ap. Paterno</th>
              <th class="text-left">Ap. Materno</th>
              <th class="text-left">Nombres</th>
              <th class="text-left">C.I.</th>
              <th class="text-left">Sexo</th>
              <th class="text-left">Telf./Celular</th>
              <th class="text-left">Rol</th>
              <th class="text-left">Estado</th>
              <th class="text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in usuarios" :key="index">
              <td>{{ usuario.id }}</td>
              <td>{{ usuario.apellido_paterno }}</td>
              <td>{{ usuario.apellido_materno }}</td>
              <td>{{ usuario.nombres }}</td>
              <td>{{ usuario.cedula_identidad }} {{ usuario.expedicion_ci }}</td>
              <td>{{ usuario.sexo }}</td>
              <td>{{ usuario.celular }}</td>
              <td>{{ usuario.rol_id || '—' }}</td>
              <td>{{ usuario.estado }}</td>
              <td class="row q-pa-none">
                <q-btn v-if="usuario.id" round color="green-7" text-color="white" icon="visibility"
                  class="q-ml-xs q-mr-xs" :to="'/usuarios/show/' + usuario.id" title="Ver Detalle">
                </q-btn>

                <q-btn v-if="usuario.id" round color="green-7" text-color="white" icon="mode_edit"
                  class="q-ml-xs q-mr-xs" :to="'/usuarios/edit/' + usuario.id" title="Editar">
                </q-btn>
                <q-btn v-if="usuario.id" round color="green-7" text-color="white" icon="lock_reset"
                  class="q-ml-xs q-mr-xs" @click="onModalReset(usuario.id)" title="Resetear Contraseña">
                </q-btn>
                <q-btn v-if="usuario.id" round color="green-7" text-color="white" icon="delete" class="q-ml-xs q-mr-xs"
                  @click="onModal(usuario.id)" title="Eliminar">
                </q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>

      </q-card-section>
    </q-card>

    <!-- Dialog Reset -->
    <q-dialog v-model="alertReset">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section class="text-h6">Resetear Contraseña</q-card-section>
        <q-card-section>
          ¿Está seguro de resetear la contraseña del registro?
          <p class="text-red">Nota: La nueva contraseña será la cédula de identidad</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="green-7" label="Aceptar" @click="onResetPassword()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Eliminar -->
    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section class="text-h6">Eliminar Registro</q-card-section>
        <q-card-section>
          ¿Está seguro de eliminar el registro?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="green-7" label="Aceptar" @click="onEliminar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import UsuarioService from "@/services/UsuarioService";
import Usuario from "@/entities/Usuario";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'ListUsuario',
  data() {
    return {
      usuarios: [] as Usuario[],
      alertReset: ref(false),
      alert: ref(false),
      idReset: 0,
      idEliminar: 0,
    }
  },
  methods: {
    listar() {
      Loading.show({ message: "Cargando..." });
      UsuarioService.getAll()
        .then((response: any) => {
          if (response.data.status) {
            // Procesar usuarios decodificando Base64
            this.usuarios = response.data.data.map((u: any) => {
              let usuarioObj = u.usuario ? JSON.parse(atob(u.usuario)) : u;
              if (u.rol) {
                usuarioObj.rol = JSON.parse(atob(u.rol));
              }
              usuarioObj.id = usuarioObj.id ?? u.id;

              // 🔹 Console log fila por fila
              console.log(`Usuario ID ${usuarioObj.id}:`, {
                id: usuarioObj.id,
                nombres: usuarioObj.nombres,
                apellido_paterno: usuarioObj.apellido_paterno,
                apellido_materno: usuarioObj.apellido_materno,
                cedula: usuarioObj.cedula_identidad,
                expedicion: usuarioObj.expedicion_ci,
                sexo: usuarioObj.sexo,
                celular: usuarioObj.celular,
                estado: usuarioObj.estado,
                rol: usuarioObj.rol
              });

              return usuarioObj;
            });

            Loading.hide();
            toast(response.data.message, { "type": "success" });
          } else {
            Loading.hide();
            toast(response.data.message, { "type": "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
          toast("Error al cargar los usuarios", { "type": "error" });
        });
    },
    onModal(id: number) {
      this.alert = true;
      this.idEliminar = id;
    },
    onModalReset(id: number) {
      this.alertReset = true;
      this.idReset = id;
    },
    onResetPassword() {
      Loading.show({ message: "Cargando..." });
      UsuarioService.resetPassword(this.idReset)
        .then((response: any) => {
          if (response.data.status) {
            this.alertReset = false;
            this.idReset = 0;
            this.listar();
            Loading.hide();
            toast(response.data.message, { "type": "success" });
          } else {
            Loading.hide();
            toast(response.data.message, { "type": "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
          toast("Error al resetear la contraseña", { "type": "error" });
        });
    },
    onEliminar() {
      Loading.show({ message: "Cargando..." });
      UsuarioService.delete(this.idEliminar)
        .then((response: any) => {
          if (response.data.status) {
            this.alert = false;
            this.idEliminar = 0;
            this.listar();
            Loading.hide();
            toast(response.data.message, { "type": "success" });
          } else {
            Loading.hide();
            toast(response.data.message, { "type": "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
          toast("Error al eliminar el usuario", { "type": "error" });
        });
    }
  },
  mounted() {
    this.listar();
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
