<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Usuarios</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <q-btn color="primary" label="Nuevo" icon-right="add" to="/usuarios/create" />
        
        <div class="q-mt-md">

          <q-markup-table flat bordered>
            <thead class="bg-blue-2">
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
                <td class="text-left">{{ usuario.id }}</td>
                <td class="text-left">{{ usuario.apellido_paterno }}</td>
                <td class="text-left">{{ usuario.apellido_materno }}</td>
                <td class="text-left">{{ usuario.nombres }}</td>
                <td class="text-left">{{ usuario.cedula_identidad }} {{ usuario.expedicion_ci }}</td>
                <td class="text-left">{{ usuario.sexo }}</td>
                <td class="text-left">{{ usuario.celular }}</td>
                <td class="text-left">{{ usuario.rol.nombre }}</td>
                <td class="text-left">{{ usuario.estado }}</td>
                <td>
                  <q-btn round color="white" text-color="black" icon="mode_edit" class="q-ml-sm" :to="'/usuarios/edit/'+usuario.id" title="Editar"></q-btn>
                  <q-btn round color="white" text-color="black" icon="lock_reset" class="q-ml-sm" @click="onModalReset(usuario.id)" title="Resetear Contraseña"></q-btn>
                  <q-btn round color="white" text-color="black" icon="delete" class="q-ml-sm" @click="onModal(usuario.id)" title="Eliminar"></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

      </q-card-section>
    </q-card>

    <q-dialog v-model="alertReset">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Resetear Contraseña</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de resetear la contraseña del registro?
          <p class="text-red">Nota: La nueva contraseña su cédula de identidad</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Aceptar" @click="onResetPassword()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Eliminar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de eliminar el registro?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Aceptar" @click="onEliminar()" />
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
  name: 'HelloWorld',
  data () {
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
      Loading.show({message: "Cargando..."});
      UsuarioService.getAll()
        .then((response: any) => {
          if(response.data.status == true) {
            this.usuarios = response.data.data;
            Loading.hide();
            toast(response.data.message, {"type": "success"});
          }
          else{
            Loading.hide();
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onModal(id: number){
      this.alert = true;
      this.idEliminar = id;
    },
    onModalReset(id: number){
      this.alertReset = true;
      this.idReset = id;
    },
    onResetPassword(){ 
      Loading.show({message: "Cargando..."});
      UsuarioService.resetPassword(this.idReset)
        .then((response: any) => {
          if(response.data.status == true) {
            this.alertReset = false;
            this.idReset = 0;
            this.listar();
            Loading.hide();
            toast(response.data.message, {"type": "success"});
          }
          else{
            Loading.hide();
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onEliminar(){ 
      Loading.show({message: "Cargando..."});
      UsuarioService.delete(this.idEliminar)
        .then((response: any) => {
          if(response.data.status == true) {
            this.alert = false;
            this.idEliminar = 0;
            this.listar();
            Loading.hide();
            toast(response.data.message, {"type": "success"});
          }
          else{
            Loading.hide();
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.listar();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
