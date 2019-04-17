import React from 'react';
import { View, TextInput,TouchableOpacity, Text } from 'react-native';


const ChatInput = ({ onSend, onChangeText, value }) => {

    const { sendButtonStyle,textInputStyle, buttonTextStyle } = styles;
    return (
        <View style={{marginTop: 15,  justifyContent: 'flex-end' }}>
            <View style={{flexDirection: 'row'}}>
            <TextInput onChangeText={onChangeText} value={value} style={textInputStyle}></TextInput>
            <TouchableOpacity onPress={onSend} style={sendButtonStyle}>
                <Text style={buttonTextStyle}>Send</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    textInputStyle: {
        height: 40,
        width: '80%',
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth:1
    },
    sendButtonStyle:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0184FF',
        borderRadius: 2
    },
    buttonTextStyle:{
        color:'white',
        fontWeight: '500'
    }
}

export default ChatInput;