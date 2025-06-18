import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AddNewTodo, SelectedCategoryAtom, ThemeAtom, TodoAtom, TodoStatus, type ThemeStatus } from "../atoms";
interface ITheme{
  $themeprop:ThemeStatus
}
const Form = styled.form`
  display: flex;
  gap:  ${props => props.theme.size.md};
  justify-content: center;
`;
const Input = styled.input`
  background-color: ${props => props.theme.theme('light').backgroundColor.secondary};
  color: ${props => props.theme.theme('light').color.active};
  padding: ${props => props.theme.size.md};
  font-size: 18px;
  border-radius: ${props => props.theme.size.md};
  border: none;
`;
const Button = styled.button`
  background-color: ${props => props.theme.theme('light').backgroundColor.secondary};
  color: ${props => props.theme.theme('light').color.active};
  padding: ${props => props.theme.size.md};
  font-size: 18px;
  border-radius: ${props => props.theme.size.md};
  border: none;
`;
const Error = styled.span<ITheme>`
    font-size: 16px;
    color: ${props => props.theme.theme(props.$themeprop).color.empatic};
    text-align: center;
`;
interface IForm{
    todo:string
}
export default function(){
    const setTodos = useSetAtom(TodoAtom);
    const category = useAtomValue(SelectedCategoryAtom);
    const theme = useAtomValue(ThemeAtom);
    const { register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IForm>();

    const onSubmit = (data: IForm) =>
    {
        setTodos(prev => [...prev, AddNewTodo(data.todo, 
          category === TodoStatus.DOING ? TodoStatus.TODO : category)]);
        setValue("todo","");
    }
    return (<>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("todo", {
        required: "write your todo!",
        })} placeholder="write your todo!"/>
        <Button type="submit">ADD</Button>
    </Form>
    <Error $themeprop={theme}>{errors.todo?.message?.toString()}</Error>
    </>)
}