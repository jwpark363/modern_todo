import 'styled-components';

interface IColor{
    main: string;
    secondary: string;
    active: string;
    empatic:string;
}
interface ISize{
  sm:string;
  md:string;
  lg:string;
  xlg:string;
  xxlg:string;
  xxxlg:string;
}
interface ITheme{
  color: IColor;
  backgroundColor:IColor;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    size: ISize,
    theme: (type:string) => ITheme,
  }
}