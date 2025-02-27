import { storage, db } from "../auth/client";
import { doc, updateDoc, getDocs, collection, getDoc, query, limit} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { Menu } from "../types/AdminMenu";

export async function getVersionCount() {
    try {
        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);
        
        if (!snapshot.empty) {
            const docData = snapshot.docs[0].data();
            console.log("Doc data:", docData);
            if (docData.versionCount === undefined) {
                throw new Error('versionCount field not found in document');
            }
            return { success: true, versionCount: docData.versionCount };
        } else {
            throw new Error('No documents found in menu collection');
        }
    } catch (err: any) {
        console.error('Error in getVersionCount:', err);
        return { success: false, message: 'Error fetching versioning document', error: err.message };
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
    console.log(data)
    try{
        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);
        console.log(snapshot)
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

        console.log(breakfastUrl, dinnerUrl)

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

export async function addMenu(breakfastUrl: File, dinnerUrl: File) {
    try {
        const versionResponse = await getVersionCount();
        if (!versionResponse.success) {
            throw new Error(versionResponse.message);
        }
        
        const versionCount = versionResponse.versionCount;
        if (versionCount === undefined) {
            throw new Error('Version count is undefined');
        }

    
        const [breakfastSnapshot, dinnerSnapshot] = await Promise.all([
            uploadBytes(ref(storage, `menus/v${versionCount + 1}/breakfast.pdf`), breakfastUrl),
            uploadBytes(ref(storage, `menus/v${versionCount + 1}/dinner.pdf`), dinnerUrl)
        ]);

        const docsQuery = query(collection(db, 'menu'), limit(1));
        const snapshot = await getDocs(docsQuery);
        
        if (!snapshot.empty) {
            const docId = snapshot.docs[0].id;
            const docRef = doc(db, 'menu', docId);            
            await updateDoc(docRef, {
                versionCount: versionCount + 1
            });
            
            return { success: true };
        } else {
            throw new Error('No menu document found to update version count');
        }
    } catch (err: any) {
        console.error('Error in addMenu:', err);
        return { 
            success: false, 
            message: 'Error occurred while adding a new menu',
            error: err.message 
        };
    }
}

export async function getAll(){
    let menu: Menu;
    const q = query(collection(db, 'menu'), limit(1))
    const snapshot = await getDocs(q);
    console.log("Test of snapshot", snapshot)
    if(!snapshot.empty){
        const docId = snapshot.docs[0].id;
        const docRef = doc(db, 'menu', docId);
        const menuMeta = (await getDoc(docRef)).data();
        console.log("Get all's menu data", menuMeta)
        const menues = await getMenu(menuMeta?.version);
        console.log("Get alls menu urls", menues)
        if(menues.success){
            return {version: menuMeta?.version, versionCount: menuMeta?.versionCount, breakfastUrl: menues.breakfast, dinnerUrl: menues.dinner, success: true}
        }else{
            return {version: 0, versionCount: 0, breakfastUrl: '/', dinnerUrl: '/', success: false, message: 'Unknown error getting menu documents.'}
        }
    }else{
        return {version: 0, versionCount: 0, breakfastUrl: '/', dinnerUrl: '/', success: false, message: 'Error when getting recent menu information.' }
    }
}