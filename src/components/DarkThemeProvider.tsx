import React, { useState, createContext, useContext } from 'react';
import Cookies from 'js-cookie';

export const DarkContext = createContext([false, (_: boolean) => {}] as [boolean, {(_ : boolean) : void}]);

interface DarkThemeProviderProps {
    children : React.ReactNode
}

export function DarkThemeProvider(props : DarkThemeProviderProps) {
    const [isDark, _setDark] = useState(Cookies.get('isDarkTheme') === "true");
    const setDark = (themeEnabled : boolean) => {
        _setDark(themeEnabled);
        Cookies.set('isDarkTheme', themeEnabled.toString());
    };

    return (
        <DarkContext.Provider value={ [isDark, setDark] }>
            { props.children }
        </DarkContext.Provider>
    ); 
}

export function useDarkTheme() {
    const [isDark, setDark] = useContext(DarkContext);
    const toggleDark = () => setDark(!isDark);

    return { isDark, setDark, toggleDark };
}