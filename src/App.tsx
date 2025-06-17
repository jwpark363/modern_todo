import styled from 'styled-components';
import TodoList from './TodoList';
import { ThemeAtom, type ThemeStatus } from './atoms';
import { useAtom } from 'jotai';
import ThemeIcon from './componets/ThemeIcon';
interface ITheme{
  $themeprop:ThemeStatus
}
const Boxes = styled.div<ITheme>`
  width: 100vw;
  height: 100vh;
  min-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.theme(props.$themeprop).backgroundColor.main};
  color: ${props => props.theme.theme(props.$themeprop).color.main};
`;
const HeaderBox = styled.div`
  position: relative;
  margin: ${props => props.theme.size.xxxlg} auto;
`;
const Title = styled.p<ITheme>`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.theme(props.$themeprop).color.empatic};
`;
const ThemeToggle = styled.div`
  position: absolute;
  right: -60px;
  bottom: 20px;
  cursor: pointer;
`;

function App() {
  const [theme, setTheme] = useAtom<ThemeStatus>(ThemeAtom);
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }
  return (
    <Boxes $themeprop={theme}>
      <HeaderBox>
        <Title $themeprop={theme}>Modern ToDo App</Title>
        <ThemeToggle onClick={toggleTheme}><ThemeIcon theme={theme}/></ThemeToggle>
      </HeaderBox>
      <TodoList />
    </Boxes>
  )
}

export default App
