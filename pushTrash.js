
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

prompt.start();




(async function () {
    let {title, content, labels} = await prompt.get(['title', 'content', 'labels']);
    if(!title) title = "";
    if(!content) content = ""
    if(!labels) labels = "random-bs";
    let date = Date.now();
    let v = {
        content:{
            text: content,
            title: title,
            imgs: []
        },
        date,
        labels: labels.split(" ")
    };
    console.log(v);
    await pushTrashDumpItem(v);
});




(async function () {
    let v = JSON.parse(readFileSync('./pushTemp.json').toString());
    if(v.date == null){
        v.date=Date.now()
    }
    if(v.labels.length == 0){
        v.labels = ["random-bs"]
    }
    console.log(v);
    await pushTrashDumpItem(v);
})();