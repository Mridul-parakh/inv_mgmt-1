import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection.isConnected = db.connection[0].readyState;
    console.log(console.isConnected);
  } catch (e) {
    console.log("error = ", e);
  }
}
export default dbConnect;
