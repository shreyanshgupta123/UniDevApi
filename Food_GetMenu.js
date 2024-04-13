const express = require('express');
const { MongoClient } = require('mongodb');
const cors=require('cors')
// MongoDB connection URI
const uri = "mongodb+srv://shreyanshgupta1234545:1yM8hw0hFYkM5QjK@unistud.5lxafrc.mongodb.net/?retryWrites=true&w=majority&appName=Unistud";

// Create a new Express application
const app = express();
const port = process.env.PORT|| 3000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Route to insert data into MongoDB collection
// // app.post('/insert-data', async (req, res) => {
// //     // Data to insert (assuming it's coming in the request body)
// //     const dataToInsert = req.body;

// //     // Create a new MongoClient
// //     const client = new MongoClient(uri);

// //     try {
// //         // Connect to MongoDB
// //         await client.connect();

// //         // Get the database and collection
// //         const database = client.db('Food');
// //         const menuCollection = database.collection('GetMenu');

// //         // Insert the data into the collection
// //         const result = await menuCollection.insertOne(dataToInsert);

// //         // Respond with success message
// //         res.send({ success: true, insertedId: result.insertedId });
// //     } catch (error) {
// //         // Handle errors
// //         console.error('Error inserting data:', error);
// //         res.status(500).send({ success: false, error: error.message });
// //     } finally {
// //         // Ensure the client is closed
// //         await client.close();
// //     }
// // });

// Route to get all data from MongoDB collection
app.get('/food_get_menu', async (req, res) => {
    // Create a new MongoClient
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();

        // Get the database and collection
        const database = client.db('Food');
        const menuCollection = database.collection('GetMenu');

        // Find all documents in the collection
        const cursor = menuCollection.find({});

        // Convert cursor to array of documents
        const allDocuments = await cursor.toArray();

        // Respond with the documents
        res.send(allDocuments);
        console.log(allDocuments)
    } catch (error) {
        // Handle errors
        console.error('Error retrieving data:', error);
        res.status(500).send({ success: false, error: error.message });
    } finally {
        // Ensure the client is closed
        await client.close();
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
