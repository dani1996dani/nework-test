import React from 'react';
import { View } from 'react-native';

const Card = (props) => (
        <View style={style.containerStyle}>
            {props.children}
        </View>
    );

const style = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ccc',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 2 },
        eleavtion: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    }
};


export { Card };
