<template>
  <v-app id="inspire" class="overflow-hidden">
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" dark id="drawer" absolute>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Top Nav Bar -->
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>MyPermit!</v-toolbar-title>
    </v-app-bar>
    <!-- Leaflet Map -->
    <v-content>
      <v-container class="fill-height pa-0 ma-0" fluid >
        <mymap />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import mymap from "./leaflet";

export default {
  name: "toolbar",
  components: {
    mymap
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>

<style scoped>
 * {
   overflow: hidden;
 }

 #drawer {
   z-index: 2;
 }

</style>
