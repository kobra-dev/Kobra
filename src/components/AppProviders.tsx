import React, { useMemo } from 'react';
import { useDarkTheme } from './DarkThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useAsyncMemo } from 'use-async-memo';

interface AppProvidersProps {
  children: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      marginTop: "calc(50vh - 40px)"
    }
  }
}));

export default function AppProviders(props: AppProvidersProps) {
  const styles = useStyles();
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { isDark } = useDarkTheme();

  document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDark ? 'dark' : 'light',
          primary: { main: "#42ad66", contrastText: "#ffffff" },
          secondary: { main: "#76e094", contrastText: "#000000" }
        },
      }),
    [isDark]
  );

  const client = useAsyncMemo(
    async () => {
      let headers: Record<string, string> | undefined = undefined;
      console.log("Getting access token");
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        headers = {
          authorization: token
        };
      }
      finally {
        return new ApolloClient({
          uri: process.env.REACT_APP_GQL_URI,
          cache: new InMemoryCache(),
          headers: headers
        });
      }
    },
    [isAuthenticated]
  );

  return (
    <ThemeProvider theme={theme}>
      {(isLoading || client === undefined)
      ? (
        <div className={styles.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <ApolloProvider client={client}>
          {props.children}
        </ApolloProvider>
      )}
    </ThemeProvider>
  );
}