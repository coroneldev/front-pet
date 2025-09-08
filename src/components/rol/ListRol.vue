<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Roles</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <q-btn color="green-7" text-color="white" label="Nuevo" icon-right="add" to="/roles/create" />
        
        <div class="q-mt-md">

          <q-markup-table flat bordered>
            <thead class="bg-green-2">
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rol, index) in roles" :key="index">
                <td class="text-left">{{ rol.id }}</td>
                <td class="text-left">{{ rol.nombre }}</td>
                <td class="text-left">{{ rol.descripcion }}</td>
                <td>
                  <q-btn round color="green-7" text-color="white" icon="mode_edit" class="q-ml-sm" :to="'/roles/edit/'+rol.id" title="Editar"></q-btn>
                  <q-btn round color="green-7" text-color="white" icon="delete" class="q-ml-sm" @click="onModal(rol.id!)" title="Eliminar"></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

      </q-card-section>
    </q-card>

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
          <q-btn color="green-7" label="Aceptar" @click="onEliminar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import RolService from "@/services/RolService";
import Rol from "@/entities/Rol";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'ListRol',
  data () {
    return {
      roles: [] as Rol[],
      alert: ref(false),
      idEliminar: 0,
    }
  },
  methods: {
    listar() {
      Loading.show({message: "Cargando..."});
      RolService.getAll()
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.roles = response.data.data;
            toast(response.data.message, {"type": "success"});
          }
          else{
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    },
    onModal(id: number){
      this.alert = true;
      this.idEliminar = id;
    },
    onEliminar(){ 
      Loading.show({message: "Cargando..."});
      RolService.delete(this.idEliminar)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.alert = false;
            this.idEliminar = 0;
            this.listar();
            toast(response.data.message, {"type": "success"});
          }
          else{
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
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
