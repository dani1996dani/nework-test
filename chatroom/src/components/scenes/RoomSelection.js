import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, Input, Button } from '../common';
import RoomItem from '../RoomItem';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


class RoomSelection extends Component {

    state = {
        rooms: []
    }

    componentDidMount() {
        let roomRef = firebase.database().ref('rooms');
        let thisRef = this;
        roomRef.once('value').then(function (snapshot) {
            //console.log(snapshot.val());
            let snapObject = snapshot.val();
            let roomArray = [];

            for (let key in snapObject) {
                if (snapObject.hasOwnProperty(key)) {
                    roomArray.push(snapObject[key]);
                }
            }
            thisRef.setState({
                rooms: roomArray
            });
        });

    }

    openRoomChat(room){
        Actions.roomChat({room: room,title:room.name+ " Chat"});
    }

    renderRooms() {

        if (this.state.rooms.length == 0)
                return(
                    <View style={{padding:30, justifyContent:'center',alignItems:'center'}}>
                        <Text>Fetching Rooms..</Text>
                    </View>
                );

        return (
            
            this.state.rooms.map((room) => {
                return (
                    <View key={room.id}>
                        <RoomItem onPress={() => {this.openRoomChat(room);}} room={room}/>
                    </View>
                );
            })
        );
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {this.renderRooms()}
            </ScrollView>
        );
    }
}

export default RoomSelection;