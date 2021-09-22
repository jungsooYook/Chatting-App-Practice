import * as firebase from "firebase";
import config from "../../firebase";
import "firebase/firestore";

const app = firebase.initializeApp(config);

const Auth = app.auth();

const DB = firebase.firestore();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async ({ email, password, name }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  await user.updateProfile({
    displayName: name,
  });
  return user;
};
