import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Wait for Firebase to restore auth state
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

  // Provide everything to Nuxt
  nuxtApp.provide("firebaseApp", app);
  nuxtApp.provide("firebaseAuth", auth);
  nuxtApp.provide("authUser", currentUser);
  nuxtApp.provide("authToken", currentUser ? await currentUser.getIdToken(true) : null);
});
