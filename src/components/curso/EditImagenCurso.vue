<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Imagen Curso</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input outlined v-model="curso.nombre" label="Nombre *" counter maxlength="100" disable />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-file outlined v-model="imagen" label="Imagen del Curso *" @update:model-value="onImageChange()">
              <template v-slot:prepend>
                <q-icon name="image" />
              </template>
            </q-file>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-6 q-pa-xs">
            <p>Imagen Actual</p>
            <!-- <q-img
              src="http://localhost:8000/storage/curso-imagen/sin-imagen.jpg"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            /> -->
            <q-img
              :src="urlImagenActual"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-xs">
            <p>Imagen Nuevo</p>
            <q-img
              :src="imagenUrl"
              spinner-color="white"
              style="height: 300px; max-width: 300px"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="primary" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/cursos" />
        </div>

      </q-card-section>
    </q-card>

    <q-dialog v-model="alert">
      <q-card style="width: 500px; max-width: 70vw;">
        <q-card-section>
          <div class="text-h6">Editar Registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Está seguro de editar el registro?
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
import Curso from "@/entities/Curso";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import http from "@/http-common";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    let imagen = ref(null);
    let imagenUrl = ref("");
    const onImageChange = () => {
      if (imagen.value) {
        imagenUrl.value = URL.createObjectURL(imagen.value);
      }
    }
    return {
      curso: {} as Curso,
      alert: ref(false),
      urlImagenActual: '',
      imagen,
      imagenUrl,
      onImageChange
    }
  },
  methods: {
    onModal() {
      this.alert = true;
    },
    getData() {
      Loading.show({message: "Cargando..."});
      CursoService.get(this.$route.params.id)
        .then((response: any) => {
          if(response.data.status == true) {
            this.curso = response.data.data;
            this.obtenerImagen(this.curso);
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
    onGuardar() {
      Loading.show({message: "Cargando..."});
      const formData = new FormData();
      if(this.imagen) {
        formData.append("imagen", this.imagen);
      }
      CursoService.updateImagen(this.$route.params.id, formData)
        .then((response: any) => {
          if(response.data.status == true) {
            this.curso = response.data.data;
            
            this.alert = false;
            this.curso = {} as Curso;

            this.imagen = null;
            this.imagenUrl = '';
            //this.getData();

            Loading.hide();
            toast(response.data.message, {"type": "success"});
            this.$router.push('/cursos');
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
    obtenerImagen(curso: Curso) {
      this.urlImagenActual = http.defaults.baseURL + '/storage/' + curso.imagen.replace('public/','');
    }
  },
  mounted() {
    this.getData();
  }
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
