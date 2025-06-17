import { atomWithStorage } from "jotai/utils";

export enum TodoStatus{
    "TODO"="TODO",
    "DOING"="DOING",
    "DONE"="DONE",
    "HOLD"="HOLD"
}

export interface ITodo{
    id:number,
    todo:string,
    status:TodoStatus,
    createAt:Date,
    updateAt:Date,
    tag:string[]
}

export const AddNewTodo = (todo:string): ITodo => {
    return {
        id: Date.now(),
        todo,
        status: TodoStatus.TODO,
        createAt: new Date(),
        updateAt: new Date(),
        tag:[]
    }
}
export const TodoAtom = atomWithStorage<ITodo[]>('modern-todos',[]);


export type ThemeStatus = 'light' | 'dark';
export const ThemeAtom = atomWithStorage<ThemeStatus>('modern-theme',"light");