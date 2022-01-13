import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonItem } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="logotext">
          <IonImg src="./assets/logo.png"/>
          <h1>NoWaste</h1>
        </div>
        <div className="search">
          <p>Bem Vindo, o que precisa?</p>
          <IonSearchbar class="search-bar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </div>

        <IonItem lines="none">

          <IonGrid>
            <h1>Items Disponíveis</h1>
            <IonRow>
              <IonCol size="6">
                <IonImg class="img-list" src="./assets/logo.png"/>
                <p className='textImg'>Calculadora</p>
                <p className='textContacto'>Contactar</p>
              </IonCol>
              <IonCol size="6">
                <IonImg class="img-list" src="./assets/logo.png"/>
                <p className='textImg'>Calculadora</p>
                <p className='textContacto'>Contactar</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <IonImg class="img-list" src="./assets/logo.png"/>
                <p className='textImg'>Calculadora</p>
                <p className='textContacto'>Contactar</p>
              </IonCol>
              <IonCol size="6">
                <IonImg class="img-list" src="./assets/logo.png"/>
                <p className='textImg'>Calculadora</p>
                <p className='textContacto'>Contactar</p>
              </IonCol>
            </IonRow>
          </IonGrid>

        </IonItem>
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
