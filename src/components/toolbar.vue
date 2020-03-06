<template>
  <v-app id="inspire" class="overflow-hidden">
    <!-- Top Nav Bar -->
    <v-app-bar app color="indigo" dark class="pl-2">
      <v-toolbar-title class="font-weight-black">MyPermit!</v-toolbar-title>
      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon  dark v-on="on" @click="about = !about">
            <v-icon large> mdi-information</v-icon>
          </v-btn>
        </template>
        <span>Learn more about the app!</span>
      </v-tooltip>

      <v-dialog v-model="about" width="500" scrollable>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>About MyPermit!</v-card-title>

          <v-card-text class="pt-2">
            <h3>Do you want to find your permit or other permits quickly?</h3>
            <br />
            <p
              style="font-size:110%;"
            >Worry not because with MyPermit!, you can easily search for permits within any date range and find them on the map.</p>
            <br />
            <h3 style="text-align:center;">Thank You for Using MyPermit!</h3>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="about = false" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    <v-bottom-sheet v-model="sheet" hide-overlay persistent no-click-animation>
      <v-sheet class="text-center sheets" height="300px" dark>
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
          <v-row align="center" justify="center">
            <v-btn @click.stop="submitData">SUBMIT</v-btn>
          </v-row>
        </v-col>
      </v-sheet>
    </v-bottom-sheet>

    <v-snackbar v-model="snackbar" top>
      {{ alert }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import mymap from "./leaflet";
import axios from "axios";
import { eventBus } from "../main.js";

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
    menu2: false,
    alert: "If you are seeing this, contact the developer",
    snackbar: false,
    about: false
  }),

  methods: {
    validRange(startDate, endDate) {
      //check year
      if (endDate[0] - startDate[0] < 0) {
        return 0;
        //check month
      } else if (
        endDate[0] - startDate[0] == 0 &&
        endDate[1] - startDate[1] < 0
      ) {
        return 0;
        //check day
      } else if (
        endDate[1] - startDate[1] == 0 &&
        endDate[2] - startDate[2] < 0
      ) {
        return 0;
      } else {
        return 1;
      }
    },

    //use the building permit api to get permits
    findPermit() {
      let _this = this;
      var query =
        "issueddate > '" + this.start + "' and issueddate < '" + this.end + "'";
      axios
        .get("https://data.calgary.ca/resource/c2es-76ed.geojson?", {
          params: {
            $$app_token: "NHy6Rg4A2Pk5OYNCvLeXSj0K1",
            $where: query
          }
        })
        .then(function(response) {
          if (response.data.features.length == 0) {
            _this.alert =
              "Couldn't find any permits from " +
              _this.start +
              " to " +
              _this.end +
              ".";
            _this.snackbar = true;
          } else {
            _this.alert = "Hey! I found some permits!";
            eventBus.$emit("displayPermits", response.data.features);
            _this.snackbar = true;
            _this.sheet = false;
          }
        })
        .catch(function(error) {
          console.log(error);
          _this.alert =
            "There has been an error with the query or API! Please Contact the developer!";
          _this.alert = true;
        });
    },

    submitData() {
      //check to see if data is there
      if (this.start != null && this.end != null) {
        var startDate = this.start.split("-");
        var endDate = this.end.split("-");
        //check to make sure range is valid
        if (this.validRange(startDate, endDate)) {
          this.findPermit();
        } else {
          this.alert =
            "Oh no... The date range you entered is invalid. Please try again!";
          this.snackbar = true;
        }
      } else {
        //alert user if start/ end date field is empty
        this.alert = "Start or End Date is Empty!";
        this.snackbar = true;
      }
    }
  }
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

.tool {
  z-index: 1000;
}
</style>