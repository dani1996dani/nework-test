import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from '../common'

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