<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Controles</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <q-btn color="green-7" text-color="white" label="Nuevo" icon-right="add" to="/controles/create" />

        <div class="q-mt-md">
          <q-markup-table flat bordered>
            <thead class="bg-green-2">
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Fecha Aplicación</th>
                <th class="text-left">Próxima Aplicación</th>
                <th class="text-left">Observaciones</th>
                <th class="text-left">Vacuna</th>
                <th class="text-left">Mascota</th>
                <th class="text-left">Cliente</th>
                <th class="text-left">Veterinario</th>
                <th class="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(control, index) in controles" :key="index">
                <td>{{ control.id }}</td>
                <td>{{ control.fecha_aplicacion }}</td>
                <td>{{ control.proxima_aplicacion ?? '-' }}</td>
                <td>{{ control.observaciones ?? '-' }}</td>
                <td>{{ control.vacuna ? control.vacuna.nombre : '-' }}</td>
                <td>{{ control.mascota ? control.mascota.nombre : '-' }}</td>
                <td>{{ control.cliente ? control.cliente.nombre : '-' }}</td>
                <td>{{ control.usuario ? control.usuario.nombres : '-' }}</td>
                <td class="text-center">
                  <q-btn round color="green-7" text-color="white" icon="mode_edit" class="q-ml-sm"
                    :to="'/controles/edit/' + control.id" title="Editar" />
                  <q-btn round color="green-7" text-color="white" icon="delete" class="q-ml-sm"
                    @click="onModal(control.id!)" title="Eliminar" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

      </q-card-section>
    </q-card>

    <!-- Modal de confirmación -->
    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Eliminar Control</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de eliminar este control?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="green-7" label="Aceptar" @click="onEliminar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import ControlService from "@/services/ControlService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from "quasar";

export default defineComponent({
  name: "ListControl",
  data() {
    return {
      controles: [] as any[],
      alert: ref(false),
      idEliminar: 0,
    };
  },
  methods: {
    listar() {
      Loading.show({ message: "Cargando..." });
      ControlService.getAll()
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.controles = response.data.data;
            toast(response.data.message, { type: "success" });
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    },
    onModal(id: number) {
      this.alert = true;
      this.idEliminar = id;
    },
    onEliminar() {
      Loading.show({ message: "Cargando..." });
      ControlService.delete(this.idEliminar)
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.alert = false;
            this.idEliminar = 0;
            this.listar();
            toast(response.data.message, { type: "success" });
          } else {
            toast(response.data.message, { type: "error" });
          }
        })
        .catch((e: Error) => {
          console.log(e);
          Loading.hide();
        });
    },
  },
  mounted() {
    this.listar();
  }
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
