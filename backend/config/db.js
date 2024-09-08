import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://hammadahmed20004:r1wvsDJ6GyyFu5zE@cluster0.uhsfi.mongodb.net/net_db?retryWrites=true&w=majority&appName=Cluster0")
        console.log('Connected to MongoDB');
    }
    catch(error) {
        console.log('mongodb connection failed',error);
    }
}
