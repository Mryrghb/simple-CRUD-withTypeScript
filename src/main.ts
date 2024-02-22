import express, { Express } from 'express';
import { getOneUserToDoList,getAllUsers , getOneUser,deleteUser,updateUser} from './controllers/userControllers';
const app: Express = express();

// to parse req.body in express you should set these two middleware to parse the req body, it add all data to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/users/list', getAllUsers);
app.get('/users/:id', getOneUser);
app.get('/todos/:userId', getOneUserToDoList);
// app.post('/users/add', addNewUser); //done is error
app.delete('/users/deleteUser/:id', deleteUser);
app.put('/users/updateUser/:id', updateUser);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(5000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:5000`);
});



