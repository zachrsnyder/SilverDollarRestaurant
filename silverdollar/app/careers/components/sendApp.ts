import { db, storage } from "@/lib/auth/client";
import { Application } from "@/lib/types/Application";
import { ID } from "@/lib/types/ID";
import { FirebaseError } from "firebase/app";
import { doc, collection, addDoc, updateDoc, getFirestore, serverTimestamp, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from 'lodash'



export async function submitApplication(resume : File | null, jobId : ID | undefined, appData : Application){
    if(resume && jobId && appData){
    try{

        const parsedAppData = _.omit<Application>(appData, 'resume')
        const jobRef = doc(db, 'jobPostings', jobId);
        const job = await getDoc(jobRef);
        if(!job.exists){
            return {status: 400,
                message: "Job posting no longer exists."
            }
        }
        const applicationRef = collection(jobRef, 'applications')

        // creating application doc first so its ID can be used in file URL.
        const appDoc = await addDoc(applicationRef, {
            ...parsedAppData,
            submittedAt: serverTimestamp()
        })

        //setting up reference with constructed URL then uploading resume bytes to that ref
        const resumePath = `resumes/${jobId}/${appDoc.id}/${resume.name}`;
        const resumeRef = ref(storage, resumePath);

        const [uploadResult] = await Promise.all([
            uploadBytes(resumeRef, resume)
        ]);

        // getting url for download (may or may not be the same url as to upload not sure) then updating the document accordingly
        const downloadUrl = await getDownloadURL(uploadResult.ref);

        await updateDoc(appDoc, {
            resumeUrl: downloadUrl,
            resumePath: resumePath
        })

        return {
            status: 200
        }
    } catch( err: any ){
        console.log("Natural disaster has hit the region");
        console.log(err)
        return {
            status: 400
        }
    }
    }
    return {
        status: 400
    }
}
