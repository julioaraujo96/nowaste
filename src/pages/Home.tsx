import { IonContent, IonHeader,   IonIcon,IonPage, IonTitle, IonToolbar, IonImg, IonSearchbar, IonGrid, IonRow, IonCol, IonCard, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CallNumber } from '@awesome-cordova-plugins/call-number';
import { call } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [autor, setAutor] = useState<any[]>([])
  const [numero, setNumero] = useState(0);
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

const  Call = async (contacto:any, id:number) =>
{
  try {
    const data =  await axios.post('https://nowaste2021.herokuapp.com/consultar_perfil',{id:id});
    setNumero(data.data.contacto);
    // setAutor(data.data.nome)
    console.log(data.data.contacto)
    CallNumber.callNumber(data.data.contacto ? data.data.contacto : '91000', true);
  } catch (error) {
    console.error(error);
  }
}

// const  handleNome = async ( id:number) =>
// {
//   try {
//     const data =  await axios.post('https://nowaste2021.herokuapp.com/consultar_perfil',{id:id});
//     if (data.data.id === id ) {
//       setAutor(data.data.nome)
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

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
        <h1>Items Dispon??veis</h1>
            {loading && <div>Loading</div>}
            {!loading && (
                <div className="wrapper" >
                  {data.map(item => (<div  className="card" key={item.id} >
                                        <IonImg class="img-list" src="./assets/logo.png"/>
                                          <p className='textImg'>{item.titulo}</p>
                                          <p className='textImg'>Descri????o: {item.descricao}</p>
                                          <p className='textImg'>Localiza????o: {item.localizacao}</p>
                                          <p className='textContacto' onClick={() => Call(item.contacto,item.utilizador_id)}><span className='spacing'>Contactar</span><IonIcon className="addcolor"icon={call}/></p>
                                          <p className='textData'>Criado em: <span className='textHigh'>{reverse(item.datacriacao)}</span></p>
                                          <p className='textVer'>Ver An??ncio</p>
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
