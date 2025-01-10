import { transcode } from "buffer";
import { storage, db } from "../auth/client";
import { doc, updateDoc, getDocs, collection, getDoc, query, limit, runTransaction, Transaction} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { Files } from "lucide-react";
import { Menu } from "../types/AdminMenu";
import { version } from "os";

export async function getVersionCount(){
    try{
        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);

        if(!snapshot.empty){
            const docData = snapshot.docs[0].data();
            return { success: true,  versionCount: docData.versionCount }
        }
    }catch(err: any){
        return { success:false, message: 'Error fetching versioning document'}
    }
}

export async function getVersion(){
    try{
        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);

        if(!snapshot.empty){
            const docData = snapshot.docs[0].data();
            return { success: true, version: docData.version }
        }
    }catch(err: any){
        return { success:false, message: 'Error fetching versioning document'}
    }
}

export async function changeMetadata(data: object) {
    // operates under the assumption that the version passed is within the range of possible versions
    try{
        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);
        if(!snapshot.empty){
            const docId = snapshot.docs[0].id;
            const docRef = doc(db, 'menu', docId);
            await updateDoc(docRef, data)
        }
        return { success: true}
    }catch(err: any){
        return { success:false, message: 'Error changing version'}
    }
}

export async function getMenu(version?:number){
    try {
        const breakfastRef = ref(storage, `menus/v${version}/breakfast.pdf`);
        const dinnerRef = ref(storage, `menus/v${version}/dinner.pdf`);

        // Then get URLs
        const [breakfastUrl, dinnerUrl] = await Promise.all([
            getDownloadURL(breakfastRef),
            getDownloadURL(dinnerRef)
        ]);

        return {
            success: true,
            breakfast: breakfastUrl,
            dinner: dinnerUrl
        };
    }
    catch(err: any){
        return { success:false, message: 'error fetching menus'}
    }
}

export async function addMenu(breakfastUrl : File, dinnerUrl: File){
    try{
        const res = await getVersionCount();
        const versionCount = res?.versionCount

        const [breakfastSnapshot, dinnerSnapshot] = await Promise.all([
            uploadBytes(ref(storage, `menus/v${versionCount+1}/breakfast.pdf`), breakfastUrl),
            uploadBytes(ref(storage, `menus/v${versionCount+1}/dinner.pdf`), dinnerUrl)
          ]);

        
        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);
        if(!snapshot.empty){
            const docId = snapshot.docs[0].id;
            const docRef = doc(db, 'menu', docId);
            await updateDoc(docRef, {
                version: versionCount + 1,
                versionCount: versionCount + 1
            })
        }
        return { success: true }
    }catch(err: any){
        return { success:false, message: 'Error occurred while adding a new menu'}
    }
}

export async function getAll(){
    let menu: Menu;
    const q = query(collection(db, 'menu'), limit(1))
    const snapshot = await getDocs(q);
    if(!snapshot.empty){
        const docId = snapshot.docs[0].id;
        const docRef = doc(db, 'menu', docId);
        const menuMeta = (await getDoc(docRef)).data();
        const menues = await getMenu(menuMeta?.version);
        if(menuMeta?.version && menues.success){
            return {version: menuMeta?.version, versionCount: menuMeta?.versionCount, breakfastUrl: menues.breakfast, dinnerUrl: menues.dinner, success: true}
        }else{
            return {version: 0, versionCount: 0, breakfastUrl: '/', dinnerUrl: '/', success: false, message: 'Unknown error getting menu documents.'}
        }
    }else{
        return {version: 0, versionCount: 0, breakfastUrl: '/', dinnerUrl: '/', success: false, message: 'Error when getting recent menu information.' }
    }
}