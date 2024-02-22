import { Request, Response, } from 'express';
import fs from 'fs';
import {readTodoListData} from '../readDataJson/readDataUser-ToDo-json'



//read All tasks
export const getAlltoDoList = (_req: Request, res: Response) =>
  res.status(200).json({
    users: readTodoListData()
  })

//read One task
  export const getOneToDoList = (req: Request, res: Response) =>{

   const existToDoList = readTodoListData();

    const foundedToDoById = existToDoList.find(task => task.id === parseInt(req.params.id))

    if (!foundedToDoById) {

     res.status(404).send('this task not found');

    } else {res.status(200).json({

     toDoList: foundedToDoById
  })

  }
}


// create new task
export const addNewToDoList = (req: Request, res: Response) => {

  const { userId,taskTitle ,taskDetail, done} = req.query

  const existToDoList = readTodoListData();

  const newIdTask = Math.floor(Math.random() * 100)
//existUsers.length + 1 
  const createToDo = existToDoList.push({ id: newIdTask, userId: +(userId as string), taskTitle: taskTitle as string, taskDetail: taskDetail as string, done: done as any});

  fs.writeFileSync("./src/db/toDoList.json", JSON.stringify(createToDo, null, 2))

  return res.status(200).send(`succesfully added new task for ${userId}`)


}

// delete task
export const deleteToDoList = async(req: Request , res: Response) => {

  const existToDoList = readTodoListData();

  // S2
  const matchToDo = existToDoList.splice(existToDoList.findIndex(task => task.id === parseInt(req.params.id)),1)

  if(!matchToDo){

    res.status(404).send('this task not found');

  } else {

    fs.writeFileSync("./src/db/toDoList.json", JSON.stringify(existToDoList, null, 2))

    console.log({existToDoList})

    return res.status(200).send("succesfully deleted this task")
  }

}


// update task
export const updateToDoList = async(req: Request , res: Response) => {

  const existToDoList = readTodoListData();

  const foundedTaskById = existToDoList.find(task => task.id === parseInt(req.params.id))

  if (!foundedTaskById) {
    res.status(404).send('this task not found');
  } else {
    foundedTaskById.taskTitle = req.body.taskDetail || foundedTaskById.taskTitle;
    foundedTaskById.taskDetail = req.body.taskDetail || foundedTaskById.taskDetail;
    foundedTaskById.done = req.body.done || foundedTaskById.done;


    fs.writeFileSync("./src/db/toDoList.json", JSON.stringify(existToDoList, null, 2))
    
    return res.status(200).send("succesfully update this task")
  } 


}



