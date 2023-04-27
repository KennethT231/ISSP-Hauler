import React from 'react';
import { Text, View, Image } from 'react-native'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Confirmation({ navigation, route }) {
    const { confirm } = route.params;

    const message = () => {
        if (confirm === 'Post') {
            return (
                <Text style={styles.text}>Job Posted Successfully!!!</Text>
            )
        }
        else if (confirm === 'Edit') {
            return (
                <Text style={styles.text}>Post Edited Successfully!!!</Text>
            )
        }
        else if (confirm === 'Offer') {
            return (
                <Text style={styles.text}>Offer Sent Successfully!!!</Text>
            )
        }
        else if (confirm === 'delete') {
            return (
                <Text style={styles.text}>Post Deleted Successfully!!!</Text>
            )
        }
        else if (confirm === 'complete') {
            return (
                <Text style={styles.text}>Job Completed Successfully!!!</Text>
            )
        }
        else {
            return (
                <Text style={styles.text}>Offer Declined!!!</Text>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/Hauler.Mascot.png')} style={styles.imageDisplay} />
            </View>
            <View style={styles.textContainer}>
                {message()}
                <Text style={styles.text}>Thank You!</Text>

            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'MyPostList' })} style={styles.button}><Text style={styles.btnText}>Return To My Job List </Text></TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Post A Job1', { screen: 'AddItemScreen' })} style={styles.button}><Text style={styles.btnText}>Return To Posting a Job </Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        // height: 650,
        paddingVertical: 10
    },
    text: {
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 25,
    },
    button: {
        backgroundColor: '#0177FC',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    imageContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDisplay: {
        width: 300,
        height: 300,
        resizeMode: 'center',
        marginTop: 5,
    },
    textContainer: {
        alignItems: 'center',
    }
})