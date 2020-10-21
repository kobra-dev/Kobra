import React, { useMemo } from 'react';
import Editor from './pages/Editor';
import { useDarkTheme } from './components/DarkThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useAsyncMemo } from 'use-async-memo';
import './App.css';

const App: React.FC = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { isDark } = useDarkTheme();
  /*const [ client, setClient ] = useState(undefined as any);

  async function getClient() {
    setClient(new ApolloClient({
      uri: process.env.REACT_APP_GQL_URI,
      cache: new InMemoryCache(),
      headers: {
        authorization: await getAccessTokenSilently()
      }
    }));
  }

  useEffect(() => {
    setClient(getClient())
  }, [])*/

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
        <div className="loaderContainer">
          <CircularProgress />
        </div>
      ) : (
        <ApolloProvider client={client}>
          <Editor />
        </ApolloProvider>
      )}
    </ThemeProvider>
  );
}

export default App;

/*
<IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={Editor} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
 */