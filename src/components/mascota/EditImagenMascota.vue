<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Imagen de Mascota</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <!-- Nombre de la mascota -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input outlined v-model="mascota.nombre" label="Nombre *" counter maxlength="100" disable />
          </div>
        </div>

        <!-- Subir nueva imagen -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-file outlined v-model="foto" label="Foto de la Mascota *" @update:model-value="onImageChange()">
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
          </div>
        </div>

        <!-- Imagen actual vs nueva -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <p>Imagen Actual</p>
            <q-img
              :src="urlImagenActual"
              error-src="/img/sin-imagen.jpg"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <p>Imagen Nueva</p>
            <q-img
              :src="fotoUrl"
              error-src="/img/sin-imagen.jpg"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            />
          </div>
        </div>

        <!-- Botones -->
        <div class="row q-mt-md">
          <q-btn color="primary" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/mascotas" />
        </div>

      </q-card-section>
    </q-card>

    <!-- Modal de confirmación -->
    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Editar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de editar la imagen de esta mascota?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Aceptar" @click="onGuardar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import MascotaService from "@/services/MascotaService";
import Mascota from "@/entities/Mascota";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import http from "@/http-common";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'EditarImagenMascota',
  data() {
    let foto = ref<File | null>(null);
    let fotoUrl = ref("");
    const onImageChange = () => {
      if (foto.value) {
        fotoUrl.value = URL.createObjectURL(foto.value);
      }
    };
    return {
      mascota: {} as Mascota,
      alert: ref(false),
      urlImagenActual: '',
      foto,
      fotoUrl,
      onImageChange
    };
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    getData() {
      Loading.show({ message: "Cargando..." });
      MascotaService.get(this.$route.params.id)
        .then((response: any) => {
          if (response.data.status == true) {
            this.mascota = response.data.data;
            this.obtenerImagen(this.mascota);
            Loading.hide();
          } else {
            Loading.hide();
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onGuardar() {
      Loading.show({ message: "Guardando..." });
      const formData = new FormData();
      if (this.foto) {
        formData.append("foto", this.foto);
      }
      MascotaService.updateImagen(this.$route.params.id, formData)
        .then((response: any) => {
          if (response.data.status == true) {
            this.mascota = response.data.data;

            this.alert = false;
            this.foto = null;
            this.fotoUrl = '';

            Loading.hide();
            toast(response.data.message, { type: "success" });
            this.$router.push('/mascotas');
          } else {
            Loading.hide();
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    obtenerImagen(mascota: Mascota) {
      if (mascota.foto) {
        this.urlImagenActual = http.defaults.baseURL + '/storage/' + mascota.foto;
      } else {
        this.urlImagenActual = '/img/sin-imagen.jpg';
      }
    }
  },
  mounted() {
    this.getData();
  }
});
</script>
