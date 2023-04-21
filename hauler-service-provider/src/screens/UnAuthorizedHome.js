import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function UnAuthorizedHome() {

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/pic1.png')} style={styles.logo} />
            <Text style={styles.heading1}>Welcome to Hauler!</Text>
            <Text style={styles.message}>Your application is under process, please check back later</Text>
            <Text style={styles.heading2}>Thank you!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    logo: {
        width: 200,
        height: 100,
        alignSelf: 'center',
    },
    heading1: {
        marginTop: 50,
        fontSize: 30
    },
    heading2: {
        marginBottom: 20,
        fontSize: 20
    },
    message: {
        fontSize: 18,
        marginVertical: 20,
        color: '#A9A9A9'
    },
})

