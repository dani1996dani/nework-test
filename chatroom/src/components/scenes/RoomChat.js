import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';



import { View, Text, ScrollView, TextInput } from 'react-native';
import { Card, CardSection, Input, Button } from '../common';
import ChatInput from './../ChatInput';
import MessageItem from './../MessageItem';



class RoomChat extends Component {

    state = {
        messages: [],
        myId: '',
        typedMessage: ''
    }

    componentDidMount() {
        const roomName = this.props.room.name;
        //Actions.refresh({"title": roomName});
        let thisRef = this;
        firebase.messaging().getToken().then(token => {
            console.log(token);
            thisRef.setState({
                myId: token
            });
        });
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // user has permissions
                    console.log("has permminsion");
                } else {
                    console.log("doesnt have permminsion");
                    // user doesn't have permission
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // User has authorised  
                        })
                        .catch(error => {
                            // User has rejected permissions  
                        });
                }
            });

        firebase.messaging().subscribeToTopic(roomName);

        this.messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
            console.log(message.data);
            thisRef.setState({
                messages: [...this.state.messages, message.data]
            });
        });

        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            console.log(notification);
        });
    }

    componentWillUnmount() {
        const roomName = this.props.room.name;
        firebase.messaging().unsubscribeFromTopic(roomName);
        this.messageListener();
        console.log("unsubbed from " + roomName);
    }

    sendMessage = () => {
        const date = new Date();
        axios({
            method: 'post',
            url: "https://fcm.googleapis.com/fcm/send",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=AIzaSyBzHWICK73OrrSqwgyyMSwbHHllv48mHjA"
            },
            data: {
                "to": "/topics/" + this.props.room.name,
                "data": {
                    "message": this.state.typedMessage,
                    "senderId": this.state.myId,
                    timeSent: date.getTime()
                }
            }
        }).catch(err => {console.log("Error",err)});

        this.setState({
            typedMessage: ''
        });
    }

    formatTime = (milliseconds) => {

        minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

        return `${hours}:${minutes}`;

    }

    renderMessageItems() {

        if (this.state.messages.length == 0)
            return (
                <View style={{ padding: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Welcome to the {this.props.room.name} Chat!</Text>
                    <Text>New messages will appear here.</Text>
                </View>
            );

        return this.state.messages.map(message => {
            const isMine = (message.senderId === this.state.myId);
            message.formattedTime = this.formatTime(message.timeSent);
            

            return (
                <MessageItem key={message.timeSent} mine={isMine} message={message} />
            );
        });
    }



    render() {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    style={{ flex: 1 }}>

                    {this.renderMessageItems()}

                </ScrollView>
                <ChatInput value={this.state.typedMessage} onChangeText={(text) => { this.setState({ typedMessage: text }); }} onSend={() => { this.sendMessage(); }} />

            </View>
        );
    }
}

export default RoomChat;