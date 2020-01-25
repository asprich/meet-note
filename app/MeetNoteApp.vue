<template>
    <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <navigation></navigation>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Meet Note! (because tracking meeting notes is this complicated)</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon :to="{name:'new'}">
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
      <profile-popup></profile-popup>
    </v-app-bar>

    <v-content>
      <v-container>
          <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
    <v-snackbar v-model="snackbar" top color="success">
      Your save was successful!
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import ProfilePopup from "./components/ProfilePopup";

export default {
    name: "MeetNoteApp",
    components: { Navigation,ProfilePopup },
    data: () => ({
        snackbar: false,
        drawer: false
    })
}
</script>

<style>
.stretch { width: 100%; }
</style>