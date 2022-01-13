import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonRouterLink, IonInput, IonText, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import { useState } from 'react';
import axios from 'axios'
import './AddAnuncio.css';
import { info } from 'console';

const Home: React.FC = () => {

  const API_URL = 'https://nowaste2021.herokuapp.com/';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [alerta] = useIonAlert();

  const handleAddAnuncio = (title: string, description: string, location:string) => {
    if (title.length === 0 || description.length === 0 || location.length === 0) {
      return alerta('Preencha todos os campos!', [{ text: 'Ok', handler: () => { window.location.reload()} }]);
    }
    axios({
        method: "post",
        url: API_URL + 'criar_anuncio',
        headers: {},
        data: {
            token: localStorage.getItem('token'),
            titulo: title,
            descricao: description,
            localizacao:location,
            imagem:""
        },
    })
        .then(info => {
          if (info.data.Code === 400) {
            localStorage.removeItem('token');
            alerta('O token expirou!', [{ text: 'Ok', handler: () => { window.location.href = "/login" } }]);
          }

          if (info.data.Code === 200) {
            alerta('O anúncio foi criado!', [{ text: 'Ok', handler: () => { window.location.href = "/home" } }]);
          }
          
        }).catch(function (error) {
          console.log(error);
        });
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

          <IonText className="inputLabel">Localização</IonText>
          <IonInput className="inputText" type="text" value={location} onIonChange={(e) => setLocation(e.detail.value!)} required />
          <IonRow>
             <IonButton className="buttonCreate" type="submit"  onClick={() => handleAddAnuncio(title, description,location)}>Criar Anúncio</IonButton>
          </IonRow>
        </div>
        
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
