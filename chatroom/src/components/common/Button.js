import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => (
        <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
            <Text style={styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );

const styles = {
    textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007aff',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#007aff',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5
    }
};

export { Button };
