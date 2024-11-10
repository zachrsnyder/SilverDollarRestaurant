import { auth } from '../../firebase.config'

import { 
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth'

export async function loginAdmin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function logoutAdmin() {
    return signOut(auth)
}