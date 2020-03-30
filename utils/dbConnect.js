import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true,
    useUnifiedTopology: true
  });
  connection.isConnected = db.connection[0].readyState;
  console.log(console.isConnected);
}
export default dbConnect;
