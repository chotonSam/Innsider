import { MongoClient } from "mongodb";

// Check if MONGODB_CONNECTION_STRING environment variable is set
if (!process.env.MONGODB_CONNECTION_STRING) {
  throw new Error(
    'Invalid/Missing environment variable: "MONGODB_CONNECTION_STRING"'
  );
}

const uri = process.env.MONGODB_CONNECTION_STRING;
const options = {};

// Declare the client and the mongoClientPromise
let client;
let mongoClientPromise;

if (process.env.ENVIRONMENT === "development") {
  // In development mode, use a global variable so the connection is cached across hot reloads (HMR)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  mongoClientPromise = global._mongoClientPromise;
} else {
  // In production mode, don't use a global variable and create a new connection for each request
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
}

// Export the mongoClientPromise so it can be used across the app
export default mongoClientPromise;
