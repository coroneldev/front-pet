<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Nuevo Cliente</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cliente.nombre" label="Nombre *" counter maxlength="100" />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cliente.email" label="Email *" type="email" counter maxlength="100" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cliente.documento" label="Documento *" counter maxlength="20" />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <q-input outlined v-model="cliente.telefono" label="Teléfono" counter maxlength="20" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 q-pa-xs">
            <q-input outlined v-model="cliente.direccion" label="Dirección" counter maxlength="150" />
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="green-7" text-color="white" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/clientes" />
        </div>

      </q-card-section>
    </q-card>

    <!-- Modal confirmación -->
    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Guardar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de guardar el registro?
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
import ClienteService from "@/services/ClienteService";
import Cliente from "@/entities/Cliente";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'CreateCliente',
  data() {
    return {
      cliente: {} as Cliente,
      alert: ref(false),
    }
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    onGuardar() {
      Loading.show({ message: "Cargando..." });
      let data = {
        nombre: this.cliente.nombre,
        email: this.cliente.email,
        documento: this.cliente.documento,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
      };

      ClienteService.create(data)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.cliente = {} as Cliente;
            this.alert = false;
            toast(response.data.message, { "type": "success" });
            this.$router.push('/clientes');
          }
          else {
            toast(response.data.message, { "type": "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    }
  },

});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
