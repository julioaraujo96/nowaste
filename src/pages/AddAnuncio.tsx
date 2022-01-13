import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonRouterLink, IonInput, IonText, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import { useState } from 'react';
import axios from 'axios'
import './AddAnuncio.css';

const Home: React.FC = () => {

  const API_URL = 'https://nowaste2021.herokuapp.com/';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contacto, setContacto] = useState('');
  const [location, setLocation] = useState('');

  const [alerta] = useIonAlert();

  const handleAddAnuncio = (userEmail: string, userPassword: string) => {
    axios({
        method: "post",
        url: API_URL + 'login',
        headers: {},
        data: {
            email: userEmail.toLowerCase(),
            password: userPassword,
        },
    })
        .then(info => {
            if (undefined != info.data.Token) {
                localStorage.setItem("token", info.data.Token);
                window.location.href = "/home";
            } else {
                alerta('O email ou a password estão errados! Por favor tente outra vez.', [{ text: 'Ok', handler: () => { window.location.reload() } }]);
            }
        })
};

  return (
    <IonPage>
      <IonContent fullscreen>
          <IonTitle className="pageTitle">Criar Anúncio</IonTitle>
        <div className="container containerForm">
          {/* <IonImg src="./assets/logo.png"/>
          <h1>NoWaste</h1> */}
          <IonText className="inputLabel">Título</IonText>
          <IonInput className="inputText" type="text" value={title} onIonChange={(e) => setTitle(e.detail.value!)} required />

          <IonText className="inputLabel">Descrição</IonText>
          <IonInput className="inputText" type="text" value={description} onIonChange={(e) => setDescription(e.detail.value!)} required />

          <IonText className="inputLabel">Contacto</IonText>
          <IonInput className="inputText" type="text" value={contacto} onIonChange={(e) => setContacto(e.detail.value!)} required />

          <IonText className="inputLabel">Localização</IonText>
          <IonInput className="inputText" type="text" value={location} onIonChange={(e) => setLocation(e.detail.value!)} required />
        </div>
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
