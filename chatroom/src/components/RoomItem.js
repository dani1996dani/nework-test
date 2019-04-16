import React from 'react';
import { View, Text } from 'react-native';

const RoomItem = ({ room }) => {
    const { containerStyle } = styles;

    return(
        <View style={containerStyle}>
            <Text>Room Item</Text>
        </View>
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
        alignItems:'center'
    }
}

export default RoomItem;