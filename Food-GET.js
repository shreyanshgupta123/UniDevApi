import express from 'express';
import { MongoClient } from 'mongodb';
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URL
const mongoURL = 'mongodb+srv://shreyanshgupta1234545:qeQpzIjFt6klKskY@unistud.5lxafrc.mongodb.net/Food';

// Fetch menu items function
async function fetchMenuItems() {
    const agg = []; // Your aggregation pipeline goes here if needed

    try {
        const client = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to MongoDB");

        const coll = client.db('Food').collection('GetMenu');
        const cursor = coll.aggregate(agg);
        const result = await cursor.toArray();

        console.log("Retrieved menu items:", result);

        await client.close();
        console.log("Connection closed");

        return result;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

app.get('/menu-items', async (req, res) => {
    try {
        const menuItems = await fetchMenuItems();
        res.json(menuItems);
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});

// app.use(bodyParser.json());

app.post('/menu-items', async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const newItem = req.body;

        if (!newItem) {
            return res.status(400).json({ error: "Missing required data: newItem" });
        }

        delete newItem._id;

        const client = await MongoClient.connect(mongoURL);
        const db = client.db();
        const collection = db.collection('GetMenu');
        const result = await collection.insertOne(newItem);
        await client.close();
        res.status(201).json({ message: 'Menu item added successfully', insertedId: result.insertedId });
    } catch (error) {
        console.error("Failed to add menu item:", error);
        res.status(500).json({ error: "Failed to add menu item", details: error });
    }
});



// app.post('/menu-items', async (req, res) => {
//     try {
//       const newMenuItem = {  // Your specific data object
//         "name": "Gobhi",
//         "type": "Vegetable",
//         "price": 15
//       };
  
//       const client = await MongoClient.connect(mongoURL);
//       const db = client.db();
//       const collection = db.collection('GetMenu');
//       const result = await collection.insertOne(newMenuItem);
//       await client.close();
//       res.status(201).json({ message: 'Menu item added successfully', insertedId: result.insertedId });
//     } catch (error) {
//       console.error("Failed to add menu item:", error);
//       res.status(500).json({ error: "Failed to add menu item", details: error });
//     }
//   });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
