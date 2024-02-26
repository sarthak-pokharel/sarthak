
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

async function togglePostState(id, state){
  const db = admin.firestore();
  let docRef  = await db.collection('trashdump').doc(id);
  // let val = (await docRef.get()).data();
  // console.log(val);
  await docRef.update({
    hidden: state
  });
  return true; 
}


async function getAllDumpCollectionAdmin(){
  
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

async function deletePost(id){
  const db = admin.firestore();
  let docRef  = await db.collection('trashdump').doc(id);
  // let val = (await docRef.get()).data();
  // console.log(val);
  await docRef.delete();
  return true; 
}

module.exports = {getAllDumpCollection,getAllDumpCollectionAdmin,togglePostState,deletePost};
// export getAllDumpCollection;