import React, { useEffect, useMemo } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import { ThemeProvider } from '@material-ui/core';
import getMuiTheme from './getMuiTheme';
import { UserProvider } from '../utils/user';

interface AppProvidersProps {
  user: any,
  loading: boolean,
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
      <UserProvider value={{user: props.user, loading: props.loading}}>
        {props.children}
      </UserProvider>
    </ThemeProvider>
  );
}