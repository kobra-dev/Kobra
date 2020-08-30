import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Editor from './pages/Editor';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/editor" component={Editor} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/editor" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
