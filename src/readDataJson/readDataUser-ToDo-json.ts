import fs from 'fs';
import { IUser, ITodoList } from '../interface/interfaces'


export const readUserData: () => IUser[] = () => JSON.parse(fs.readFileSync("./src/db/users.json", "utf-8"))

export const readTodoListData: () => ITodoList[] = () => JSON.parse(fs.readFileSync("./src/db/toDoList.json", "utf-8"))
