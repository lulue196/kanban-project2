import { MongoClient, Db } from 'mongodb';
let client: MongoClient | undefined;
export async function db(): Promise<Db> {
 const uri=process.env.MONGODB_URI;
 if(!uri) throw new Error('MONGODB_URI is missing');
 if(!client) client=new MongoClient(uri);
 await client.connect();
 return client.db(process.env.MONGODB_DB || 'kanban_project2');
}
