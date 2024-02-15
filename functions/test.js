
// import admin from 'firebase-admin';

let admin = require('firebase-admin');

let serviceAccount = JSON.parse(atob(process.env.service_acc_key));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 

async function getAllDumpCollection(){
  
  const db = admin.firestore();
  const trashDumpCollection = db.collection('trashdump');
  const snapshot = await trashDumpCollection.get();
  let dat = [];
  snapshot.forEach(doc => {
    dat.push({ id: doc.id, ...doc.data() }); // Adding document id and data to the array
  });
  return dat;
};


async function pushTrashDumpItem(item) {
  const db = admin.firestore();
  const docRef = await db.collection('trashdump').add(item);
  console.log(docRef.id);
  
}


module.exports = {getAllDumpCollection};
// export getAllDumpCollection;