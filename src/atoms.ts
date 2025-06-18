import { atomWithStorage } from "jotai/utils";
import { atom, type Getter } from "jotai";
import type { Setter } from "jotai";

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
export const AddNewTodo = (todo:string, status:TodoStatus): ITodo => {
    return {
        id: Date.now(),
        todo,
        status: status,
        createAt: new Date(),
        updateAt: new Date(),
        tag:[]
    }
}
export const TodoAtom = atomWithStorage<ITodo[]>('modern-todos',[]);
export const SelectedCategoryAtom = atom<TodoStatus>(TodoStatus.DOING);
export const TagAtom = atom<string[]>(
    (get: Getter) => {
        const todos = get<ITodo[]>(TodoAtom);
        const alltags = todos.map(todo => todo.tag).flat();
        return alltags.filter((tag,i) => i === alltags.indexOf(tag)).sort();
    }
)
export const FilteredTodoAtom = atom((get: Getter) => {
    const todos = get<ITodo[]>(TodoAtom);
    const category = get(SelectedCategoryAtom);
    if(category === TodoStatus.DOING)
        return todos.filter(todo => todo.status === TodoStatus.TODO || 
                            todo.status === TodoStatus.DOING);
    else return todos.filter(todo => todo.status === category);
})
export const TodoHandleAtom = atom(
    (get:Getter) => {
        return get(TodoAtom);
    },
    (_,set:Setter,update:ITodo) =>{
        set(
            TodoAtom, 
            (todos) => todos.map(todo => todo.id === update.id ? update : todo)
        )
    },
)

export type ThemeStatus = 'light' | 'dark';
export const ThemeAtom = atomWithStorage<ThemeStatus>('modern-theme',"light");