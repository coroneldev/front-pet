<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Citas</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row items-center justify-between q-mb-md">
          <q-btn color="green-7" text-color="white" label="Nuevo" icon-right="add" to="/citas/create" />

          <!-- 🔎 Buscador -->
          <q-input outlined dense v-model="searchCodigo" placeholder="Buscar por código..." clearable class="q-ml-md">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="q-mt-md">
          <q-markup-table flat bordered>
            <thead class="bg-green-2">
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Código</th>
                <th class="text-left">Fecha</th>
                <th class="text-left">Hora</th>
                <th class="text-left">Motivo</th>
                <th class="text-left">Cliente</th>
                <th class="text-left">Mascota</th>
                <th class="text-left">Estado</th>
                <th class="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cita, index) in filteredCitas" :key="index">
                <td>{{ cita.id }}</td>
                <td>{{ cita.mascota ? cita.mascota.codigo : '-' }}</td>
                <td>{{ cita.fecha }}</td>
                <td>{{ cita.hora_inicio }}</td>
                <td>{{ cita.motivo }}</td>
                <td>{{ cita.cliente ? cita.cliente.nombre : '-' }}</td>
                <td>{{ cita.mascota ? cita.mascota.nombre : '-' }}</td>
                <td>
                  <q-chip
                    :color="estadoColor(cita.estado)"
                    text-color="white"
                    outline
                    rounded
                    dense
                  >
                    {{ cita.estado }}
                  </q-chip>
                </td>
                <td class="text-center">
                  <q-btn round color="green-7" text-color="white" icon="mode_edit" class="q-ml-sm"
                    :to="'/citas/edit/' + cita.id" title="Editar" />
                  <q-btn round color="green-7" text-color="white" icon="delete" class="q-ml-sm"
                    @click="onModal(cita.id!)" title="Eliminar" />
                </td>
              </tr>
              <tr v-if="filteredCitas.length === 0">
                <td colspan="9" class="text-center text-grey">
                  No se encontraron resultados
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
          <div class="text-h6">Eliminar Cita</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de eliminar esta cita?
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
import { ref, defineComponent, computed } from "vue";
import CitaService from "@/services/CitaService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from "quasar";

export default defineComponent({
  name: "ListCita",
  data() {
    return {
      citas: [] as any[],
      alert: ref(false),
      idEliminar: 0,
      searchCodigo: "", // 🔎 valor del buscador
    };
  },
  computed: {
    filteredCitas(): any[] {
      if (!this.searchCodigo) return this.citas;
      return this.citas.filter((cita: any) =>
        cita.mascota?.codigo?.toLowerCase().includes(this.searchCodigo.toLowerCase())
      );
    },
  },
  methods: {
    listar() {
      Loading.show({ message: "Cargando..." });
      CitaService.getAll()
        .then((response: any) => {
          Loading.hide();
          if (response.data.status) {
            this.citas = response.data.data;
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
    estadoColor(estado: string) {
      switch (estado) {
        case "PENDIENTE":
          return "yellow";
        case "CONFIRMADA":
          return "blue";
        case "REALIZADA":
          return "green";
        case "CANCELADA":
          return "red";
        default:
          return "grey";
      }
    },
    onModal(id: number) {
      this.alert = true;
      this.idEliminar = id;
    },
    onEliminar() {
      Loading.show({ message: "Cargando..." });
      CitaService.delete(this.idEliminar)
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
