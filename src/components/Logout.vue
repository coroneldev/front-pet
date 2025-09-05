<template>
  <div class="hello">
    
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import store from '../store';
import "vue3-toastify/dist/index.css";
import { Loading } from 'quasar';

export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods: {

  },
  created() {
    Loading.show({message: "Cargando..."});
    store.dispatch("destroyToken")
      .then(response => {
        this.$router.push({ path: '/login' });
        this.$router.go(0);
        Loading.hide();
      })
      .catch((error: any) => {
        this.$router.push({ path: '/login' });
        this.$router.go(0);
        Loading.hide();
      });
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
