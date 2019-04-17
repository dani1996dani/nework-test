import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//a component that is rendered once for each room in the room selection screen.
const RoomItem = ({ room, onPress }) => {
    const { containerStyle, roomTitleStyle } = styles;
    const {id, name } = room;

    return(
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={roomTitleStyle}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    containerStyle: {
        height: 100,
        margin: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
        shadowColor:'black',
        shadowOpacity: 0.2,
        shadowOffset: {width:0, height: 2},
        backgroundColor:'white',
        alignItems:'center',
        justifyContent: 'center'
    },
    roomTitleStyle:{
        fontSize:20,
        fontWeight:'600',
        paddingTop:5,
        color: 'black'
    }
}

export default RoomItem;