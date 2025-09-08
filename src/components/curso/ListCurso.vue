<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Cursos</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <q-btn color="primary" label="Nuevo" icon-right="add" to="/cursos/create" />
        
        <div class="q-mt-md">

          <q-markup-table flat bordered>
            <thead class="bg-blue-2">
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Horario</th>
                <th class="text-left">Fecha Inicio</th>
                <th class="text-left">Fecha Fin</th>
                <th class="text-left">Costo</th>
                <th class="text-left">Modalidad</th>
                <th class="text-left">Estado</th>
                <th class="text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(curso, index) in cursos" :key="index">
                <td class="text-left">{{ curso.id }}</td>
                <td class="text-left">{{ curso.nombre }}</td>
                <td class="text-left">{{ curso.horario }}</td>
                <td class="text-left">{{ curso.fecha_inicio }}</td>
                <td class="text-left">{{ curso.fecha_fin }}</td>
                <td class="text-left">{{ curso.costo }}</td>
                <td class="text-left">{{ curso.modalidad }}</td>
                <td class="text-left">{{ curso.estado }}</td>
                <td>
                  <q-btn round color="white" text-color="black" icon="mode_edit" class="q-ml-sm" :to="'/cursos/edit/'+curso.id" title="Editar"></q-btn>
                  <q-btn round color="white" text-color="black" icon="image" class="q-ml-sm" :to="'/cursos/edit-imagen/'+curso.id" title="Editar Imagen"></q-btn>
                  <q-btn round color="white" text-color="black" icon="delete" class="q-ml-sm" @click="onModal(curso.id!)" title="Eliminar"></q-btn>
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
import CursoService from "@/services/CursoService";
import Curso from "@/entities/Curso";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      cursos: [] as Curso[],
      alert: ref(false),
      idEliminar: 0,
    }
  },
  methods: {
    listar() {
      Loading.show({message: "Cargando..."});
      CursoService.getAll()
        .then((response: any) => {
          if(response.data.status == true) {
            this.cursos = response.data.data;
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
      CursoService.delete(this.idEliminar)
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
