

let {getAllDumpCollection} = require('./test')


require('dotenv').config();

exports.handler = async (event, context) => {


  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
  const data = JSON.parse(event.body);
  if(data.password != process.env.admin_pass){
    return { 
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
      body: JSON.stringify({success:false, error: 'wrong pass'})
    };
  }

  let col;
  try {
    col = await getAllDumpCollection();
    console.log(col)
  }catch {
    col = []; 
  }
  return { 
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify({success:true, dat:col})
  };
  
};