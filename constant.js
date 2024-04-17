// db.js
import { MongoClient } from 'mongodb';

const mongoURL = 'mongodb+srv://shreyanshgupta1234545:qeQpzIjFt6klKskY@unistud.5lxafrc.mongodb.net/Food';

const client1 = MongoClient.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongoURL2 = 'mongodb+srv://shreyanshgupta1234545:qeQpzIjFt6klKskY@unistud.5lxafrc.mongodb.net/Food';

const client2 = MongoClient.connect(mongoURL2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongoURL3 = 'mongodb+srv://shreyanshgupta1234545:qeQpzIjFt6klKskY@unistud.5lxafrc.mongodb.net/Food';

const client3 = MongoClient.connect(mongoURL3, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


export default client1;

