// Connect to MongoDB
const mongoose = require('mongoose');

connectToMonogo().catch(err => console.log(err));

async function connectToMonogo() {
  await mongoose.connect('mongodb://127.0.0.1:27017/vite');
  console.log("connected to database");

}

module.exports=connectToMonogo;
// const path = require("path");
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.DATABASE;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
