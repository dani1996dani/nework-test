import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import axios from 'axios';

import { Actions } from 'react-native-router-flux';
import { View, Text, ScrollView, TextInput } from 'react-native';
import ChatInput from './../ChatInput';
import MessageItem from './../MessageItem';

class RoomChat extends Component {

    state = {
        messages: [],
        myId: '',
        typedMessage: ''
    }

    initMessageListener = () => {
        const roomName = this.props.room.name;
        firebase.messaging().subscribeToTopic(roomName);

        this.messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
            console.log(message.data);
            this.setState({
                messages: [...this.state.messages, message.data]
            });
        });
    }

    componentDidMount() {
        const roomName = this.props.room.name;

        let thisRef = this;
        firebase.messaging().getToken().then(token => {
            //console.log(token);
            thisRef.setState({
                myId: token
            });
        });
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // user has permissions
                    thisRef.initMessageListener();
                } else {
                    // user doesn't have permission
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // User has authorised  
                            thisRef.initMessageListener();
                        })
                        .catch(error => {
                            // User has rejected permissions, send the user back to room selection.
                            Actions.roomSelection();
                        });
                }
            });
        // this.notificationListener = firebase.notifications().onNotification((notification) => {
        //     // Process your notification as required
        //     console.log(notification);
        // });
    }

    componentWillUnmount() {
        //unsubsribe from the topic and nulify the listener (to prevent multiple listeners on re-entrance).
        const roomName = this.props.room.name;
        firebase.messaging().unsubscribeFromTopic(roomName);
        this.messageListener();
    }

    //sends an fcm message to the google servers.
    //
    //usually this would occur on the server-side (due to the face we are exposing the server key here)..
    //however,because this is a test and not a real life application, the message is sent from the client directly.
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
        }).
            then(() => {
                this.setState({
                    typedMessage: ''
                });
            }).
            catch(err => { console.log("Error", err) });


    }

    //rendering the messages in the state, or a welcome screen if no messages were recevied yet.
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