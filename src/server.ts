import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';




dotenv.config();
const PORT = 5000
async function startServer() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.hc9ux7i.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster1`);
    console.log("server is connected through mongoose");
    app.listen(PORT, () => {
        console.log(`app is listening to port ${PORT}`);
    })
}
startServer()