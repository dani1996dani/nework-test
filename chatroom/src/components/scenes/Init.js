import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from '../common'


//Show a simple spinner while the app loads up, and decides what screen to show first.
const Init = () => {
    return (
        <View style={styles.containerStyle}>
            <Spinner/>
        </View>
    );
}

const styles={
    containerStyle:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
}

export default Init;