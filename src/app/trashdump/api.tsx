import admin from 'firebase-admin';
import 'dotenv/config';

let serviceAccount = JSON.parse(atob(process.env.service_acc_key));

let db = admin.firestore();
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    
}




export async function getAllDumpCollection() {
    const trashDumpCollection = db.collection('trashdump');
    const snapshot = await trashDumpCollection.get();
    let dat = [];
    snapshot.forEach(doc => {
        dat.push({ id: doc.id, ...doc.data() }); // Adding document id and data to the array
    });
    return dat;
};

