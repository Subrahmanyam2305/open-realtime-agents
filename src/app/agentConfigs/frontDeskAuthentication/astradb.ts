import { DataAPIClient, VectorDoc, UUID } from '@datastax/astra-db-ts';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '/Users/subrahmanyam.arunachalam/Documents/personal/openai-realtime-agents/.env' });
var { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;

console.log(`astra db application token: ${ASTRA_DB_APPLICATION_TOKEN}`);
console.log(`astra db api endpoint: ${ASTRA_DB_API_ENDPOINT}`);

// Initialize the client and get a "Db" object
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN as string);
const db = client.db(ASTRA_DB_API_ENDPOINT as string);

console.log(`* Connected to DB ${db.id}`);

const collection = db.collection('test_collection');

export function logFunctionResult(functionName: string, result: any) {
    const logMessage = `Function call: ${functionName}, Result: ${JSON.stringify(result, null, 2)}\n`;
  
    // Assuming you want to log it to a file named 'functionLogs.txt'
    if (functionName === "authenticateUser") {
      console.log(`Logged function call result to astradb: ${functionName}`);
      (async function () {
          const vector_result = await collection.findOne(
          //   {},
          //   { sort: { $vectorize: "Timothy" } }
          {firstName: result.firstName}
          );
        
          console.log(vector_result);
        })();
    }
  }
  

(async function () {
    const result = await collection.findOne(
    //   {},
    //   { sort: { $vectorize: "Timothy" } }
    {firstName: 'Timothy'}
    );
  
    console.log(result);
  })();


