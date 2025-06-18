import styled from "styled-components";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { TodoAtom, TodoHandleAtom } from "../atoms";
import { type ITodo, TodoStatus } from "../atoms"; 
import StatusIcon from "./StatusIcon";

const Boxes = styled.div`
    min-width: 380px;
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.size.lg};
    background-color: ${props => props.theme.theme('light').backgroundColor.active};
    color:${props => props.theme.theme('dark').color.secondary};
    padding: ${props => props.theme.size.lg};
    border-radius: ${props => props.theme.size.lg};
    font-family: bold;
`;
const FunctionBox = styled.div`
    text-align: right;
    font-size: 12px;
    span{
        cursor: pointer;
        padding: 2px ${props => props.theme.size.md};
        margin-left: ${props => props.theme.size.sm};
        border-radius: ${props => props.theme.size.md};
        color: ${props => props.theme.theme('dark').color.active};
        background-color: ${props => props.theme.theme('dark').backgroundColor.secondary};
    }
`;
const DateBox = styled.div`
    text-align: right;
    font-size: 12px;
`;
const TodoBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
`;
const TodoItem = styled.span``;
const CategoryBox = styled.div`
    display: flex;
    justify-content: end;
    font-size: 14px;
    gap: ${props => props.theme.size.md};
    input{
        border:none;
        border-radius: ${props => props.theme.size.sm};
        padding: 2px;
        width: 60px;
    }
`;

const padStr = (str:number) => str.toString().padStart(2,'0');
const toMMDDHHMM = (d:Date) => {
    return `${padStr(d.getMonth()+1)}.${padStr(d.getDay())} ${padStr(d.getHours())}:${padStr(d.getMinutes())}`;
}
interface IForm{
    tag:string
}
export default function Todo(todo:ITodo){
    const [todos, setTodos] = useAtom(TodoAtom);
    const [_todos, _setTodos] = useAtom(TodoHandleAtom);
    const {register, handleSubmit, setValue} = useForm<IForm>()
    const setTag = (data:IForm) => {
        //tag length >= 2 then remove last element
        const newTodo = {...todo};
        if(newTodo.tag.length >= 2)
            newTodo.tag.pop();
        if(newTodo.tag.indexOf(data.tag) == -1)
            newTodo.tag = [data.tag, ...newTodo.tag];
        _setTodos(newTodo);
        setValue("tag","")
        // if(todo.tag.length >= 2) todo.tag.pop();
        // setTodos(prev => prev.map(item => 
        //     item.id === todo.id &&
        //     todo.tag.findIndex(tagItem => tagItem === data.tag) == -1 ?
        //     {...item, tag:[data.tag,...item.tag]} : item));
    }
    const deleteTodos = (id:number) => {
        const index = todos.findIndex(item => item.id === id);
        setTodos(prev => [...prev.slice(0,index), ...prev.slice(index+1)]);
    }
    const updateTodos = (id:number, status:TodoStatus) => {
        _setTodos({...todo, status:status});
        // setTodos(prev => prev.map(item => item.id === id ? {...item, status:status} : item));
    }
    return <Boxes>
        <FunctionBox>
            {Object.values(TodoStatus).map((status,i) => status === todo.status ? null : <span key={i}
                onClick={() => updateTodos(todo.id,status)}>{status.toLowerCase()}</span>)}
            <span onClick={() => deleteTodos(todo.id)} style={{color:"darkred"}}>del</span>
        </FunctionBox>
        <DateBox>{toMMDDHHMM(new Date(todo.createAt))} / {toMMDDHHMM(new Date(todo.updateAt))}</DateBox>
        <TodoBox>
            <TodoItem>{todo.todo}</TodoItem>
            <StatusIcon status={todo.status} />
        </TodoBox>
        <CategoryBox>
            {todo.tag.map(item => <span key={item}>#{item}</span>)}
            <form onSubmit={handleSubmit(setTag)}>( #<input {...register("tag",{
                required: true
            })} placeholder="new tag"/> )</form>
        </CategoryBox>
    </Boxes>
}