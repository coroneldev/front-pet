<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Registro de Nueva Cita</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Fecha y Hora -->
        <div class="row q-mt-md">
          
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="cita.fecha" label="Fecha *" type="date" required />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="cita.hora_inicio" label="Hora Inicio *" type="time" required />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="cita.hora_fin" label="Hora Fin *" type="time" required />
          </div>

        </div>

        <!-- Motivo y Observación -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cita.motivo" type="textarea" label="Motivo *" required />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cita.observacion" type="textarea" label="Observación" />
          </div>
        </div>

        <!-- Combo Cliente -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedClienteId" :options="clientesOptions" label="Cliente *"
              option-label="nombre" option-value="id" emit-value map-options required />
          </div>
        </div>

        <!-- Combo Mascota -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedMascotaId" :options="mascotasOptions" label="Mascota *"
              option-label="nombre" option-value="id" emit-value map-options required />
          </div>
        </div>

        <!-- Combo Usuario Responsable -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="selectedUsuarioId" :options="usuariosOptions" label="Veterinario Responsable *"
              option-label="nombre" option-value="id" emit-value map-options required />
          </div>
        </div>

        <!-- Botones -->
        <div class="row q-mt-md">
          <q-btn color="green-7" text-color="white" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/citas" />
        </div>

      </q-card-section>
    </q-card>

    <!-- Dialog Confirmación -->
    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Guardar Cita</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de guardar esta cita?
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
import CitaService from "@/services/CitaService";
import UsuarioService from "@/services/UsuarioService";
import ClienteService from "@/services/ClienteService";
import MascotaService from "@/services/MascotaService";

import Cita from "@/entities/Cita";
import Usuario from "@/entities/Usuario";
import Cliente from "@/entities/Cliente";
import Mascota from "@/entities/Mascota";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'CreateCita',
  data() {
    return {
      cita: {} as Cita,
      alert: ref(false),

      usuariosOptions: [] as Usuario[],
      clientesOptions: [] as Cliente[],
      mascotasOptions: [] as Mascota[],

      selectedUsuarioId: null as number | null,
      selectedClienteId: null as number | null,
      selectedMascotaId: null as number | null
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
    onGuardar() {
      if (!this.selectedUsuarioId || !this.selectedClienteId || !this.selectedMascotaId
          || !this.cita.fecha || !this.cita.hora_inicio || !this.cita.hora_fin || !this.cita.motivo) {
        toast("Todos los campos obligatorios deben completarse.", { type: "error" });
        return;
      }

      Loading.show({ message: "Guardando cita..." });

      const payload = {
        fecha: this.cita.fecha,
        hora_inicio: this.cita.hora_inicio,
        hora_fin: this.cita.hora_fin,
        motivo: this.cita.motivo,
        observacion: this.cita.observacion,
        user_id: this.selectedUsuarioId,
        cliente_id: this.selectedClienteId,
        mascota_id: this.selectedMascotaId
      };

      CitaService.create(payload)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.cita = {} as Cita;
            this.selectedUsuarioId = null;
            this.selectedClienteId = null;
            this.selectedMascotaId = null;
            this.alert = false;
            toast(response.data.message, { type: "success" });
            this.$router.push('/citas');
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
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
