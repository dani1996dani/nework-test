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


    loginError = (error) => {
        this.unlockUI();
        this.setState({
            error: 'Login failed. Wrong credentials'
        });
    }

    loginSuccess = () => {
        this.unlockUI();
        console.log("Successfully logged in");
        Actions.chatGroup();
    }

    signupSuccess = (data) => {
        this.unlockUI();
        console.log("Successfully signed up");
        console.log(data);
        Actions.chatGroup();
    }

    signupError = (error) => {
        this.unlockUI();
        console.log(error);
        this.setState({
            error: error.message
        });
    }

    lockUI = () => {
        this.setState({
            uiLocked: true,
            error: ''
        });
    }

    unlockUI = () => {
        this.setState({
            uiLocked: false
        });
    }

    loginAttempt = () => {
        this.lockUI();
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password).
            then(this.loginSuccess.bind(this)).catch(this.loginError.bind(this));
    }

    signupAttempt = () => {
        this.lockUI();
        const { email, password } = this.state;

        //old
        
        // firebase.auth().createUserWithEmailAndPassword(email, password).
        //     then(this.signupSuccess.bind(this)).catch(this.signupError.bind(this));
        

        firebase.auth().createUserWithEmailAndPassword(email, password).
            then(this.signupSuccess.bind(this)).catch((error) => {this.signupError(error);});
    }

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

    renderError = () => {
        if (this.state.error) {
            return (
                <CardSection>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{color:'red'}}>{this.state.error}</Text>
                    </View>
                </CardSection>);
        } else {
            return null;
        }
    }

    render() {
        return (
            <View>
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
            </View>
        );
    }
}

export default Login;