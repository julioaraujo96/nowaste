import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, iosTransitionAnimation } from '@ionic/react';
import { pin } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
          <IonTitle className="pageTitle">Perfil</IonTitle>
        <div className="container containerForm">
          <div className="info-perfil">
            <img src="./assets/logo.png" alt="Perfil"></img>
            <h1>Arminda Silva</h1>   
          </div>

          <div className='container-contactos'>
            <p>Contacto</p>
            <p>910000777</p>
          </div>

          <div className='container-ultimosanuncios'>
            <h1>Últimos Anúncios</h1>
          </div>

          <div className="container-anuncios">
            <a href="#" className='anuncios'>
              <img src="./assets/logo.png" className="img-anuncio" alt="Perfil"></img>
              <p>Nome</p>
              <p>Descrição</p>
            </a>
            <a href="#" className='anuncios'>
              <img src="./assets/logo.png" className="img-anuncio" alt="Perfil"></img>
              <p>Nome</p>
              <p>Descrição</p>
            </a>
          </div>

        </div>
      
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
