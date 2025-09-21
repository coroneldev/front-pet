<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Cita</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Fecha y Hora -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="cita.fecha" label="Fecha *" type="date" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="cita.hora_inicio" label="Hora Inicio *" type="time" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="cita.hora_fin" label="Hora Fin *" type="time" />
          </div>
        </div>

        <!-- Motivo y Observación -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cita.motivo" type="textarea" label="Motivo *" />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cita.observacion" type="textarea" label="Observación" />
          </div>
        </div>

        <!-- Combo Cliente -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="cita.cliente_id" :options="clientesOptions" label="Cliente *"
              option-label="nombre" option-value="id" emit-value map-options />
          </div>
        </div>

        <!-- Combo Mascota -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="cita.mascota_id" :options="mascotasOptions" label="Mascota *"
              option-label="nombre" option-value="id" emit-value map-options />
          </div>
        </div>

        <!-- Combo Usuario Responsable -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="cita.user_id" :options="usuariosOptions" label="Veterinario Responsable *"
              option-label="nombre" option-value="id" emit-value map-options />
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
          <div class="text-h6">Editar Cita</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de editar esta cita?
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'EditCita',
  data() {
    return {
      cita: {} as Cita,
      alert: ref(false),
      usuariosOptions: [] as any[],
      clientesOptions: [] as any[],
      mascotasOptions: [] as any[]
    };
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    getData() {
      Loading.show({ message: "Cargando..." });
      CitaService.get(this.$route.params.id)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.cita = response.data.data;
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch(() => {
          Loading.hide();
          toast("Error al cargar la cita", { type: "error" });
        });
    },
    listarOpciones() {
      UsuarioService.getAll()
        .then((res: any) => this.usuariosOptions = res.data.data)
        .catch(() => toast("Error cargando usuarios", { type: "error" }));

      ClienteService.getAll()
        .then((res: any) => this.clientesOptions = res.data.data)
        .catch(() => toast("Error cargando clientes", { type: "error" }));

      MascotaService.getAll()
        .then((res: any) => this.mascotasOptions = res.data.data)
        .catch(() => toast("Error cargando mascotas", { type: "error" }));
    },
    onGuardar() {
      if (!this.cita.fecha || !this.cita.hora_inicio || !this.cita.hora_fin || !this.cita.motivo
        || !this.cita.cliente_id || !this.cita.mascota_id || !this.cita.user_id) {
        toast("Todos los campos obligatorios deben completarse.", { type: "error" });
        return;
      }

      Loading.show({ message: "Guardando..." });
      const payload = {
        fecha: this.cita.fecha,
        hora_inicio: this.cita.hora_inicio,
        hora_fin: this.cita.hora_fin,
        motivo: this.cita.motivo,
        observacion: this.cita.observacion,
        cliente_id: this.cita.cliente_id,
        mascota_id: this.cita.mascota_id,
        user_id: this.cita.user_id
      };

      CitaService.update(this.$route.params.id, payload)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
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
