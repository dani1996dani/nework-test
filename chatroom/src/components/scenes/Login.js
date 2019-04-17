import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from '../common'

import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class Login extends Component {

    state = {
        email: '',
        password: '',
        uiLocked: false,
        error: ''
    }

    setEmailState = (email) => {
        this.setState({ email: email });
    }
    setPasswordState = (password) => {
        this.setState({ password: password });
    }

    //notifys the user of a login error.
    loginError = (error) => {
        this.unlockUI();
        this.setState({
            error: 'Login failed. Wrong credentials'
        });
    }

    //sends the user to the room selection screen.
    loginSuccess = () => {
        Actions.chatGroup();
    }

    //sends the user to the room selection screen.
    signupSuccess = (data) => {
        Actions.chatGroup();
    }

    signupError = (error) => {
        this.unlockUI();
        this.setState({
            error: error.message
        });
    }

    //lock ui so the user will not alter the data while some long operation happens.
    lockUI = () => {
        this.setState({
            uiLocked: true,
            error: ''
        });
    }
    //unlock the ui so the user can use it again.
    unlockUI = () => {
        this.setState({
            uiLocked: false
        });
    }

    //attempting to login. the ui will be locked while doing so, and a spinner will be displayed.
    loginAttempt = () => {
        this.lockUI();
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password).
            then(this.loginSuccess.bind(this)).catch(this.loginError.bind(this));
    }

    //attempting to sign up.
    signupAttempt = () => {
        this.lockUI();
        const { email, password } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password).
            then(this.signupSuccess.bind(this)).catch((error) => { this.signupError(error); });
    }

    //conditional rendering - if the ui is locked - show a spinner to notify the user of an action happening in the background. 
    //Otherwise show the login and signup buttons.
    renderButtons = () => {
        if (this.state.uiLocked)
            return (
                <CardSection>
                    <Spinner />
                </CardSection>
            );
        return (
            <CardSection>
                <Button onPress={() => { this.loginAttempt(); }}>Login</Button>
                <Button onPress={() => { this.signupAttempt(); }}>Signup</Button>
            </CardSection>
        );
    }

    //shows the user an error if an error occured.
    renderError = () => {
        if (this.state.error) {
            return (
                <CardSection>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'red' }}>{this.state.error}</Text>
                    </View>
                </CardSection>);
        } else {
            return null;
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input editable={!this.state.uiLocked} placeholder='user@gmail.com' onChangeText={(email) => { this.setEmailState(email); }} value={this.state.email} label="Email"></Input>
                </CardSection>
                <CardSection>
                    <Input editable={!this.state.uiLocked} secure={true} placeholder='password' onChangeText={(password) => { this.setPasswordState(password); }} value={this.state.password} label="Password"></Input>
                </CardSection>

                {this.renderButtons()}
                {this.renderError()}
            </Card>
        );
    }
}

export default Login;