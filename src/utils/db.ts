import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
import { SETTINGS } from "../settings/settings"
import { CollectionNames } from "../constants"
import { BlogViewModel, PostViewModel } from "../models"
import { BlogDbType, PostDbType } from "../db"
import { UserDB } from "../features/users/types/userDb.interface"

dotenv.config();
if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL environment variable is not set');
}

const mongoURI = process.env.MONGO_URL;
const client = new MongoClient(mongoURI);
export const db = client.db(SETTINGS.DB_NAME);

export const blogsCollection = db.collection<BlogDbType>(CollectionNames.BLOGS);
export const postsCollection = db.collection<PostDbType>(CollectionNames.POSTS);
export const usersCollection = db.collection<UserDB>(CollectionNames.USERS);

export const runDB = async () => {
    try {
        client.connect();
        console.log('succesfully connected');
    } catch {
        console.log('connection failed')
    }
}

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  // Close database connections and other resources
  process.exit(0);
});