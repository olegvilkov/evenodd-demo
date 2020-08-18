// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/remote-config";

// App Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqJjx4Zl6gGO_dnkKWUxarmKYW_NySvsc",
    authDomain: "evenodd-demo.firebaseapp.com",
    databaseURL: "https://evenodd-demo.firebaseio.com",
    projectId: "evenodd-demo",
    storageBucket: "evenodd-demo.appspot.com",
    messagingSenderId: "972654850922",
    appId: "1:972654850922:web:f86219ed90100c31efeb13"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const remoteConfig = firebase.remoteConfig();

remoteConfig.settings = {
  fetchTimeoutMillis: 60000,
  minimumFetchIntervalMillis: 10000,
};

// During development relatively low minimum fetch interval
if (process.env.NODE_ENV === `development`) {
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
}

remoteConfig.defaultConfig = ({
  K: 10
});

export default firebase;