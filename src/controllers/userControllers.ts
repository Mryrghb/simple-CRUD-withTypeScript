import { Request, Response, } from 'express';
import fs from 'fs';
import {readTodoListData,readUserData} from '../readDataJson/readDataUser-ToDo-json'


//read User
export const getAllUsers = (req: Request, res: Response) =>
  res.status(200).json({
    users: readUserData()
  })


///------------------------------------------- test for relation between user & todo list
export const getOneUserToDoList = (req: Request, res: Response) => {

  // const existUsers = readUserData();

  const userId = req.params["userId"]

  const existUserToDoList = readTodoListData();

  //  const foundedUserById = existUsers.find(user => user.id === parseInt(req.params.id))

  const foundedUserToDoById = existUserToDoList.filter(todo => todo.userId === +(userId))



  //  if (!foundedUserById) {

  //   res.status(404).send('user Account not found');

  //  } else { if(!foundedUserToDoById) {

  //     res.status(404).send('task not found');

  //   } else {

  res.status(200).json({

    todos: foundedUserToDoById
  })

}


// read One User
export const getOneUser = (req: Request, res: Response) => {

  const existUsers = readUserData();

  const foundedUerById = existUsers.find(user => user.id === parseInt(req.params.id))

  if (!foundedUerById) {

    res.status(404).send('user Account not found');

  } else {
    res.status(200).json({

      users: foundedUerById
    })

  }
}

// // create new user
export const addNewUser = (req: Request, res: Response) => {

  const { userName, pass, email, todo } = req.query

  const existUsers = readUserData();

  const newIdUser = Math.floor(Math.random() * 100)
  //existUsers.length + 1 
  const createUser = existUsers.push({ id: newIdUser, userName: userName as string, pass: pass as string, email: email as string, todo: todo as [] });

  fs.writeFileSync("./src/db/users.json", JSON.stringify(createUser, null, 2))

  return res.status(200).send("succesfully added new user")


}

// delete user
export const deleteUser = async (req: Request, res: Response) => {

  const existUsers = readUserData();

  // S2
  const matchUser = existUsers.splice(existUsers.findIndex(user => user.id === parseInt(req.params.id)), 1)

  if (!matchUser) {

    res.status(404).send('user not found');

  } else {

    fs.writeFileSync("./src/db/users.json", JSON.stringify(existUsers, null, 2))

    console.log({ existUsers })

    return res.status(200).send("succesfully deleted this user")
  }

  //S1
  // existUsers.splice(existUsers.findIndex(user => user.userName === req.params["userName"]),1)



}


// update user
export const updateUser = async (req: Request, res: Response) => {

  const existUsers = readUserData();

  const foundedUerById = existUsers.find(user => user.id === parseInt(req.params.id))

  if (!foundedUerById) {
    res.status(404).send('user Account not found');
  } else {
    foundedUerById.userName = req.body.userName || foundedUerById.userName;
    foundedUerById.email = req.body.email || foundedUerById.email;
    foundedUerById.pass = req.body.pass || foundedUerById.pass;


    fs.writeFileSync("./src/db/users.json", JSON.stringify(existUsers, null, 2))
    // res.json(existUsers);

    return res.status(200).send("succesfully update this user")
  }


}



