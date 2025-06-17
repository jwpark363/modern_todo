import type { DefaultTheme } from 'styled-components';

const darkTheme = {
    color: {
        main: "whitesmoke",
        secondary: "#dcdde1",
        active: "#fbc531",
        empatic: "#44bd32",

    },
    backgroundColor:{
        main: "#2f3640",
        secondary: "#718093",
        active: "#487eb0",
        empatic: "#9c88ff",

    },
}
const lightTheme = {
    color: {
        main: "#2f3640",
        secondary: "#353b48",
        active: "#0097e6",
        empatic: "#c23616",
    },
    backgroundColor:{
        main: "whitesmoke",
        secondary: "#dcdde1",
        active:"#192a56",
        empatic: "#273c75",
    },
}

export const todoTheme: DefaultTheme = {
    size: {
        sm:"4px",
        md:"8px",
        lg:"12px",
        xlg:"16px",
        xxlg:"24px",
        xxxlg:"48px",
    },
    theme: (type:string) => type === 'dark'? darkTheme : lightTheme
};