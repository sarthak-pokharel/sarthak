

let {togglePostState} = require('./test')


require('dotenv').config();

exports.handler = async (event, context) => {


  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }
  const data = JSON.parse(event.body);
  console.log(data);
  if(data.password != process.env.admin_pass){
    return { 
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
      body: JSON.stringify({success:false, error: 'wrong pass'})
    };
  };
  let {id, state} = data;
  
  let suc = await togglePostState(id, state);

  return { 
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify({success:suc})
  };
  
};