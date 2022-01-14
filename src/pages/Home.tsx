import { IonContent, IonHeader,   IonIcon,IonPage, IonTitle, IonToolbar, IonImg, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CallNumber } from '@awesome-cordova-plugins/call-number';
import { trash } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([])
  //const API_URL = 'https://nowaste2021.herokuapp.com/';

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('https://nowaste2021.herokuapp.com/anuncios');
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  

  function reverse(s:string){
    return s.split('-').reverse().join('-');
}

function Call(contacto:any)
{
CallNumber.callNumber(contacto, true);
}

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="logotext">
          <IonImg src="./assets/logo.png"/>
          <h1>NoWaste</h1>
        </div>
        <div className="search">
          <h2>Bem-Vindo, o que precisa?</h2>
          <IonSearchbar class="search-bar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </div>

        <IonItem lines="none">
        <IonGrid>
        <h1>Items Disponíveis</h1>
            {loading && <div>Loading</div>}
            {!loading && (
                <div className="wrapper" >
                  {data.map(item => (<div  className="card" key={item.id} >
                                        <IonImg class="img-list" src="./assets/logo.png"/>
                                          <p className='textImg'>{item.descricao}</p>
                                          <p className='textContacto' onClick={() => Call(910000000)}>Contactar</p>
                                          <p className='textData'>Criado em: <span className='textHigh'>{reverse(item.datacriacao)}</span></p>
                                          <p className='textVer'>Ver anúncio</p>
                                      </div>))}
                </div>
            )}
        </IonGrid>

        </IonItem>
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
