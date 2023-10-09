// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = { 
   users_list : [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
};

const findUserByNameAndJob = (name, job) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name && user['job'] === job); 
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}


const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
        

const addUser = (user) => {
    const existingUser = findUserById(user.id);
    if (existingUser) {
        return 'User already exists';
    } else {
        user.id = generateId();
        users['users_list'].push(user);
        return user;
    }
}

function generateId() {
	return String(Math.floor(Math.random() * 100));
}

app.use(cors());
app.use(express.json());


app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});


app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;

    if (name && job) {
        result = findUserByNameAndJob(name, job);
    } else if (name) {
        result = findUserByName(name);
    } else {
        result = users['users_list'];
    }

    res.send({users_list: result});
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const result = addUser(userToAdd);
    if (result === 'User already exists') {
        res.status(400).send(result);
    } else {
        res.status(201).json(result);
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const userIndex = users['users_list'].findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users['users_list'].splice(userIndex, 1);
        res.send();
    } else {
        res.status(404).send('User not found.');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 