import { IonContent, IonHeader, IonPage, IonTitle, IonText, IonRow, IonToolbar, IonInput, IonRouterLink, IonButton, useIonAlert, IonCol } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const API_URL = 'https://nowaste2021.herokuapp.com/';
    const [alerta] = useIonAlert();

    localStorage.removeItem("token");

    const handleLogin = (userEmail: string, userPassword: string) => {
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
                <div className="container">
                    <h1 className="titleLogin">Login</h1>
                    <IonInput className="inputLogin" type="text" placeholder="Email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
                    <IonInput className="inputLogin" type="password" placeholder="Password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
                    <IonRow>
                        <IonButton className="buttonLogin" type="submit" onClick={() => handleLogin(email, password)}>Login</IonButton>
                    </IonRow>
                    <IonRow>
                        <IonButton className="buttonRegisto" type="button" href="./registo">Registo</IonButton>
                    </IonRow>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Login;