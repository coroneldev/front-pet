<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Inscripciones</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <q-btn color="primary" label="Nuevo" icon-right="add" to="/inscripciones/create" />
        
        <div class="q-mt-md">

          <q-markup-table flat bordered>
            <thead class="bg-blue-2">
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Usuario</th>
                <th class="text-left">Curso</th>
                <th class="text-left">Nota</th>
                <th class="text-left">Fecha Inscripción</th>
                <th class="text-left">Estado</th>
                <th class="text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(inscripcion, index) in inscripciones" :key="index">
                <td class="text-left">{{ inscripcion.id }}</td>
                <td class="text-left">{{ inscripcion.user.nombres }} {{ inscripcion.user.apellido_paterno }} {{ inscripcion.user.apellido_materno }}</td>
                <td class="text-left">{{ inscripcion.curso.nombre }}</td>
                <td class="text-left">{{ inscripcion.nota }}</td>
                <td class="text-left">{{ inscripcion.fecha_inscripcion }}</td>
                <td class="text-left">{{ inscripcion.estado }}</td>
                <td>
                  <q-btn round color="white" text-color="black" icon="mode_edit" class="q-ml-sm" :to="'/inscripciones/edit/'+inscripcion.id" title="Editar"></q-btn>
                  <q-btn v-if="inscripcion.nota" round color="white" text-color="black" icon="contact_emergency" class="q-ml-sm" @click="onCertificado(inscripcion.id)" title="Certificado"></q-btn>
                  <q-btn round color="white" text-color="black" icon="delete" class="q-ml-sm" @click="onModal(inscripcion.id)" title="Eliminar"></q-btn>
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

      </q-card-section>
    </q-card>

    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Eliminar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de eliminar el registro?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="white" text-color="black" label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Aceptar" @click="onEliminar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import InscripcionService from "@/services/InscripcionService";
import Inscripcion from '@/entities/Inscripcion';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      inscripciones: [] as Inscripcion[],
      alert: ref(false),
      idEliminar: 0,
    }
  },
  methods: {
    listar() {
      Loading.show({message: "Cargando..."});
      InscripcionService.getAll()
        .then((response: any) => {
          if(response.data.status == true) {
            this.inscripciones = response.data.data;
            Loading.hide();
            toast(response.data.message, {"type": "success"});
          }
          else{
            Loading.hide();
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onModal(id: number){
      this.alert = true;
      this.idEliminar = id;
    },
    onEliminar(){ 
      Loading.show({message: "Cargando..."});
      InscripcionService.delete(this.idEliminar)
        .then((response: any) => {
          if(response.data.status == true) {
            this.alert = false;
            this.idEliminar = 0;
            this.listar();
            Loading.hide();
            toast(response.data.message, {"type": "success"});
          }
          else{
            Loading.hide();
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onCertificado(id: any) {
      Loading.show({message: "Cargando..."});
      InscripcionService.certificado(id)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'certificado-curso.pdf');
          document.body.appendChild(fileLink);
          fileLink.click();
          Loading.hide();
          toast("Certificado generado exitosamente", {"type": "success"});
        })
        .catch((err) => {
          Loading.hide();
          toast("Error en el servicio", {"type": "error"});
        });
    }
  },
  mounted() {
    this.listar();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
