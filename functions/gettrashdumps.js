

let {getAllDumpCollection} = require('./test')


require('dotenv').config();

exports.handler = async (req, context) => {
  let col;
  try {
    col = await getAllDumpCollection();
  }catch {
    col = []; 
  }
  return { 
    headers: { 'Content-Type': 'application/json' },
    statusCode: 200,
    body: JSON.stringify(col)
  };
  
};