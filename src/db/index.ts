import { MongoClient } from 'mongodb';
import { DB_CONNECT_SUCCESS_MSG } from '../constants';

const url = process.env.DATABASE_URL as string;
const client = new MongoClient(url);

const dbName = 'marketplaceDb';

export async function connect() {
    await client.connect();
    return DB_CONNECT_SUCCESS_MSG;
}


export const getClient = (collection: string) => {
    const db = client.db(dbName);
    return db.collection(collection);
};
