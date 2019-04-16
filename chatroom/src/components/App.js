import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import Login from './scenes/Login';
import RoomSelection from './scenes/RoomSelection';
import Init from './scenes/Init';
class App extends Component {

    componentWillMount() {
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
                    </Scene>

                </Scene>
            </Router>
        );
    }
}

export default App;