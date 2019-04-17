import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import Login from './scenes/Login';
import RoomSelection from './scenes/RoomSelection';
import RoomChat from './scenes/RoomChat';
import Init from './scenes/Init';

import {YellowBox} from 'react-native';

class App extends Component {

    componentWillMount() {

        //using firebase causes a warning to appear (an issue with a timer).
        //According to the internet, this is a known bug, and it doesn't have a solution yet, and supressing the warning is suggested.
        YellowBox.ignoreWarnings(['Setting a timer']);

        const config = {
            apiKey: "AIzaSyCe2f4EizBp_keU4m6UJlRQF-ZhL2pixes",
            authDomain: "nework-test.firebaseapp.com",
            databaseURL: "https://nework-test.firebaseio.com",
            projectId: "nework-test",
            storageBucket: "nework-test.appspot.com",
            messagingSenderId: "113981574782"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                Actions.chatGroup();
            } else {
                Actions.loginGroup();
            }
        });

    }

    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    <Scene key='initGroup' type='reset'>
                        <Scene key='init' component={Init} hideNavBar initial />
                    </Scene>
                    <Scene key='loginGroup' type='reset'>
                        <Scene key='login' component={Login} title='Login / Signup' initial />
                    </Scene>
                    <Scene key='chatGroup' type='reset'>
                        <Scene key='roomSelection' component={RoomSelection} title='Rooms' initial rightTitle='Logout' onRight={() => {firebase.auth().signOut();}} />
                        <Scene key='roomChat' component={RoomChat} title='Chat' rightTitle='Logout' onRight={() => {firebase.auth().signOut();}} />
                    </Scene>

                </Scene>
            </Router>
        );
    }
}

export default App;