import * as firebase from '@firebase/testing'
import * as fs from 'fs';
import { AppOptions } from '@firebase/testing/dist/src/api';

const projectId = "evenodd-demo";

// Create the test app using the unique ID and the given user auth object
const admin = firebase.initializeAdminApp({
  projectId
});

// Get the db linked to the new firebase app that we creted
const adminDb = admin.firestore();

interface IData {
  [key: string]: IData;
}

export interface ISetup extends AppOptions {
  data?: IData
}

export const setup = async ({auth, data}: ISetup = {}) => {

  // Create the test app using the unique ID and the given user auth object
  const app = firebase.initializeTestApp({
    projectId,
    auth
  });

  // Get the db linked to the new firebase app that we creted
  const db = app.firestore();

  // Apply the test rules so we can write documents
  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync("./firestore.rules", "utf8")
  });

  // Write mock documents with test rules
  if (data) {
    for (const key in data) {
      const ref = adminDb.doc(key);
      await ref.set(data[key]);
    }
  }

  // return the initialised DB for testing
  return db;
};

export const clearData = () => {
  // Clears all data
  firebase.clearFirestoreData({ projectId })
};

export const cleanUp = async () => {
  // Clean up apps
  await Promise.all(firebase.apps().map(app => app.delete()))
};

export const assertSucceeds = firebase.assertSucceeds;
export const assertFails = firebase.assertFails;