
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//add firebase setup and config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const vanCollection=collection(db,"vans")



export async function getVans(){
    const querySnapshot=await getDocs(vanCollection)
    const vanData=querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }))

    return vanData
}

export async function getVan(id){
    const docRef=doc(db,"vans",id)
    const vanSnapshot= await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id:vanSnapshot.id
    }
}



export async function getHostVans(){

    const querySnapshot=query(vanCollection,where("hostId","==","123"))
    const vanData=await getDocs(querySnapshot)
    console.log(vanData)
    const vansData=vanData.docs.map(doc=>{
        return{
            ...doc.data(),
            id:doc.id
        }
    })
    return vansData
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
 }