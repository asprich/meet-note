//Firebase
import fb from "./Firebase";

export default {
    whenUserIsLoggedIn(cb) {
        const callback = cb||function(){};

        //Listen for login status changed. 
        fb.firebase.auth().onAuthStateChanged(function(user) {
            //If logged in, user will not be null
            if (user) {
                callback(user);
            } else {
                //User not logged in, so load the login ui
                (new fb.firebaseui.auth.AuthUI(fb.firebase.auth()))
                    .start('#firebaseui-auth-container', {
                        signInSuccessUrl: "/",
                        signInOptions: [
                            fb.firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        ],
                        tosUrl: "/terms-of-service",
                        privacyPolicyUrl: "/privacy-policy"
                    });
            }
        }, function(error) {
            console.log(error);
        });
    }
}