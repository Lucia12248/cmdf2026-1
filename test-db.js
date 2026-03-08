// FOR TESTING IF MONGO DB IS CONNECTED


import 'dotenv/config';
import mongoose from 'mongoose';

console.log("--- starting connection test ---");

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: Your .env file is missing the MONGO_URI!");
  process.exit(1);
}

async function run() {
  try {
    // This connects to your M10 dedicated cluster [cite: 7, 63]
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
    console.log("Database Name:", mongoose.connection.name);
    process.exit(0);
  } catch (err) {
    console.error("❌ CONNECTION FAILED:", err.message);
    process.exit(1);
  }
}

run();