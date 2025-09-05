<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Editar Curso</div>
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
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input outlined v-model="curso.nombre" label="Nombre *" counter maxlength="100" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input outlined type="textarea" v-model="curso.detalle" label="Detalle *" counter maxlength="500" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input outlined v-model="curso.fecha_inicio" label="Fecha Inicio *" counter maxlength="10" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="curso.fecha_inicio" mask="YYYY-MM-DD" :locale="myLocale">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                Formato: YYYY-MM-DD
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input outlined v-model="curso.fecha_limite" label="Fecha Límite Inscripción *" counter maxlength="10" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="curso.fecha_limite" mask="YYYY-MM-DD" :locale="myLocale">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                Formato: YYYY-MM-DD
              </template>
            </q-input>
            <!-- <q-input outlined v-model="curso.hora_inicio" mask="time" label="Hora Inicio *" counter maxlength="10">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="curso.hora_inicio">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                Formato: HH:MM
              </template>
            </q-input> -->
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input outlined v-model="curso.fecha_fin" label="Fecha Fin *" counter maxlength="10" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="curso.fecha_fin" mask="YYYY-MM-DD" :locale="myLocale">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                Formato: YYYY-MM-DD
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input outlined type="number" v-model="curso.costo" label="Costo *" counter maxlength="100" />
            <!-- <q-input outlined v-model="curso.hora_fin" mask="time" label="Hora Fin *" counter maxlength="10">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="curso.hora_fin">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                Formato: HH:MM
              </template>
            </q-input> -->
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input outlined v-model="curso.horario" label="Horario *" counter maxlength="100">
              <template v-slot:hint>
                Ej: Lunes a Viernes, Lunes - Miercoles - Viernes
              </template>
            </q-input>
          </div>
          <!-- <div class="col-12 col-md-3 q-pa-xs">
            <q-input outlined v-model="curso.fecha_limite" label="Fecha Límite Inscripción *" counter maxlength="10" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="curso.fecha_limite" mask="YYYY-MM-DD" :locale="myLocale">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                Formato: YYYY-MM-DD
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-input outlined type="number" v-model="curso.costo" label="Costo *" counter maxlength="100" />
          </div> -->
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-3 q-pa-xs">
            <q-select outlined v-model="curso.modalidad" label="Modalidad *" :options="optionsModalidad" option-label="label" option-value="value" emit-value map-options/>
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-select outlined v-model="curso.estado" label="Estado *" :options="optionsEstado" option-label="label" option-value="value" emit-value map-options/>
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-select outlined v-model="curso.user_id" label="Docente" 
              :options="optionsDocente" 
              :option-label="(item) => item.nombres+' '+item.apellido_paterno+' '+item.apellido_materno+' | '+item.cedula_identidad"  
              option-value="id" 
              emit-value map-options/>
          </div>
          <div class="col-12 col-md-3 q-pa-xs">
            <q-select outlined v-model="curso.area_id" label="Area *" :options="optionsArea" option-label="nombre" option-value="id" emit-value map-options/>
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
import UsuarioService from "@/services/UsuarioService";
import AreaService from "@/services/AreaService";
import Curso from "@/entities/Curso";
import Usuario from "@/entities/Usuario";
import Area from "@/entities/Area";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      curso: {} as Curso,
      optionsArea: [] as Area[],
      optionsDocente: [] as Usuario[],
      alert: ref(false),
      errores: {},
      optionsModalidad: [
        {
          label: 'PRESENCIAL',
          value: 'PRESENCIAL',
        },
        {
          label: 'VIRTUAL',
          value: 'VIRTUAL',
        }
      ],
      optionsEstado: [
        {
          label: 'ACTIVO',
          value: 'ACTIVO',
        },
        {
          label: 'INACTIVO',
          value: 'INACTIVO',
        }
      ],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      }
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
      let data = {
        nombre: this.curso.nombre,
        detalle: this.curso.detalle,
        horario: this.curso.horario,
        fecha_inicio: this.curso.fecha_inicio,
        fecha_fin: this.curso.fecha_fin,
        // hora_inicio: this.curso.hora_inicio,
        // hora_fin: this.curso.hora_fin,
        fecha_limite: this.curso.fecha_limite,
        costo: this.curso.costo,
        modalidad: this.curso.modalidad,
        estado: this.curso.estado,
        user_id: this.curso.user_id,
        area_id: this.curso.area_id,
      };

      CursoService.update(this.$route.params.id, data)
        .then((response: any) => {
          if(response.data.status == true) {
            this.curso = response.data.data;
            this.alert = false;
            //this.getData();
            Loading.hide();
            toast(response.data.message, {"type": "success"});
            this.$router.push('/cursos');
          }
          else{
            Loading.hide();
            this.errores = response.data.errors;
            toast(response.data.message, {"type": "error"});
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    listarArea() {
      AreaService.getAll()
        .then((response: any) => {
          if(response.data.status == true) {
            this.optionsArea = response.data.data;
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
    listarDocente() {
      UsuarioService.getAllDocente()
        .then((response: any) => {
          if(response.data.status == true) {
            this.optionsDocente = response.data.data;
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
    this.listarArea();
    this.listarDocente();
    this.getData();
  }
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
