import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Input = (props) => {
    const { containerStyle, textStyle, inputStyle } = styles;
    const { label, placeholder, onChangeText, value, secure, editable } = props;

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{label}</Text>
            <TextInput
                style={inputStyle}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secure}
                editable={editable}
            >

            </TextInput>
        </View>

    );
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
         height: 80,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textStyle: {
        color: 'black',
        fontSize: 18,
        flex: 1,
        paddingTop: 0

    },
    inputStyle: {
        fontSize: 18,
        flex: 2,
        lineHeight: 23,
        justifyContent: 'flex-end',
        textAlign: 'center'

    }
}

export { Input };