<template>
  <div class="q-pa-md">
    <div class="text-h5 text-center q-mb-lg">📊 COMVET Control de Vacunas</div>

    <!-- Resumen de vacunas -->
    <div class="row q-col-gutter-md q-mb-md">
      <q-card class="col-4 bg-green-2 text-center" flat bordered>
        <q-card-section>
          <div class="text-h6">Vacunas Aplicadas</div>
          <div class="text-h4 text-bold text-green-9">{{ totalVacunas }} %</div>
        </q-card-section>
      </q-card>

      <q-card class="col-4 bg-blue-2 text-center" flat bordered>
        <q-card-section>
          <div class="text-h6">Control de Vacunas</div>
          <div class="text-h4 text-bold text-blue-9">{{ totalMascotas }} %</div>
        </q-card-section>
      </q-card>

      <q-card class="col-4 bg-orange-2 text-center" flat bordered>
        <q-card-section>
          <div class="text-h6">Especies</div>
          <div class="text-h4 text-bold text-orange-9">3</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Control de vacunas por especie -->
    <div class="q-mt-lg">
      <div class="text-h6 q-mb-md">📈 SEGUIMIENTO POR TIPOS DE ESPECIE</div>

      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>🐱 GATOS</div>
            <div>{{ gatosControl }}%</div>
          </div>
          <q-linear-progress
            :value="gatosControl / 100"
            color="purple"
            size="15px"
            rounded
            stripe
            animated
          />
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>🐶 PERROS</div>
            <div>{{ perrosControl }}%</div>
          </div>
          <q-linear-progress
            :value="perrosControl / 100"
            color="blue"
            size="15px"
            rounded
            stripe
            animated
          />
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div>🐾 OTROS</div>
            <div>{{ otrosControl }}%</div>
          </div>
          <q-linear-progress
            :value="otrosControl / 100"
            color="orange"
            size="15px"
            rounded
            stripe
            animated
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DashboardVacunas",
  setup() {
    // Datos quemados de ejemplo
    const totalVacunas = ref(65);
    const totalMascotas = ref(30);

    const gatosControl = ref(75);  // %
    const perrosControl = ref(60); // %
    const otrosControl = ref(40);  // %

    return {
      totalVacunas,
      totalMascotas,
      gatosControl,
      perrosControl,
      otrosControl,
    };
  },
});
</script>

<style scoped>
.text-h5 {
  font-weight: bold;
}
</style>
