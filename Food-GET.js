import express from 'express';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
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
app.get('/get_menuitems', async (req, res) => {
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
app.get('/get_allrestaurants', async (req, res) => {
    try {
        const GetALLRest = await GetAllRestaurants();
        res.json(GetALLRest);
    } catch (error) {
        console.error("Failed to fetch GetAllRestaurants:", error);
        res.status(500).json({ error: "Failed to fetch GetAllRestaurants" });
    }
});

async function GetAllDrinks() {
    const agg = []; 
    try {
        const client = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        const coll = client.db('Food').collection('GetDrinks');
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
app.get('/get_drinks', async (req, res) => {
    try {
        const GetALLRest = await GetAllDrinks();
        res.json(GetALLRest);
    } catch (error) {
        console.error("Failed to fetch GetAllRestaurants:", error);
        res.status(500).json({ error: "Failed to fetch GetAllRestaurants" });
    }
});
async function GetDrinkById(DrinkId)
{
try{
const client= await MongoClient.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
console.log("Welcome to Food-GetDrinks db")

const coll=client.db('Food').collection('GetDrinks');
const result=await coll.findOne({_id:new ObjectId(DrinkId)});
console.log("Retrieved menu items:",result);
await client.close();
console.log("Connection closed");
return result;
}catch(err){
console.log("Error",err);
throw err;
}
}

app.get('/get_drink/:id',async(req,res)=>{
    const DrinkIdId = req.params.id;
    try {
        const Drink = await GetDrinkById(DrinkIdId);
        if (!Drink) {
            return res.status(404).json({ error: "Drink not found" });
        }
        res.json(Drink);
    } catch (error) {
        console.error("Failed to fetch Drink:", error);
        res.status(500).json({ error: "Failed to fetch Drink" });
    }
})
//-------------------------------------Get-University------------------------------
async function GetAllStudents() {
    const agg = []; 
    try {
        const client = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        const coll = client.db('Food').collection('GetAllStudents');
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
app.get('/get_allstudents', async (req, res) => {
    try {
        const GetALLRest = await GetAllStudents();
        res.json(GetALLRest);
    } catch (error) {
        console.error("Failed to fetch GetAllRestaurants:", error);
        res.status(500).json({ error: "Failed to fetch GetAllRestaurants" });
    }
});
async function GetStudentById(studentId) {
    try {
        const client = await MongoClient.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        const coll = client.db('Food').collection('GetAllStudents');
        const result = await coll.findOne({ _id: new ObjectId(studentId) }); // Instantiate ObjectId with 'new'
        console.log("Retrieved student:", result);
        await client.close();
        console.log("Connection closed");
        return result;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

app.get('/get_student/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await GetStudentById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        console.error("Failed to fetch student:", error);
        res.status(500).json({ error: "Failed to fetch student" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
