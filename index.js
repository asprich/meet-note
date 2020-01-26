import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import colors from "vuetify/lib/util/colors";

import Authentication from "./app/helpers/Authentication";

import store from "./app/db/Vuex";

//Meet-Note root component
import router from "./app/routes/Routes";
import MeetNoteApp from "./app/MeetNoteApp";

Authentication.whenUserIsLoggedIn(user => {
    //Add Vue Plug-ins
    Vue.use(VueRouter);
    Vue.use(Vuetify);

    //Starting Vue
    global.MeetingNotesApp = new Vue({ 
        render: createElement => createElement(MeetNoteApp),
        router,
        store,
        vuetify: new Vuetify({
            theme: {
              themes: {
                light: {
                  primary: colors.red.darken1, // #E53935
                  secondary: colors.red.lighten4, // #FFCDD2
                  accent: colors.indigo.base, // #3F51B5
                },
              },
            },
          })
    }).$mount("#app");
    
    store.commit("setUser", user);
});