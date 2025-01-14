import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { WorkerData } from "../types/auth";
import { auth, db } from "./client";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .trim(),
  });

export class AuthService {

    
    
    static async registerUser(workerData : WorkerData){
        try{

            // create firebase auth user
            const userCredential = await createUserWithEmailAndPassword(auth, workerData.email, workerData.password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: workerData.email,
                fName: workerData.fName,
                lName: workerData.lName,
                role: "manager",
                createdAt: serverTimestamp()
            });

            return user;
        } catch (error){
            console.log("Error registering user: ", error)
        }
    };




    static async checkAccount(enterredEmail : string , enterredPassword : string) {
        try{
            const result = loginSchema.safeParse({
                email: enterredEmail,
                password: enterredPassword
            })

            if (!result.success) {
                return {
                  errors: result.error.flatten().fieldErrors,
                };
              }
            
            const { email, password } = result.data;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            
            if (user.uid !== null) {
                const idToken =  await user.getIdToken();
                return {
                    idToken: idToken,
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

    static async getUserInfo(uid: string){
        try{
            const user = await getDoc(doc(db, 'users', uid));
            return user.data()
        }catch(err: any){
            console.log("Error fetching full user profile: ", err)
        }
    }

    static async logout() {
        try {
          const userId = auth.currentUser?.uid;
          await signOut(auth);
          redirect("/admin")
        } catch (error : any) {
            console.log("Error logging out: ", error);
        }
    }
}