export interface ITodoList {
    userId: number;
    id: number;
    taskTitle : string;
    taskDetail: string;
    done: boolean;
  }
  
  export interface IUser {
    id: number;
    userName: string;
    pass: string;
    email: string;
    todo: []
    // todo: todoList;
  }
  