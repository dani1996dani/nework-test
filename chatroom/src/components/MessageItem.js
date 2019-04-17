import React from 'react';
import { View, Text } from 'react-native';

//a single message item that is displayed in the chat room.
const MessageItem = ({ mine,message }) => {

    const { containerStyle, messageTextStyle, myMessageStyle, othersMessageStyle } = styles;

    return (
        <View style={[containerStyle, mine ? myMessageStyle : othersMessageStyle]}>
            <Text style={messageTextStyle}>{message.message}</Text>
        </View>
    );
}

const styles = {
    containerStyle: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderRadius: 5,
        padding: 15,

        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    myMessageStyle: {
        backgroundColor: '#DCF8C7',
        alignSelf: 'flex-end'

    },
    othersMessageStyle: {
        backgroundColor: 'white',
        alignSelf: 'flex-start'
    },
    messageTextStyle: {
        fontSize: 18,
        color: 'black'
    }
};

export default MessageItem;