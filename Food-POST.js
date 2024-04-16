import express from 'express';
import { MongoClient } from 'mongodb';
// const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URL
const mongoURL = 'mongodb+srv://shreyanshgupta1234545:qeQpzIjFt6klKskY@unistud.5lxafrc.mongodb.net/Food';



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