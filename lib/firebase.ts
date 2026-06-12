// Firebase configuration and initialization
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase config is valid (has at least projectId and appId)
const isFirebaseConfigValid = !!(firebaseConfig.projectId && firebaseConfig.appId);

let app: FirebaseApp | null = null;

// Only initialize Firebase if config is valid
if (isFirebaseConfigValid && !getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
} else if (isFirebaseConfigValid && getApps().length) {
  app = getApps()[0];
}

let analytics: Analytics | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (typeof window !== "undefined" && app && isFirebaseConfigValid) {
  // Initialize Auth
  try {
    auth = getAuth(app);
  } catch (error) {
    console.warn("Firebase Auth initialization failed:", error);
  }

  // Initialize Firestore
  try {
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase Firestore initialization failed:", error);
  }

  // Initialize Storage
  try {
    storage = getStorage(app);
  } catch (error) {
    console.warn("Firebase Storage initialization failed:", error);
  }

  // Initialize Analytics (only in production)
  if (process.env.NODE_ENV === 'production') {
    isSupported().then((supported) => {
      if (supported && app) {
        try {
          analytics = getAnalytics(app);
        } catch (error) {
          console.warn("Firebase Analytics initialization failed:", error);
        }
      }
    }).catch((error) => {
      console.warn("Firebase analytics support check failed:", error);
    });
  }
}

export { app, auth, db, storage, analytics };
