
require('dotenv').config();

let admin = require('firebase-admin');
const { readFileSync } = require('fs');

let serviceAccount = JSON.parse(atob(process.env.service_acc_key));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
 


async function pushTrashDumpItem(item) {
    const db = admin.firestore();
  const docRef = await db.collection('trashdump').add(item);
  console.log(docRef.id);
}
  


let prompt = require('prompt');
const { tcont } = require('./pushTemp');

prompt.start();






(async function () {
    // let v = JSON.parse(readFileSync('./pushTemp.json').toString());
    let v = tcont;
    if(v.date == null){
        v.date=Date.now()
    }
    if(v.labels.length == 0){
        v.labels = ["random-bs"]
    }
    v.content.text = v.content.text.trim();
    console.log(v);
    await pushTrashDumpItem(v);
})();