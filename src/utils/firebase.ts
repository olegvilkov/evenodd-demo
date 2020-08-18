// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

interface IRemoteConfig {
  minimumFetchIntervalMillis: number
}

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

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
  fetchTimeoutMillis: 3600000,
};

export default firebase