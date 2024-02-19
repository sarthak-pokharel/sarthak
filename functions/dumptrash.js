
require('dotenv').config();

let admin = require('firebase-admin');
const { readFileSync } = require('fs');

let serviceAccount = JSON.parse(atob(process.env.service_acc_key));
if(!admin.apps.length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function pushTrashDumpItem(item) {
    const db = admin.firestore();
  const docRef = await db.collection('trashdump').add(item);
  console.log(docRef.id);
}
  


exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
    }
  
    try {
      const data = JSON.parse(event.body);
      let pushCont = data.dat;
      let pass = data.password
      if(pass != process.env.admin_pass){
        return {
          statusCode: 200, 
          body: JSON.stringify({success:false, error: "wrong password"})
        }
      }
      console.log({pushCont, pass});
      // Process the data as needed
      await pushTrashDumpItem(pushCont);
  
      return {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request body' }),
      };
    }
  };