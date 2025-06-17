import styled from "styled-components";
import Todo from "./componets/Todo";
import { TodoAtom, TodoStatus, type ITodo } from "./atoms";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import FilterIcon from "./componets/FilterIcon";
import NewTodo from "./componets/NewTodo";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin:  ${props => props.theme.size.xlg};
  max-width: 600px;
`;
const TodoBoxes  = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`;
const FilterBox = styled.div`
  width: 320px;
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: 2px;
  font-size: 12px;
  margin: ${props => props.theme.size.md};
  span{
      cursor: pointer;
      padding: 2px ${props => props.theme.size.md};
      border-radius: ${props => props.theme.size.md};
      color: ${props => props.theme.theme('dark').color.secondary};
      background-color: ${props => props.theme.theme('dark').backgroundColor.secondary};
  }
`;
const TabBox = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.size.md};
`;
interface ITab{
  $isactive:boolean
}
const Tab = styled.span<ITab>`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.size.sm} ${props => props.theme.size.lg};
  background-color: ${props => props.$isactive ? 
    props.theme.theme('dark').backgroundColor.active :
    props.theme.theme('dark').backgroundColor.secondary};
  color: ${props => props.theme.theme('dark').color.main};
  border-radius: ${props => props.theme.size.lg};
  cursor: pointer;
  font-size: 14px;
`;
const TabIcon = styled.div``;
const Todos = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.size.lg};
  margin-top: ${props => props.theme.size.xlg};
`;
interface IFilterTag{
  tag:string,
  isactive:boolean
}
const initFilterTags = (todos:ITodo[]) => {
  const AllTags : string[]= [];
    for(let i = 0 ; i < todos.length ; i++){
      for(let j = 0 ; j < todos[i].tag.length ; j++){
        if(AllTags.findIndex(tag => tag == todos[i].tag[j]) == -1){
          AllTags.push(todos[i].tag[j]);
        }
      }
    }
    return AllTags.map(tag => ({tag: tag, isactive: true}));
}
const includeTagsInFilter = (tags:string[], filters:IFilterTag[]) => {
  if(tags.length === 0) return true;
  return filters
  .filter(item => item.isactive)
  .map(item => item.tag)
  .map(item => tags.includes(item)).includes(true)};
export default function TodoList(){
    const todos = useAtomValue(TodoAtom);
    const [tabStatus, setStatus] = useState<TodoStatus>(TodoStatus.DOING);
    const [toggleFilter, setFilter] = useState(false);
    const [filterTags, setFilterTags] = useState<IFilterTag[]>([]);
    const changeFilterTags = (filterTag:IFilterTag) => {
      setFilterTags(prev => prev.map(item => 
        item.tag === filterTag.tag ? {...item, isactive:!item.isactive} : item));
    }
    useEffect(() => {
      setFilterTags(initFilterTags(todos))
    },[todos])
    return (<MainBox>
      <NewTodo />
    <TodoBoxes>
      {!toggleFilter ? null : <FilterBox>
        { filterTags.map(item => <span key={item.tag} style={{opacity:`${item.isactive?'1':'0.8'}`}}
        onClick={() => changeFilterTags(item)}>#{item.tag}</span>) }
        </FilterBox>}
      <TabBox>
        {Object.values(TodoStatus).map((status,i) => status === TodoStatus.TODO ? null : <Tab key={i}
        onClick={() => setStatus(status)} $isactive={tabStatus === status}>
          {status === TodoStatus.DOING ? 'TODO-DOING' : status}</Tab>)}
        <TabIcon onClick={()=>setFilter(!toggleFilter)}><FilterIcon filter={toggleFilter}/></TabIcon>
      </TabBox>
      <Todos>
        {tabStatus === TodoStatus.DOING ? todos.filter(todo => 
          (todo.status === TodoStatus.TODO || todo.status === TodoStatus.DOING) && includeTagsInFilter(todo.tag,filterTags))
          .map(todo => <Todo key={todo.id} {...todo}/>) : 
          todos.filter(todo => todo.status === tabStatus && includeTagsInFilter(todo.tag,filterTags))
            .map(todo => <Todo key={todo.id} {...todo}/>)}
      </Todos>
    </TodoBoxes>
  </MainBox>)
}