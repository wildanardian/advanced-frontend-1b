import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import type { AuthRepository } from "./authRepository.types";
import { auth } from "@/lib/firebase";

export const firebaseAuthRepository: AuthRepository = {
  register: async (name, password, confirmPassword) => {
    const credential = await createUserWithEmailAndPassword(auth, password, confirmPassword);
    await updateProfile(credential.user, { displayName: name });

    return {
      id: credential.user.uid,
      name,
    }
  },
  login: async(name, password) => {
    const credential = await signInWithEmailAndPassword(auth, name, password);

    return {
      id: credential.user.uid,
      name: credential.user.displayName ?? '',
    }
  },

  logout: async() => {
    await signOut(auth);
  },

  getCurrentUser: async() => {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }

    return {
      id: user.uid,
      name: user.displayName ?? '',
    }
  }
}