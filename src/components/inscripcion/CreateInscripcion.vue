<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Crear Inscripción</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <div>
              <div v-for="(errorArray, index) in errores" :key="index">
                  <ul>
                    <li v-for="(error, index) in errorArray" :key="index">
                      <span class="text-red">{{ error }}</span>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            
            <div class="row q-mt-md">
              <div class="col-12 col-md-8 q-pa-xs">
                <q-input outlined v-model="ciEstudiante" label="C.I. del Estudiante *" />
              </div>
              <div class="col-12 col-md-4 q-pa-xs">
                <q-btn color="secondary" label="Buscar" @click="onBuscarCi()" />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 col-md-12 q-pa-xs">
                <q-input outlined v-model="nombreEstudiante" label="Nombre del Estudiante *" readonly />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 col-md-12 q-pa-xs text-center">
                <q-icon name="arrow_downward" color="primary" size="4em"/>
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 col-md-12 q-pa-xs">
                <q-select outlined v-model="inscripcion.curso_id" 
                  label="Curso *" 
                  :options="optionsCurso" 
                  option-label="nombre" 
                  option-value="id" 
                  emit-value map-options/>
                </div>
            </div>
          </div>

          <div class="col-12 col-md-2 q-pa-xs text-center">
            <!-- <q-icon name="arrow_forward" color="primary" size="4em"/> -->
          </div>

          <div class="col-12 col-md-4 q-pa-xs">
            <p class="text-red">La nota debe de llenarse cuando el curso haya finalizado</p>
            <div class="row q-mt-md">
              <div class="col-12 col-md-12 q-pa-xs">
                <q-input outlined type="number" v-model="inscripcion.nota" label="Nota" />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 col-md-12 q-pa-xs">
                <!-- <q-input outlined v-model="inscripcion.nota_literal" label="Nota Literal" counter maxlength="100" /> -->
              </div>
            </div>
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="primary" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/inscripciones" />
        </div>

      </q-card-section>
    </q-card>

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
          <q-btn color="primary" label="Aceptar" @click="onGuardar()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import CursoService from "@/services/CursoService";
import UsuarioService from "@/services/UsuarioService";
import InscripcionService from "@/services/InscripcionService";
import Curso from "@/entities/Curso";
import Usuario from "@/entities/Usuario";
import Inscripcion from "@/entities/Inscripcion";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      inscripcion: {} as Inscripcion,
      optionsCurso: [] as Curso[],
      alert: ref(false),
      errores: {},

      ciEstudiante: '',
      nombreEstudiante: '',
      estudiante: {} as Usuario,
    }
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    onGuardar() {
      Loading.show({message: "Cargando..."});
      let data = {
        user_id: this.estudiante.id,
        curso_id: this.inscripcion.curso_id,
        nota: this.inscripcion.nota
      };

      InscripcionService.create(data)
        .then((response: any) => {
          if(response.data.status == true) {
            this.inscripcion = response.data.data;
            this.alert = false;
            
            this.ciEstudiante = '';
            this.nombreEstudiante = '';
            this.inscripcion = {} as Inscripcion;
            Loading.hide();
            toast(response.data.message, {"type": "success"});
            this.$router.push('/inscripciones');
          }
          else {
            Loading.hide();
            this.errores = response.data.errors;
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    listarCurso() {
      CursoService.getAll()
        .then((response: any) => {
          if(response.data.status == true) {
            this.optionsCurso = response.data.data;
            //toast(response.data.message, {"type": "success"})
          }
          else{
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    onBuscarCi() {
      UsuarioService.getBuscarCi(this.ciEstudiante)
        .then((response: any) => {
          if(response.data.status == true) {
            this.estudiante = response.data.data;
            this.nombreEstudiante = this.estudiante.nombres + ' ' + this.estudiante.apellido_paterno + ' ' + this.estudiante.apellido_materno; 
            //toast(response.data.message, {"type": "success"})
          }
          else{
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.listarCurso();
  }
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
