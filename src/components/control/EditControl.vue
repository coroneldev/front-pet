<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Control de Vacuna</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Fecha de aplicación -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="control.fecha_aplicacion" label="Fecha de Aplicación *" type="date" />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="control.proxima_aplicacion" label="Próxima Aplicación" type="date" />
          </div>
        </div>

        <!-- Usuario Responsable (Veterinario/Admin) -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select
              outlined
              v-model="control.user_id"
              :options="usuariosOptions"
              option-label="nombres"
              option-value="id"
              label="Usuario Responsable *"
              emit-value
              map-options
            />
          </div>
          <!-- Cliente -->
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select
              outlined
              v-model="control.cliente_id"
              :options="clientesOptions"
              option-label="nombre"
              option-value="id"
              label="Cliente *"
              emit-value
              map-options
            />
          </div>
        </div>

        <!-- Mascota y Vacuna -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select
              outlined
              v-model="control.mascota_id"
              :options="mascotasOptions"
              option-label="nombre"
              option-value="id"
              label="Mascota *"
              emit-value
              map-options
            />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select
              outlined
              v-model="control.vacuna_id"
              :options="vacunasOptions"
              option-label="nombre"
              option-value="id"
              label="Vacuna *"
              emit-value
              map-options
            />
          </div>
        </div>

        <!-- Observaciones -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="control.observaciones" type="textarea" label="Observaciones" />
          </div>
        </div>

        <!-- Botones -->
        <div class="row q-mt-md">
          <q-btn color="green-7" text-color="white" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/controles" />
        </div>

      </q-card-section>
    </q-card>

    <!-- Dialog Confirmación -->
    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Editar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de editar este control de vacuna?
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
import ControlService from "@/services/ControlService";
import UsuarioService from "@/services/UsuarioService";
import ClienteService from "@/services/ClienteService";
import MascotaService from "@/services/MascotaService";
import VacunaService from "@/services/VacunaService";
import Control from "@/entities/Control";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'EditControl',
  data () {
    return {
      control: {} as Control,
      alert: ref(false),
      usuariosOptions: [] as any[],
      clientesOptions: [] as any[],
      mascotasOptions: [] as any[],
      vacunasOptions: [] as any[]
    }
  },
  methods: {
    onModal(){
      this.alert = true;
    },
    getData() {
      Loading.show({message: "Cargando..."}); 
      ControlService.get(this.$route.params.id)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.control = response.data.data;
            toast(response.data.message, {"type": "success"});
          } else {
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    },
    listarOpciones() {
      // Usuarios (Veterinario/Admin)
      UsuarioService.getAll()
        .then((res: any) => this.usuariosOptions = res.data.data)
        .catch(() => toast("Error cargando usuarios", {type:"error"}));

      // Clientes
      ClienteService.getAll()
        .then((res: any) => this.clientesOptions = res.data.data)
        .catch(() => toast("Error cargando clientes", {type:"error"}));

      // Mascotas
      MascotaService.getAll()
        .then((res: any) => this.mascotasOptions = res.data.data)
        .catch(() => toast("Error cargando mascotas", {type:"error"}));

      // Vacunas
      VacunaService.getAll()
        .then((res: any) => this.vacunasOptions = res.data.data)
        .catch(() => toast("Error cargando vacunas", {type:"error"}));
    },
    onGuardar() {
      Loading.show({message: "Guardando..."});
      const data = {
        fecha_aplicacion: this.control.fecha_aplicacion,
        proxima_aplicacion: this.control.proxima_aplicacion,
        observaciones: this.control.observaciones,
        user_id: this.control.user_id,
        cliente_id: this.control.cliente_id,
        mascota_id: this.control.mascota_id,
        vacuna_id: this.control.vacuna_id
      };

      ControlService.update(this.$route.params.id, data)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.control = response.data.data;
            this.alert = false;
            toast(response.data.message, {"type": "success"});
            this.$router.push('/controles');
          } else {
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
    this.listarOpciones();
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
