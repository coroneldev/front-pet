<template>
  <div class="hello">
    
    <q-card flat bordered>
      <q-card-section class="bg-grey-2 my-card">
        <div class="text-h5 text-center">Inicio</div>
      </q-card-section>

      <q-separator color="grey-5" />

      <q-card-section class="bg-grey-2 my-card">

        <p>bienvenido</p>

      </q-card-section>
    </q-card>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
//import AreaService from "@/services/AreaService";
//import Area from "@/entities/Area";
//import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      //areas: [] as Area[],
    }
  },
  methods: {
    // listar() {
    //   AreaService.getAll()
    //     .then((response: any) => {
    //       if(response.data.status == true) {
    //         this.areas = response.data.data;
    //         toast(response.data.message, {"type": "success"})
    //       }
    //       else{
    //         toast(response.data.message, {"type": "error"})
    //       }
    //     })
    //     .catch((e: Error) => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    //this.listar();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
