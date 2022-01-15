import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonRouterLink, IonInput, IonText, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import './registo.css';

const Registo: React.FC = () => {

    localStorage.removeItem("token");
    const API_URL = 'https://nowaste2021.herokuapp.com/';
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConf, setUserPasswordConf] = useState('');
    const [contacto, setContacto] = useState('');
    const [alerta] = useIonAlert();

    const Registo = (funcname: string, funcUserEmail: string, funcUserPw: string, funcUserPw2: string, funcUserNumber: string) => {
        if (!funcname.match(/^[a-zA-z ,.'é-]+$/g)) {
            return alerta('Introduza um nome válido!', [{ text: 'Ok' }]);
        }
        else if (!funcUserEmail.toLowerCase().match(/^\S+@\S+\.\S+$/)) {
            return alerta('Introduza um email válido!', [{ text: 'Ok' }]);
        }
        else if (funcUserPw != funcUserPw2) {
            return alerta('Introduza passwords correspondentes!', [{ text: 'Ok' }]);
        }
        else if (!funcUserPw.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,}$/)) {
            return alerta('Por favor, escolha uma password que contenha no mínimo 8 carateres, entre estes letras e números.', [{ text: 'Ok' }]);
        }
        else if (!funcUserNumber) {
            return alerta('Introduza um contacto válido!', [{ text: 'Ok' }]);
        }
        else {
            axios({
                method: 'POST',
                url: API_URL + 'registar_utilizador',
                data: {
                    nome: funcname.toLowerCase(),
                    email: funcUserEmail.toLowerCase(),
                    password: funcUserPw,
                    contacto: parseInt(funcUserNumber),
                }
            }).then(info => {
                if (200 == info.data["Code"]) {
                    alerta('Registo bem efetuado!', [{ text: 'Ok' }])
                    setInterval(window.location.href = "/login", 1000)
                }
                else if (info.data["Erro"].includes("duplicate key value violates unique constraint")) {
                    alerta('Estes dados já estão registados, por favor faça login!', [{ text: 'Ok' }])
                }
                else {
                    alerta('Algo correu mal!', [{ text: 'Ok' }])
                }
            })
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container">
                    <h1 className="titleRegisto">Registo</h1>
                    <IonInput className="inputRegisto" placeholder="Nome" type="text" value={name} onIonChange={(e) => setName(e.detail.value!)} required />
                    <IonInput className="inputRegisto" placeholder="Email"type="text" value={userEmail} onIonChange={(e) => setUserEmail(e.detail.value!)} required />
                    <IonInput className="inputRegisto" placeholder="Password" type="password" value={userPassword} onIonChange={(e) => setUserPassword(e.detail.value!)} required />
                    <IonInput className="inputRegisto" placeholder="Confirmar Password" type="password" value={userPasswordConf} onIonChange={(e) => setUserPasswordConf(e.detail.value!)} required />
                    <IonInput className="inputRegisto" placeholder="Contacto" type="number" value={contacto} onIonChange={(e) => setContacto(e.detail.value!)} required />
                    <IonRow>
                        <IonButton className="buttonLogin" type="submit" onClick={() => Registo(name, userEmail, userPassword, userPasswordConf, contacto)}>Registar</IonButton>
                    </IonRow>
                    <IonRow>
                        <IonButton className="buttonRegisto" type="button" href="./login">Login</IonButton>
                    </IonRow>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Registo;