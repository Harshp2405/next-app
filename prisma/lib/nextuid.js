// lib/getNextUserId.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL);

export async function getNextUserId() {
    await client.connect();
    const db = client.db();
    const counter = await db.collection('Users').findOneAndUpdate(
        { _id: 'Userid' },
        { $inc: { sequence_value: 1 } },
        { returnDocument: 'after', upsert: true }
    );
    return counter.value.sequence_value;
}
