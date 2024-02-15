

import { Context } from "@netlify/functions";

import {getAllDumpCollection} from './test';
import 'dotenv/config';

export default async (req: Request, context: Context) => {
  let col = await getAllDumpCollection();
  return new Response(JSON.stringify(col), { // Sending the data as a response
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
  
};