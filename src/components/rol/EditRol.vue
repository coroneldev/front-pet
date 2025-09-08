<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Rol</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="rol.nombre" label="Nombre *" counter maxlength="50" />
          </div>
          <div class="col-12 col-md-8 q-pa-xs">
            <q-input outlined v-model="rol.descripcion" label="Descripción" counter maxlength="100" />
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="green-7" text-color="white" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/roles" />
        </div>

      </q-card-section>
    </q-card>

    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Editar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de editar el registro?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="green-7" text-color="white" label="Aceptar" @click="onGuardar()" />
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
  name: 'EditRol',
  data () {
    return {
      rol: {} as Rol,
      alert: ref(false),
    }
  },
  methods: {
    onModal(){
      this.alert = true;
    },
    getData() {
      Loading.show({message: "Cargando..."});
      RolService.get(this.$route.params.id)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.rol = response.data.data;
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
    onGuardar() {
      Loading.show({message: "Cargando..."});
      let data = {
        nombre: this.rol.nombre,
        descripcion: this.rol.descripcion,
      };

      RolService.update(this.$route.params.id, data)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.rol = response.data.data;
            this.alert = false;
            toast(response.data.message, {"type": "success"});
            this.$router.push('/roles');
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
    this.getData();
  }
  
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
