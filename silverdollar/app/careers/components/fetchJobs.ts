import { adminDb } from "@/lib/auth/admin";
import { ClientJobPosting } from "@/lib/types/ClientJobPostingMeta";


export default async function fetchJobs() {
    try{
        const snapshot = await adminDb.collection('jobPostings').orderBy('createdAt', 'desc').get();
        
        if (!snapshot.empty){
            const postings = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    id: doc.id,
                    createdAt: data.createdAt.toDate().toISOString(),
                    updatedAt: data.updatedAt.toDate().toISOString()
            } as ClientJobPosting}).filter(value => value.status === 'Active');
            if(postings.length ===  0){
                return {success: true, body: 'empty'}
            }
            return {success: true, body: postings}
        }else{
            return {success: true, body: 'empty'}
        }
    }catch(error : any){
        console.error("Error fetching job postings: ", error)
        return {success: false, message: error}
    }
}