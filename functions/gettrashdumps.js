

let {getAllDumpCollection} = require('./test')


require('dotenv').config();

exports.handler = async (event, context) => {



  let col;
  try {
    col = await getAllDumpCollection();
    col = col.filter(x=>!x.hidden)
    console.log(col)
  }catch {
    col = []; 
  }
  return { 
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify(col)
  };
  
};