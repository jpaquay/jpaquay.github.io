/**
 * Firebase Auth Helper & Configuration
 * Project Target: netdev-firebase
 */

// Firebase Configuration Object (Replace placeholder values with project credentials)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "netdev-firebase.firebaseapp.com",
  projectId: "netdev-firebase",
  storageBucket: "netdev-firebase.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Allowed admin emails list for authorization checking
const ALLOWED_ADMIN_EMAILS = [
  "jpaquay@gmail.com",
  "jerome@netdev.be",
  "jpaquay@google.com"
];

let firebaseApp = null;
let firebaseAuth = null;
let googleProvider = null;

/**
 * Initializes Firebase App & Authentication SDK
 */
export function initFirebaseAuth() {
  if (typeof firebase === "undefined") {
    console.error("Firebase SDK is not loaded. Please include Firebase App and Auth scripts.");
    return null;
  }
  
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
  } else {
    firebaseApp = firebase.app();
  }

  firebaseAuth = firebase.auth();
  googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.addScope("email");
  googleProvider.addScope("profile");

  return { firebaseApp, firebaseAuth, googleProvider };
}

/**
 * Initiates Google Sign-In via Popup
 * @returns {Promise<Object>} User details if allowed
 */
export async function signInWithGoogle() {
  if (!firebaseAuth || !googleProvider) {
    initFirebaseAuth();
  }

  try {
    const result = await firebaseAuth.signInWithPopup(googleProvider);
    const user = result.user;
    const email = user.email ? user.email.toLowerCase() : "";

    if (!ALLOWED_ADMIN_EMAILS.includes(email)) {
      console.warn(`Unauthorized login attempt by: ${email}`);
      await firebaseAuth.signOut();
      throw new Error(`Unauthorized user: ${email}. Access restricted to admin users.`);
    }

    const idToken = await user.getIdToken();
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      idToken: idToken
    };
  } catch (error) {
    console.error("Google Authentication error:", error);
    throw error;
  }
}

/**
 * Signs out the current Firebase user
 */
export async function signOutUser() {
  if (firebaseAuth) {
    await firebaseAuth.signOut();
  }
}

/**
 * Listens for Auth State Changes
 * @param {Function} callback Callback receiving user object or null
 */
export function onAuthStateChanged(callback) {
  if (!firebaseAuth) {
    initFirebaseAuth();
  }
  return firebaseAuth.onAuthStateChanged((user) => {
    if (user && ALLOWED_ADMIN_EMAILS.includes(user.email ? user.email.toLowerCase() : "")) {
      callback(user);
    } else {
      callback(null);
    }
  });
}
