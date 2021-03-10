import React, { useEffect, useMemo } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import { ThemeProvider } from '@material-ui/core';
import getMuiTheme from './getMuiTheme';

interface AppProvidersProps {
  children: React.ReactNode
}


export default function AppProviders(props: AppProvidersProps) {
  const { isDark } = useDarkTheme();

  useEffect(() => {
    if(globalThis.window !== undefined) {
      document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";
    }
  }, [isDark]);

  const theme = useMemo(
    () => getMuiTheme(isDark),
    [isDark]
  );

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}