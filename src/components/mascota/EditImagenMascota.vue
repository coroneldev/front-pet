<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Imagen Mascota</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="mascota.nombre" label="Nombre *" counter maxlength="100" disable />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-file
              outlined
              v-model="imagen"
              label="Imagen de la Mascota *"
              @update:model-value="onImageChange"
            >
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <p>Imagen Actual</p>
            <q-img
              v-if="urlImagenActual"
              :src="urlImagenActual"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <p>Imagen Nueva</p>
            <q-img
              v-if="imagenUrl"
              :src="imagenUrl"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="primary" label="Guardar" @click="onModal" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/mascotas" />
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
          <q-btn color="primary" label="Aceptar" @click="onGuardar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Loading } from 'quasar';
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import MascotaService from "@/services/MascotaService";
import Mascota from "@/entities/Mascota";
import http from "@/http-common";

export default defineComponent({
  name: 'EditarImagenMascota',
  data() {
    return {
      mascota: {} as Mascota,
      alert: false,
      urlImagenActual: '',
      imagen: null as File | null,
      imagenUrl: ''
    }
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    onImageChange() {
      if (this.imagen) {
        this.imagenUrl = URL.createObjectURL(this.imagen);
      }
    },
    getData() {
      Loading.show({ message: "Cargando..." });
      MascotaService.get(this.$route.params.id)
        .then((response: any) => {
          if (response.data.status) {
            this.mascota = response.data.data;
            this.obtenerImagen(this.mascota);
            toast(response.data.message, { type: "success" });
          } else {
            toast(response.data.message, { type: "error" });
          }
          Loading.hide();
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    },
    onGuardar() {
      Loading.show({ message: "Cargando..." });
      const formData = new FormData();
      if (this.imagen) {
        formData.append("imagen", this.imagen);
      }

      MascotaService.updateImagen(this.$route.params.id, formData)
        .then((response: any) => {
          if (response.data.status) {
            toast(response.data.message, { type: "success" });
            this.$router.push('/mascotas');
          } else {
            toast(response.data.message, { type: "error" });
          }
          Loading.hide();
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    },
    obtenerImagen(mascota: Mascota) {
      if (mascota.foto) {
        this.urlImagenActual = http.defaults.baseURL + '/storage/' + mascota.foto.replace('public/', '');
      } else {
        this.urlImagenActual = '';
      }
    }
  },
  mounted() {
    this.getData();
  }
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales si lo deseas */
</style>
