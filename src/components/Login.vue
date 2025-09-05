<template>
  <div class="login-page flex flex-center">
    <q-card bordered class="q-mx-auto q-mt-xl shadow-10 login-card">
      <!-- Encabezado -->
      <q-card-section class="login-header">
        <div class="text-h5 text-weight-bold text-white text-center">
          <q-icon name="pets" size="40px" class="q-mb-sm" />
          <div><span class="text-warning"> INICIAR SESIÓN </span></div>
          <div>Veterinaria RC</div>
        </div>
      </q-card-section>

      <!-- Contenido -->
      <q-card-section class="bg-grey-1">
        <div class="row justify-center">
          <div class="col-auto q-pa-xs text-center">
            <q-img 
              src="@/assets/logo-artec.png" 
              class="rounded-borders shadow-5 bg-white" 
              style="height: 100px; max-width: 100px;" 
            />
          </div>
        </div>

        <!-- Correo -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input 
              outlined 
              v-model="email" 
              label="Correo Electrónico"
              color="green-7"
              class="rounded-input"
            >
              <template v-slot:prepend>
                <q-icon name="alternate_email" color="green-7" />
              </template>
            </q-input>
          </div>
        </div>

        <!-- Contraseña -->
        <div class="row q-mt-sm">
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input 
              outlined 
              v-model="password" 
              label="Contraseña" 
              type="password"
              color="green-7"
              class="rounded-input"
            >
              <template v-slot:prepend>
                <q-icon name="key" color="green-7" />
              </template>
            </q-input>
          </div>
        </div>

        <!-- Botón -->
        <div class="row q-mt-md">
          <div class="col-12 col-md-12 q-pa-xs text-center">
            <q-btn 
              color="green-7" 
              label="Ingresar" 
              size="18px" 
              unelevated 
              rounded 
              class="shadow-4"
              @click="onIngresar()" 
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { toast } from "vue3-toastify";
import store from '../store';
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    onIngresar(){ 
      Loading.show({message: "Cargando..."});
      store.dispatch("retrieveToken", { email: this.email, password: this.password })
        .then((response: any) => {
          this.$router.push({ path: '/inicio' }).catch(()=>{});
          toast(response.data.message, {"type": "success"});
          Loading.hide();
        })
        .catch((error: any) => {
          toast(error.response.data.message, {"type": "error"});
          Loading.hide();
        });
    }
  }
});
</script>

<style scoped>
/* Fondo general */
.login-page {
  height: 100vh;
  background: linear-gradient(135deg, #a8e6cf, #dcedc1);
}

/* Card de login */
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 20px;
  overflow: hidden;
}

/* Encabezado */
.login-header {
  background: linear-gradient(135deg, #43a047, #2e7d32);
  padding: 30px 20px;
  border-bottom-left-radius: 40% 15%;
  border-bottom-right-radius: 40% 15%;
}

/* Inputs con borde redondeado */
.rounded-input {
  border-radius: 12px;
}
</style>
