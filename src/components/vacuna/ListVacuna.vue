<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Vacunas</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">


        <div class="q-mt-md">
          <q-markup-table flat bordered>
            <thead class="bg-green-2">
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Dosis Requeridas</th>
                <th class="text-left">Intervalo (días)</th>
                <th class="text-left">Especie Destinada</th>
                <th class="text-left">Estado</th>
                <th class="text-left">Veterinario</th>
                <th class="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(vacuna, index) in vacunas" :key="index">
                <td>{{ vacuna.id }}</td>
                <td>{{ vacuna.nombre }}</td>
                <td>{{ vacuna.descripcion }}</td>
                <td>{{ vacuna.numero_dosis_requeridas }}</td>
                <td>{{ vacuna.intervalo_dosis }}</td>
                <td>{{ vacuna.especie_destinada }}</td>
                <td>
                  <q-badge :color="vacuna.estado ? 'green' : 'red'" :label="vacuna.estado ? 'Activo' : 'Inactivo'" />
                </td>
                <td>
                  {{ vacuna.veterinario ? vacuna.veterinario.nombres : '-' }}
                </td>
                <td class="text-center">

                  <q-btn round color="green-7" text-color="white" icon="delete" class="q-ml-sm"
                    @click="onModal(vacuna.id!)" title="Eliminar" />
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
          <div class="text-h6">Eliminar Vacuna</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de eliminar esta vacuna?
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
import VacunaService from "@/services/VacunaService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from "quasar";

export default defineComponent({
  name: "ListVacuna",
  data() {
    return {
      vacunas: [] as any[],
      alert: ref(false),
      idEliminar: 0,
    };
  },
  methods: {
    listar() {
      Loading.show({ message: "Cargando..." });
      VacunaService.getAll()
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.vacunas = response.data.data;
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
      VacunaService.delete(this.idEliminar)
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
  },
});
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  padding: 16px;
}
</style>
