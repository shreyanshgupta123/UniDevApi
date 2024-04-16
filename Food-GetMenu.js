import express from 'express';
import { MongoClient } from 'mongodb';
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
// Express endpoint to fetch menu items
app.get('/menu-items', async (req, res) => {
    try {
        const menuItems = await fetchMenuItems();
        res.json(menuItems);
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});
app.post('/menu-items', async (req, res) => {
    try {
        const newItem = req.body; // Assuming the request body contains the new menu item details
        const client = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const coll = client.db('Food').collection('GetMenu');
        await coll.insertOne(newItem);
        await client.close();
        res.status(201).json({ message: 'Menu item added successfully' });
    } catch (error) {
        console.error("Failed to add menu item:", error);
        res.status(500).json({ error: "Failed to add menu item" });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
