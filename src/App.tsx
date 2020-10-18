import React from 'react';
import Editor from './pages/Editor';
import { useDarkTheme } from './components/DarkThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';

const App: React.FC = () => {
  const { isLoading } = useAuth0();
  const { isDark } = useDarkTheme();

  document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDark ? 'dark' : 'light',
        },
      }),
    [isDark],
  );

  return (
    <ThemeProvider theme={ theme }>
      {(isLoading)
      ? (
        <div className="loaderContainer">
          <CircularProgress />
        </div>
      ) : (<Editor />)}
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