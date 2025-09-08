<template>
  <div class="hello">

    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Usuario</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row q-mt-md">
          <q-btn color="blue-7" text-white label="Generar PDF Profesional" @click="generarPDF()" />
        </div>

        <!-- Datos del usuario visibles -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-field outlined label="Nombres">
              <template v-slot:control>
                <div>{{ usuario.nombres || '-' }}</div>
              </template>
            </q-field>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-field outlined label="Apellido Paterno">
              <template v-slot:control>
                <div>{{ usuario.apellido_paterno || '-' }}</div>
              </template>
            </q-field>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-field outlined label="Apellido Materno">
              <template v-slot:control>
                <div>{{ usuario.apellido_materno || '-' }}</div>
              </template>
            </q-field>
          </div>
        </div>

        <!-- Más campos... -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UsuarioService from "@/services/UsuarioService";
import Usuario from "@/entities/Usuario";
import { Loading } from 'quasar';
import { jsPDF } from "jspdf";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineComponent({
  name: 'HelloWorld',
  data() {
    return {
      usuario: {} as Usuario
    }
  },
  methods: {
    getData() {
      Loading.show({ message: "Cargando..." });
      UsuarioService.get(this.$route.params.id)
        .then((response: any) => {
          if (response.data.status) {
            this.usuario = response.data.data;
          } else {
            toast(response.data.message, { type: "error" });
          }
          Loading.hide();
        })
        .catch((e: Error) => {
          Loading.hide();
          console.error(e);
          toast("Error al cargar el usuario", { type: "error" });
        });
    },
    generarPDF() {
      const doc = new jsPDF('p', 'mm', 'a4');

      // Fondo azul superior
      doc.setFillColor(0, 123, 255); 
      doc.rect(0, 0, 210, 30, 'F'); // ancho de A4: 210mm, alto 30mm
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text("Detalle del Usuario", 105, 20, { align: "center" });

      // Datos del usuario
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      let y = 40;

      const campos = [
        { label: "Nombres", value: this.usuario.nombres },
        { label: "Apellido Paterno", value: this.usuario.apellido_paterno },
        { label: "Apellido Materno", value: this.usuario.apellido_materno },
        { label: "Cédula de Identidad", value: this.usuario.cedula_identidad },
        { label: "Expedición", value: this.usuario.expedicion_ci },
        { label: "Fecha de Nacimiento", value: this.usuario.fecha_nacimiento },
        { label: "Sexo", value: this.usuario.sexo },
        { label: "Celular", value: this.usuario.celular },
        { label: "Estado", value: this.usuario.estado },
        { label: "Correo Electrónico", value: this.usuario.email },
        { label: "Rol", value: this.usuario.rol?.nombre },
      ];

      campos.forEach(campo => {
        doc.setFillColor(240, 240, 240); // gris claro
        doc.rect(20, y - 5, 170, 8, 'F'); // fondo de cada fila
        doc.text(`${campo.label}: ${campo.value || '-'}`, 25, y);
        y += 12;
      });

      // Pie de página
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Generado desde Sistema de Usuarios", 105, 290, { align: "center" });

      // Guardar PDF
      doc.save(`Usuario_${this.usuario.nombres || 'detalle'}.pdf`);
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
