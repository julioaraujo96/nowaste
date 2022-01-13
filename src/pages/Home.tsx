import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('https://nowaste2021.herokuapp.com/anuncios');
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
    //   axios.get('https://nowaste2021.herokuapp.com/anuncios').then(resp => {

    //     console.log(resp.data);
    
    //   listItems = 
    //  resp.data.map((d:any) =>    
    //  <IonCol key={d.key} >
    //   <IonImg class="img-list" src="./assets/logo.png"/>
    //   <p className='textImg'>{d.datacriacao}</p>
    //   <p className='textContacto'>Contactar</p>
    // </IonCol>);
    //   });

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
                  {data.map(item => (<div  className="card" key={item.key} >
       <IonImg class="img-list" src="./assets/logo.png"/>
        <p className='textImg'>{item.descricao}</p>
        <p className='textContacto'>Contactar</p>
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
