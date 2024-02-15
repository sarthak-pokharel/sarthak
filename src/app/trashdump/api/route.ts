import * as admin from 'firebase-admin';
import 'dotenv/config';

import { NextResponse } from "next/server";

let serviceAccount = JSON.parse(atob(process.env.service_acc_key));
if(!admin.app.length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}





async function getAllDumpCollection() {
    admin.initializeApp();
    let db = admin.firestore();
    const trashDumpCollection = db.collection('trashdump');
    const snapshot = await trashDumpCollection.get();
    let dat = [];
    snapshot.forEach(doc => {
        dat.push({ id: doc.id, ...doc.data() }); // Adding document id and data to the array
    });
    console.log(dat);
    return dat;
};

export async function GET() {
    // Do whatever you want
    return NextResponse.json(await getAllDumpCollection(), { status: 200 });
  }
  