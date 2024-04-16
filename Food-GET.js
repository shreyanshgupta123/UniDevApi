import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URL
const mongoURL = 'mongodb+srv://shreyanshgupta1234545:qeQpzIjFt6klKskY@unistud.5lxafrc.mongodb.net/Food';

async function GetMenuItems() {
    const agg = []; 
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
        const menuItems = await GetMenuItems();
        res.json(menuItems);
    } catch (error) {
        console.error("Failed to fetch menu items:", error);
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});
async function GetAllRestaurants() {
    const agg = []; 
    try {
        const client = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        const coll = client.db('Food').collection('GetAllRestaurants');
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
app.get('/get_all_restaurants', async (req, res) => {
    try {
        const GetALLRest = await GetAllRestaurants();
        res.json(GetALLRest);
    } catch (error) {
        console.error("Failed to fetch GetAllRestaurants:", error);
        res.status(500).json({ error: "Failed to fetch GetAllRestaurants" });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
