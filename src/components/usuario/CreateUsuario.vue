<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Nuevo Usuario</div>
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
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.nombres" label="Nombres *" counter maxlength="100" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.apellido_paterno" label="Apellido Paterno" counter maxlength="100" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.apellido_materno" label="Apellido Materno" counter maxlength="100" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.cedula_identidad" label="Cédula de Identidad *" counter maxlength="20" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select outlined v-model="usuario.expedicion_ci" label="Expedición *" :options="optionsExpedicion" option-label="label" option-value="value" emit-value map-options />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.fecha_nacimiento" label="Fecha de Nacimiento *" counter maxlength="10" >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="usuario.fecha_nacimiento" minimal mask="YYYY-MM-DD" :locale="myLocale">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>
                YYYY-MM-DD
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select outlined v-model="usuario.sexo" label="Sexo *" :options="optionsSexo" option-label="label" option-value="value" emit-value map-options />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.celular" label="Celular *" counter maxlength="20" >
              <template v-slot:hint>
                Preferentemente con Whatsaap
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select outlined v-model="usuario.estado" label="Estado *" :options="optionsEstado" option-label="label" option-value="value" emit-value map-options/>
          </div>
        </div>
        
        <br>
        <br>
        <q-separator color="grey-5" inset />
        
        <div class="row q-mt-md">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.email" label="Correo Electrónico *" counter maxlength="50" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-input outlined v-model="usuario.password" label="Contraseña *" type="password" counter maxlength="50" />
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-select outlined v-model="usuario.rol_id" label="Rol *" :options="optionsRol" option-label="nombre" option-value="id" emit-value map-options/>
          </div>
        </div>

        <div class="row q-mt-md">
          <q-btn color="primary" label="Guardar" @click="onModal()" />
          <q-btn color="white" text-color="black" label="Cancelar" class="q-ml-sm" to="/usuarios" />
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
import UsuarioService from "@/services/UsuarioService";
import RolService from "@/services/RolService";
import Usuario from "@/entities/Usuario";
import Rol from "@/entities/Rol";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      usuario: {} as Usuario,
      optionsRol: [] as Rol[],
      alert: ref(false),
      errores: {},
      optionsExpedicion: [
        {
          label: 'LA PAZ',
          value: 'LP',
        },
        {
          label: 'ORURO',
          value: 'OR',
        },
        {
          label: 'POTOSÍ',
          value: 'PT',
        },
        {
          label: 'COCHABAMBA',
          value: 'CB',
        },
        {
          label: 'SANTA CRUZ',
          value: 'SC',
        },
        {
          label: 'BENI',
          value: 'BN',
        },
        {
          label: 'PANDO',
          value: 'PA',
        },
        {
          label: 'TARIJA',
          value: 'TJ',
        },
        {
          label: 'CHUQUISACA',
          value: 'CH',
        }
      ],
      optionsSexo: [
        {
          label: 'MASCULINO',
          value: 'MASCULINO',
        },
        {
          label: 'FEMENINO',
          value: 'FEMENINO',
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
    onGuardar() {
      Loading.show({message: "Cargando..."});
      let data = {
        nombres: this.usuario.nombres,
        apellido_paterno: this.usuario.apellido_paterno,
        apellido_materno: this.usuario.apellido_materno,
        cedula_identidad: this.usuario.cedula_identidad,
        expedicion_ci: this.usuario.expedicion_ci,
        fecha_nacimiento: this.usuario.fecha_nacimiento,
        sexo: this.usuario.sexo,
        celular: this.usuario.celular,
        email: this.usuario.email,
        password: this.usuario.password,
        estado: this.usuario.estado,
        rol_id: this.usuario.rol_id,
      };

      UsuarioService.create(data)
        .then((response: any) => {
          if(response.data.status == true) {
            this.usuario = response.data.data;
            this.alert = false;
            this.usuario = {} as Usuario;
            Loading.hide();
            toast(response.data.message, {"type": "success"});
            this.$router.push('/usuarios');
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
    listarRol() {
      RolService.getAll()
        .then((response: any) => {
          if(response.data.status == true) {
            this.optionsRol = response.data.data;
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
    this.listarRol();
  }
  
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
