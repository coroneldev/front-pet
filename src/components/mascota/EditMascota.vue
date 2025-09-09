<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Mascota</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.nombre" label="Nombre *" counter maxlength="50" />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.codigo" label="Código *" counter maxlength="20" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.edad" label="Edad" type="number" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="mascota.peso" label="Peso (kg)" type="number" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select
              outlined
              v-model="mascota.sexo"
              :options="['MACHO','HEMBRA']"
              label="Sexo"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.especie" label="Especie *" />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="mascota.raza" label="Raza" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="mascota.detalles" type="textarea" label="Detalles" />
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="green-7" text-color="white" label="Guardar" @click="onModal()" />
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
          ¿Está seguro de editar la mascota?
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
import Mascota from "@/entities/Mascota";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'EditMascota',
  data () {
    return {
      mascota: {} as Mascota,
      alert: ref(false),
    }
  },
  methods: {
    onModal(){
      this.alert = true;
    },
    getData() {
      Loading.show({message: "Cargando..."}); 
      MascotaService.get(this.$route.params.id)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.mascota = response.data.data;
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
    onGuardar() {
      Loading.show({message: "Cargando..."});
      const data = {
        codigo: this.mascota.codigo,
        nombre: this.mascota.nombre,
        edad: this.mascota.edad,
        peso: this.mascota.peso,
        especie: this.mascota.especie,
        raza: this.mascota.raza,
        sexo: this.mascota.sexo,
        detalles: this.mascota.detalles,
        cliente_id: this.mascota.cliente_id,
      };

      MascotaService.update(this.$route.params.id, data)
        .then((response: any) => {
          Loading.hide();
          if(response.data.status) {
            this.mascota = response.data.data;
            this.alert = false;
            toast(response.data.message, {"type": "success"});
            this.$router.push('/mascotas');
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
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
