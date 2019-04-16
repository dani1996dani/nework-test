import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, Input, Button } from '../common';
import RoomItem from '../RoomItem';
import firebase from 'firebase';


class RoomSelection extends Component{

    state = {
        rooms: []
    }

    componentWillMount(){
        let roomRef = firebase.database().ref('rooms');
        roomRef.once('value').then(function(snapshot) {
            //console.log(snapshot.val());
            let snapObject = snapshot.val();

            let roomArray = [];
            for (let key in snapObject) {
                if (snapObject.hasOwnProperty(key)) {
                    roomArray.push(snapObject[key]);
                }
            }
            //console.log(roomArray);
        });
    }

    render(){
        return(
            <ScrollView style={{flex: 1}}>
                <RoomItem/>
                <RoomItem/>
                <RoomItem/>
                <RoomItem/>
                <RoomItem/>
                <RoomItem/>
                <RoomItem/>
            </ScrollView>
        );
    }
}

export default RoomSelection;