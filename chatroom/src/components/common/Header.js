import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
    const { viewStyle, textStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.children}</Text>
        </View>
    );
};

const styles = {
    viewStyle: { 
        height: 60,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        color: '#000'
    }
};

export { Header };
