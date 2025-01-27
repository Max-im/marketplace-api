import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DB_CONNECT_SUCCESS_MSG } from '../constants';

let mongoClient: MongoClient;
let memoryServer: MongoMemoryServer | null = null;

const dbName = 'marketplaceDb';

export async function connect(): Promise<string> {
    if (process.env.DATABASE_URL) {
        mongoClient = new MongoClient(process.env.DATABASE_URL);
        await mongoClient.connect();
    } else {
        memoryServer = await MongoMemoryServer.create();
        const uri = await memoryServer.getUri();
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
    }
    return DB_CONNECT_SUCCESS_MSG;
}

export function getClient(collection: string) {
    if (!mongoClient) {
        throw new Error('Database client is not initialized. Call connect() first.');
    }
    const db: Db = mongoClient.db(dbName);
    return db.collection(collection);
}

export async function disconnect(): Promise<void> {
    if (mongoClient) {
        await mongoClient.close();
    }
    if (memoryServer) {
        await memoryServer.stop();
    }
}
