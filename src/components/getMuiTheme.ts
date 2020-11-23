import { createMuiTheme } from "@material-ui/core";

const getMuiTheme = (isDark: boolean) => createMuiTheme({
    palette: {
        type: isDark ? 'dark' : 'light',
        primary: { main: "#42ad66", contrastText: "#ffffff" },
        secondary: { main: "#76e094", contrastText: "#000000" }
    },
});

export default getMuiTheme