<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Registro Nueva Mascota</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Nombre y Código -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.nombre" label="Nombre *" counter maxlength="50" required />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.codigo" label="Código *" counter maxlength="20" required />
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
            <q-select
              outlined
              v-model="mascota.especie"
              :options="especiesOptions"
              label="Especie *"
              emit-value
              map-options
              required
            />
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

        <!-- Foto -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-file outlined v-model="fotoFile" label="Foto" accept=".jpg,.jpeg,.png" clearable>
              <template v-slot:prepend>
                <q-icon name="photo_camera" />
              </template>
            </q-file>
          </div>
        </div>

        <!-- Combo Cliente -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-select
              outlined
              v-model="selectedClienteId"
              :options="clientesOptions"
              label="Cliente *"
              option-label="nombre"
              option-value="id"
              emit-value
              map-options
              required
            />
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
      fotoFile: null as File | null,
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

      if (!this.mascota.codigo || !this.mascota.nombre || !this.mascota.especie) {
        toast("Complete los campos obligatorios (*)", { type: "error" });
        return;
      }

      Loading.show({ message: "Cargando..." });

      const formData = new FormData();
      formData.append('codigo', this.mascota.codigo);
      formData.append('nombre', this.mascota.nombre);
      if (this.mascota.edad) formData.append('edad', this.mascota.edad.toString());
      if (this.mascota.peso) formData.append('peso', this.mascota.peso.toString());
      formData.append('especie', this.mascota.especie);
      if (this.mascota.raza) formData.append('raza', this.mascota.raza);
      if (this.mascota.sexo) formData.append('sexo', this.mascota.sexo);
      if (this.mascota.detalles) formData.append('detalles', this.mascota.detalles);
      formData.append('cliente_id', this.selectedClienteId.toString());

      // Enviar foto si existe
      if (this.fotoFile && this.fotoFile instanceof File) {
        formData.append('foto', this.fotoFile, this.fotoFile.name);
      }

      // Ver datos antes de enviar
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      MascotaService.create(formData)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.mascota = {} as Mascota;
            this.fotoFile = null;
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
