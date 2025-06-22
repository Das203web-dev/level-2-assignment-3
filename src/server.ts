import app from './app';
import mongoose from 'mongoose';
const PORT = 5000
async function startServer() {
    await mongoose.connect(`mongodb+srv://shuvogitlab2024:shuvo%4012131@cluster1.hc9ux7i.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster1`);
    console.log("server is connected through mongoose");
    app.listen(PORT, () => {
        console.log(`app is listening to port ${PORT}`);
    })
}
startServer()