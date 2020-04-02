// Bring Mongoose into the app
var mongoose = require("mongoose");

// Build the connection string
//var dbURI = process.env.MONGO_URI;
var dbURI = "mongodb://localhost:27017/inv_mgmt";
function dbConnect() {
  // Create the database connection
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on("connected", function() {
    console.log("Mongoose default connection open to " + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
}
module.exports = dbConnect;

//==================================

// import mongoose from "mongoose";

// const connection = {};

// async function dbConnect() {
//   if (mongoose.connection.readyState) {
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     mongoose.connection.readyState = db.connection[0].readyState;
//     console.log(console.isConnected);
//   } catch (e) {
//     console.log("dbConnect error = ", e);
//   }
// }
// export default dbConnect;
