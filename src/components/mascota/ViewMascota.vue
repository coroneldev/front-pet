<template>
  <div class="hello">
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Ver Mascota</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">
        <!-- Nombre y Código -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.nombre" label="Nombre" readonly />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.codigo" label="Código" readonly />
          </div>
        </div>

        <!-- Edad, Peso, Sexo -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.edad" label="Edad" readonly />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.peso" label="Peso (kg)" readonly />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.sexo" label="Sexo" readonly />
          </div>
        </div>

        <!-- Especie y Raza -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.especie" label="Especie" readonly />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.raza" label="Raza" readonly />
          </div>
        </div>

        <!-- Detalles -->
        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="mascota.detalles" label="Detalles" type="textarea" readonly />
          </div>
        </div>

        <!-- Foto -->
        <div class="row q-mt-md justify-center">
          <div class="col-12 col-md-6 q-pa-xs text-center" v-if="fotoUrl">
            <q-img :src="fotoUrl" spinner-color="green" style="max-height: 300px;" />
          </div>
          <div v-else class="col-12 q-pa-xs text-center">
            <span>No hay foto disponible</span>
          </div>
        </div>

        <!-- Botón Volver -->
        <div class="row q-mt-md">
          <q-btn color="white" text-color="black" label="Volver" class="q-ml-sm" to="/mascotas" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MascotaService from "@/services/MascotaService";
import { Loading } from 'quasar';
import { toast } from "vue3-toastify";

export default defineComponent({
  name: 'ViewMascota',
  data() {
    return {
      mascota: {} as any,
      fotoUrl: '' as string,
    };
  },
  methods: {
    getData() {
      Loading.show({ message: "Cargando mascota..." });
      MascotaService.get(this.$route.params.id)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.mascota = response.data.data;
            console.log("Datos de la mascota:", this.mascota);

            // Construir URL codificando cada segmento de la ruta
            if (this.mascota.foto) {
              const baseUrl = "http://localhost:8000/storage/";
              this.fotoUrl = baseUrl + this.mascota.foto
                .split('/')
                .map(encodeURIComponent)
                .join('/');
              console.log("URL de la foto:", this.fotoUrl);
            }
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
          toast("Error al cargar mascota", { type: "error" });
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
