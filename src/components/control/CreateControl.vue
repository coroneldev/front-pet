<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Registro de Nuevo Control</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Fecha de aplicación -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="control.fecha_aplicacion" label="Fecha de aplicación *" type="date" required />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="control.proxima_aplicacion" label="Próxima aplicación" type="date" />
          </div>
        </div>

        <!-- Observaciones -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="control.observaciones" type="textarea" label="Observaciones" />
          </div>
        </div>

        <!-- Combo Veterinario Responsable -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedUsuarioId" :options="usuariosOptions" label="Veterinario *"
              option-label="nombres" option-value="id" emit-value map-options required />
          </div>
        </div>

        <!-- Combo Cliente -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedClienteId" :options="clientesOptions" label="Cliente"
              option-label="nombre" option-value="id" emit-value map-options />
          </div>
        </div>

        <!-- Combo Mascota -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedMascotaId" :options="mascotasOptions" label="Mascota"
              option-label="nombre" option-value="id" emit-value map-options />
          </div>
        </div>

        <!-- Combo Vacuna -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedVacunaId" :options="vacunasOptions" label="Vacuna" option-label="nombre"
              option-value="id" emit-value map-options />
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
          <div class="text-h6">Guardar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de guardar este control?
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
import Usuario from "@/entities/Usuario";
import Cliente from "@/entities/Cliente";
import Mascota from "@/entities/Mascota";
import Vacuna from "@/entities/Vacuna";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'CreateControl',
  data() {
    return {
      control: {} as Control,
      alert: ref(false),

      usuariosOptions: [] as Usuario[],
      clientesOptions: [] as Cliente[],
      mascotasOptions: [] as Mascota[],
      vacunasOptions: [] as Vacuna[],

      selectedUsuarioId: null as number | null,
      selectedClienteId: null as number | null,
      selectedMascotaId: null as number | null,
      selectedVacunaId: null as number | null
    };
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    listarUsuarios() {
      UsuarioService.getAll()
        .then((response: any) => {
          if (response.data.status) {
            this.usuariosOptions = response.data.data;
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch(() => {
          toast("Error al cargar usuarios", { type: "error" });
        });
    },
    listarClientes() {
      ClienteService.getAll()
        .then((response: any) => {
          if (response.data.status) {
            this.clientesOptions = response.data.data;
          }
        });
    },
    listarMascotas() {
      MascotaService.getAll()
        .then((response: any) => {
          if (response.data.status) {
            this.mascotasOptions = response.data.data;
          }
        });
    },
    listarVacunas() {
      VacunaService.getAll()
        .then((response: any) => {
          if (response.data.status) {
            this.vacunasOptions = response.data.data;
          }
        });
    },
    onGuardar() {
      if (!this.selectedUsuarioId || !this.control.fecha_aplicacion) {
        toast("Usuario y fecha de aplicación son obligatorios.", { type: "error" });
        return;
      }

      Loading.show({ message: "Guardando control..." });

      const payload = {
        fecha_aplicacion: this.control.fecha_aplicacion,
        proxima_aplicacion: this.control.proxima_aplicacion,
        observaciones: this.control.observaciones,
        user_id: this.selectedUsuarioId,
        cliente_id: this.selectedClienteId,
        mascota_id: this.selectedMascotaId,
        vacuna_id: this.selectedVacunaId
      };

      ControlService.create(payload)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.control = {} as Control;
            this.selectedUsuarioId = null;
            this.selectedClienteId = null;
            this.selectedMascotaId = null;
            this.selectedVacunaId = null;
            this.alert = false;
            toast(response.data.message, { type: "success" });
            this.$router.push('/controles');
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch(() => {
          Loading.hide();
          toast("Error en el servidor.", { type: "error" });
        });
    }
  },
  mounted() {
    this.listarUsuarios();
    this.listarClientes();
    this.listarMascotas();
    this.listarVacunas();
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
