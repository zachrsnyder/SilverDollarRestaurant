import {auth} from '../../firebase.config'
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth'

export async function loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function logoutUser() {
    return signOut(auth)
}