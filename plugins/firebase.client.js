import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return {
    provide: {
      firebaseAuth: auth
    }
  };
});
