import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { WorkerData } from "../types/auth";
import { auth, db } from "./client";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deleteSession } from "./session";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .trim(),
  });

export class AuthService {

    
    // create authenticated user
    static async registerUser(workerData : WorkerData){
        try{

            // create firebase auth user
            const userCredential = await createUserWithEmailAndPassword(auth, workerData.email, workerData.password);
            const user = userCredential.user;
            
            const idToken = user.getIdToken();
            console.log("New user idToken", idToken)


            const response = await fetch('/api/admin/register', {
              method: 'POST',
              headers: { 'Content-Type' : 'application/json'},
              body: JSON.stringify({
                uid: user.uid,
                role: workerData.role,
                fName: workerData.fName,
                lName: workerData.lName
              })
            })
            // await setDoc(doc(db, 'users', idToken), {
            //     email: workerData.email,
            //     fName: workerData.fName,
            //     lName: workerData.lName,
            //     role: "manager",
            //     createdAt: serverTimestamp()
            // });

            return {success: true, user: user};
        } catch (error){
            console.error("Error registering user: ", error)
            return {success: false, error: error};
        }
    };

    // login 
    static async checkAccount(enterredEmail : string , enterredPassword : string) {
        
      try{
            const result = loginSchema.safeParse({
                email: enterredEmail,
                password: enterredPassword
            })

            if (!result.success) {
                return {
                  errors: result.error.flatten().fieldErrors,
                }
              }
            
            const { email, password } = result.data;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            
            if (user.uid !== null) {
              // if user exists we send the id to the server to make a cookie
                const idToken =  await user.getIdToken();
                const response = await fetch('/api/session/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ idToken })
                })
                const res = await response.json()
                if(res.success){
                  window.location.href = '/admin/dashboard'
                }
            } else {
              return {
                errors: { email: ["Failed to create session"], password: undefined },
              };
            } 

        }catch (error : any) {
            if (error.code === 'auth/user-not-found') {
              // User doesn't exist
              console.log('No user found with this email');
            } else if (error.code === 'auth/wrong-password') {
              // User exists but password is wrong
              console.log('Wrong password');
            } else {
              // Other errors
              console.log(error.message);
            }
        }
    }

    // get user info from their doc in firestore. Not using this atm
    static async getUserInfo(uid: string){
        try{
          const user = await getDoc(doc(db, 'users', uid));
          console.log(user.data())
          return user.data()
        }catch(err: any){
            console.log("Error fetching full user profile: ", err)
        }
    }

    static async getCurrentUserClaims() {
      const currentUser = auth.currentUser;

      console.log("CurrentUser: ", currentUser);

      if(currentUser){
        const tokenResult = await currentUser.getIdTokenResult()
        console.log('Claims: ', tokenResult.claims)

        return tokenResult.claims;
      }
      return null;
    }

    // logout and revoke session and cookie
    static async logout() {
        try {
          const userId = auth.currentUser?.uid;
          await signOut(auth);
          const res = await fetch("/api/session/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          })
          window.location.href = '/admin';
        } catch (error : any) {
            console.log("Error logging out: ", error);
        }
    }
}