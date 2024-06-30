import { collection, getDocs, getDoc, getFirestore, doc, query, where, addDoc, updateDoc } from 'firebase/firestore'
import app from './firebase'
import bcrypt from 'bcrypt'

const firestore = getFirestore(app)

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signIn(userData: { email: string }) {
    const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if(data) {
        return data[0];
    } else {
        return null
    }
}

export async function signUp(userData: { email: string, fullname: string, password: string, role?: string }, callbacks: Function) {
    const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if(data.length > 0) {
        callbacks({ status: false, message: 'Email sudah terdaftar' });
    } else {
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.role = "member";
        await addDoc(collection(firestore, 'users'), userData).then(() => {
            callbacks({ status: true, message: 'Register success' });
        }).catch((err) => {
            callbacks({ status: false, message: 'Register failed' });
        })
    }
}

export async function signInWithGoogle(userData: any, callbacks: Function) {
    const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if(data.length > 0) {
        userData.role = data[0].role;
        await updateDoc(doc(firestore, 'users', data[0].id), userData).then(() => {
            callbacks({ status: true, message: 'Sign in with google success', data: userData });
        }).catch((err) => {
            callbacks({ status: false, message: 'Sign in with google failed' });
        })
    } else {
        userData.role = "member";
        await addDoc(collection(firestore, 'users'), userData).then(() => {
            callbacks({ status: true, message: 'Sign in with google success', data: userData });
        }).catch((err) => {
            callbacks({ status: false, message: 'Sign in with google failed' });
        })
    }
}