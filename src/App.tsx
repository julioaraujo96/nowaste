import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, home, person } from 'ionicons/icons';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Registo from './pages/Registo';
import AddAnuncio from './pages/AddAnuncio';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/criar_anuncio">
            <AddAnuncio />
          </Route>
          <Route path="/meu_perfil">
            <Perfil />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="criar anuncio" href="/criar_anuncio">
            <IonIcon className="addcolor"icon={addCircle}/>
            <IonLabel>Criar Anúncio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="meu_perfil" href="/meu_perfil">
            <IonIcon icon={person} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      <Route exact path="/login">
           <Login />
      </Route>
      <Route exact path="/registo">
           <Registo />
      </Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </IonReactRouter>
  </IonApp>
);

export default App;
