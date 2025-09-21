<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Registro Nueva Mascota</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Nombre -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.nombre" label="Nombre *" counter maxlength="50" required />
          </div>
        </div>

        <!-- Edad, Peso, Sexo -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.edad" label="Edad" type="number" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.peso" label="Peso (kg)" type="number" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select outlined v-model="mascota.sexo" :options="['MACHO', 'HEMBRA']" label="Sexo" />
          </div>
        </div>

        <!-- Especie y Raza -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-select outlined v-model="mascota.especie" :options="especiesOptions" label="Especie *" emit-value
              map-options required />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.raza" label="Raza" />
          </div>
        </div>

        <!-- Detalles -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="mascota.detalles" type="textarea" label="Detalles" />
          </div>
        </div>

        <!-- Combo Cliente -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-select outlined v-model="selectedClienteId" :options="clientesOptions" label="Cliente *"
              option-label="nombre" option-value="id" emit-value map-options required />
          </div>
        </div>

        <!-- Botones -->
        <div class="row q-mt-md">
          <q-btn color="green-7" text-color="white" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/mascotas" />
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
          ¿Está seguro de guardar la mascota?
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
import MascotaService from "@/services/MascotaService";
import ClienteService from "@/services/ClienteService";
import Mascota from "@/entities/Mascota";
import Cliente from "@/entities/Cliente";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'CreateMascota',
  data() {
    return {
      mascota: {} as Mascota,
      alert: ref(false),
      clientesOptions: [] as Cliente[],
      selectedClienteId: null as number | null,
      especiesOptions: [
        { label: 'GATO', value: 'GATO' },
        { label: 'PERRO', value: 'PERRO' },
        { label: 'OTROS', value: 'OTROS' }
      ]
    }
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    listarClientes() {
      Loading.show({ message: "Cargando clientes..." });
      ClienteService.getAll()
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.clientesOptions = response.data.data;
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
          toast("Error al cargar clientes", { type: "error" });
        });
    },
    onGuardar() {
      if (!this.selectedClienteId) {
        toast("Seleccione un cliente válido.", { type: "error" });
        return;
      }

      if (!this.mascota.nombre || !this.mascota.especie) {
        toast("Complete los campos obligatorios (*)", { type: "error" });
        return;
      }

      Loading.show({ message: "Guardando mascota..." });

      const payload = {
        nombre: this.mascota.nombre,
        edad: this.mascota.edad,
        peso: this.mascota.peso,
        especie: this.mascota.especie,
        raza: this.mascota.raza,
        sexo: this.mascota.sexo,
        detalles: this.mascota.detalles,
        cliente_id: this.selectedClienteId
      };

      MascotaService.create(payload)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.mascota = {} as Mascota;
            this.selectedClienteId = null;
            this.alert = false;
            toast(response.data.message, { type: "success" });
            this.$router.push('/mascotas');
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: any) => {
          console.log(e);
          Loading.hide();
          toast("Error en el servidor, revisa consola.", { type: "error" });
        });
    }
  },
  mounted() {
    this.listarClientes();
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
