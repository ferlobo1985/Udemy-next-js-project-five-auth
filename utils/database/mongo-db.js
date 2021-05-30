import { MongoClient } from 'mongodb';

export async function connectToDb(){
    const dbClient = await MongoClient.connect(`mongodb+srv://admin:VH6pfyY90cMVlNDP@cluster0.rc4ay.mongodb.net/authdb?retryWrites=true&w=majority`);
    return dbClient;
}