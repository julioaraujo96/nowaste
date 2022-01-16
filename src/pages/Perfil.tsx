import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonTitle, IonToolbar, iosTransitionAnimation, useIonAlert } from '@ionic/react';
import { pin } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Perfil.css';
import { CallNumber } from '@awesome-cordova-plugins/call-number';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { trash , call, create} from 'ionicons/icons';

const Perfil: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([])
  const [anunciodata, setAnuncioData] = useState<any>([])
  const [showModal, setShowModal] = useState(false);
  const [contacto, setContacto] = useState('');
  const [alerta] = useIonAlert();

  const API_URL = 'https://nowaste2021.herokuapp.com/';

  useEffect(() => {
    handleAnuncios()
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.post('https://nowaste2021.herokuapp.com/meu_perfil',{token:localStorage.getItem('token')});
        if (response.Code === 401 || response.Code === 400) {
         return alerta('O token está em falta!', [{ text: 'Ok', handler: () => { window.location.href = "/login" } }]);
        }
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error);
       
      }
      setLoading(false);
    };
    fetchData();
  }, []);

 



  const handleAnuncios = () => {
      const fetchData = async () =>{
        setLoading(true);
        try {
          const {data: response} = await axios.post('https://nowaste2021.herokuapp.com/meus_anuncios/',{token:localStorage.getItem('token')});
          if (response.Code === 401 || response.Code === 400) {
           return alerta('O token está em falta!', [{ text: 'Ok', handler: () => { window.location.href = "/login" } }]);
          }
          setAnuncioData(response);
          console.log(response);
        } catch (error) {
          console.error(error);
         
        }
        setLoading(false);
      };
      fetchData();
    }
   

  const handleDelete = (id: number) => {
    axios({
      method: "post",
      url: API_URL + 'apagar_anuncio',
      headers: {},
      data: {
         token:localStorage.getItem('token'),
         id:id
      },
  })
      .then(info => {
       if (info.status === 200) {
        alerta('O anúncio foi apagado!', [{ text: info.statusText, handler: () => { window.location.reload()} }]);
         handleAnuncios()
       }
  }
      )}

  const handleEditarContacto = (contacto: string) => {

    if (contacto.length !== 9 ) {
     return  alerta('O contacto não tem 9 digitos!', [{ text: 'ok', handler: () => { setShowModal(false);} }]);
    }
    axios({
      method: "post",
      url: API_URL + 'atualizar_utilizador',
      headers: {},
      data: {
         token:localStorage.getItem('token'),
         contacto:parseInt(contacto)
      },
  })
      .then(info => {
       if (info.status === 200) {
         setShowModal(false);
        alerta('O contacto foi alterado!', [{ text: info.statusText, handler: () => { window.location.reload()} }]);
       }
  }
      )}

      function Call(contacto:any)
      {
      CallNumber.callNumber(contacto, true);
      }  

      function reverse(s:string){
        return s.split('-').reverse().join('-');
    }
  return (
    <IonPage>
      <IonContent fullscreen>
          <IonTitle className="pageTitle">Perfil</IonTitle>
        <div className="container">
          <div className="info-perfil">
            <img src="./assets/logo.png" alt="Perfil"></img>
            <h1>{loading ? 'loading...' : data?.nome}</h1>   
          </div>

          <div className='container-contactos'>
            <p>Contacto</p>
            <p className="textHigh space" onClick={() => Call(data.contacto)}>{loading ? 'loading...' : data?.contacto} <IonIcon className="addcolor"icon={call}/></p>
            <p className="textData space textEdit" onClick={() => setShowModal(true)}>Editar<IonIcon className="addcolor marginText"icon={create}/></p>
          </div>

          <IonModal
          isOpen={showModal}

          swipeToClose={true}
          onDidDismiss={() => setShowModal(false)}>
                    <IonInput className="inputContacto" type="text" placeholder="Novo contacto" value={contacto} onIonChange={(e) => setContacto(e.detail.value!)} required />
                    <IonRow>
                        <IonButton className="buttonLogin" type="submit" onClick={() => handleEditarContacto(contacto)}>Editar Contacto</IonButton>
                    </IonRow>
        </IonModal>

          <div className='container-ultimosanuncios'>
            <h1>Últimos Anúncios</h1>
          </div>

          <div className="container-anuncios">
            {loading && <div>loading...</div>}
            {!loading && (
                <div className="wrapper" >
                  {anunciodata.map((item: any) => ( <div  key={item.id} className='anuncios'>
                                                <img src="./assets/logo.png" className="img-anuncio" alt="Perfil"></img>
                                                <p className="textHigh">{item.titulo}</p>
                                                <p>Descrição: {item.descricao}</p>
                                                <p>Localização: {item.localizacao}</p>
                                                <p className="textData">{reverse(item.datacriacao)}</p>
                                                <p className='textClose' onClick={() => handleDelete(item.id)}>Remover anúncio <IonIcon className="removeColor"icon={trash}/></p>
                                             </div>
                  ))}
                </div>
            )}
           
          </div>

        </div>
      
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
