import firebase from './firebase';
import "firebase/auth";

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    promt: "select_account",
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const onAuthStateChanged = () => auth.signInWithPopup(provider);

export default auth;