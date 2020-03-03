<template>
 <v-app>
  <toolbar/>

    <mymap/>
 </v-app>
</template>

<script>
import toolbar from './components/toolbar';
import mymap from './components/leaflet';

export default {
  name: 'App',

  components: {
    toolbar,
    mymap,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  * {
    overflow-y: hidden;
  }
</style>
