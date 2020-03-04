<template>
  <v-app id="inspire" class="overflow-hidden">
    <!-- Top Nav Bar -->
    <v-app-bar app color="indigo" dark class="pl-2">
      <v-toolbar-title class="font-weight-black">MyPermit!</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon large>mdi-information</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Leaflet Map -->
    <v-content>
      <v-container class="fill-height pa-0 ma-0" fluid>
        <mymap />
      </v-container>
    </v-content>
    <v-btn color="indigo" dark @click="sheet=!sheet">
      <v-icon>mdi-magnify</v-icon>FIND MY PERMIT
    </v-btn>
    <!-- Bottom sheet for search -->
    <v-bottom-sheet
      v-model="sheet"
      hide-overlay
      persistent
      no-click-animation
    >
      <v-sheet class="text-center sheets" height="300px" dark >
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet">close</v-btn>
        <v-col>
          <v-row align="center" justify="center">
            <h2>Where is that dang permit?!</h2>
          </v-row>
          <v-row
            align="center"
            justify="center"
            class="thin"
          >To start, please enter in the date range of the permit.</v-row>

          <!-- Set Date Range -->
          <v-row class="date-range">
            <!-- Start Date -->
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="start"
                transition="slide-x-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="start" label="Start Date" readonly outlined v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="start" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(start)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <!-- End Date-->
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="end"
                transition="slide-x-reverse-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="end" label="End Date" readonly outlined v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="end" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu2.save(end)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-sheet>
    </v-bottom-sheet>
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
    sheet: false,
    start: null,
    end: null,
    menu: false,
    menu2: false
  })
};
</script>


<style scoped>
.date-range {
  padding-left: 30%;
  padding-right: 30%;
}

.sheets {
  opacity: 0.6;
}

.sheets:hover {
  opacity: 1;
}

</style>