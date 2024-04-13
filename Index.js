const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://shreyanshgupta1234545:1yM8hw0hFYkM5QjK@unistud.5lxafrc.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('Food');
    const menuCollection = database.collection('GetMenu');

    // Find all documents in the collection
    const cursor = menuCollection.find({});

    // Convert cursor to array of documents
    const allDocuments = await cursor.toArray();

    // Print all documents
    console.log(allDocuments);
  } finally {
    // Ensure the client is closed
    await client.close();
  }
}

run().catch(console.dir);
