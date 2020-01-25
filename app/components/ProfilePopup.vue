<template>
    <v-menu bottom left>
        <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="user.displayName"></v-list-item-title>
                        <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
                    </v-list-item-content>

                    <!-- <v-list-item-action>
                        <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    </v-list-item-action> -->
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch v-model="messages" color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Enable messages</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-switch v-model="hints" color="purple"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Enable hints</v-list-item-title>
                </v-list-item>

                <v-list-item @click="signOut">
                    <v-list-item-action>
                        <v-icon>mdi-exit-run</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Log out</v-list-item-title>
                </v-list-item>
            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" text @click="menu = false">Save</v-btn>
            </v-card-actions>
      </v-card>
    </v-menu>
</template>

<script>
import fb from "../helpers/Firebase";

export default {
    name: "ProfilePopup",
    data: () => ({
        fav: null,
        messages: false,
        hints: false
    }),
    computed: {
        user() { return this.$store.state.user; }
    },
    methods: {
        signOut() {
            fb.firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }, function(error) {
                // An error happened.
            });
        }
    }
}
</script>