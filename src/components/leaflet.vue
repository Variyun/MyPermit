<template>
  <v-container class="fill-height" fluid id="map-container" position="static" ></v-container>
</template>

<script>
import leaflet from "leaflet";

export default {
  name: "mymap",

  data() {
    return {
      leaf: null //Interactive map
    };
  },

  mounted() {
    this.initMap();
  },

  methods: {
    //initializes leaflet map
    initMap() {
      //OSM tile layer
      var OSMtile = new leaflet.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18
        }
      );
      //satellite tile layer
      var satellite = new leaflet.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.satellite",
          accessToken:
            "pk.eyJ1IjoiYWEtdmFyaXl1biIsImEiOiJjanZzYmhja2QxM2l5NGFvOHpqdXhiNDJvIn0.ez9bRvvx0eg9RZVmjiTPpQ"
        }
      );
      //leaflet map 
      this.leaf = new leaflet.map("map-container", {
        center: [51.0839, -114.1439],
        zoom: 13,
        layers: [OSMtile]
      });
      //adds scale bar
      leaflet.control.scale().addTo(this.leaf);
      //adds layer control to the map
      var defaultTile = { OpenStreetMap: OSMtile, Satellite: satellite };
      leaflet.control.layers(defaultTile).addTo(this.leaf);
    } //---- end of map initialization ----
  }
};
</script>

<style scoped>

  #map-container {
    z-index: 1;
  }

</style>