<template>
  <v-container class="fill-height" fluid id="map-container" position="static" ></v-container>
</template>

<script>
import leaflet from "leaflet";
import {eventBus} from "../main.js";
import "leaflet.markercluster";

export default {
  name: "mymap",

  data() {
    return {
      leaf: null, //Interactive map
      geoLayer: null,
    };
  },

  mounted() {
    this.initMap();
    
    eventBus.$on("displayPermits", data => {
      // if markers already exists, remove old ones
      console.log(data);
      if (this.geoLayer != null) {
        this.leaf.removeLayer(this.geoLayer);
      }
      this.geoLayer = leaflet.geoJSON(data);
      var cluster = leaflet.markerClusterGroup();
      cluster.addLayer(this.geoLayer);
      this.leaf.addLayer(cluster);
      this.leaf.fitBounds([[50.9, -114.2], [51.2, -113.9]]);
    });
    
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
  @import "../../node_modules/leaflet.markercluster/dist/MarkerCluster.css";
  @import "../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css";

  #map-container {
    z-index: 1;
  }

</style>
