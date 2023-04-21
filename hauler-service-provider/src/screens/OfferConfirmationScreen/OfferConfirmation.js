import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function OfferConfirmation({navigation, route}) {
    const { confirm } = route.params;
    
    const message = () => {
        if (confirm === 'offer') {
            return (
                <Text style={styles.heading1}>Offer Sent Successfully!!!</Text>
            )
        }
        else {
            return (
                <Text style={styles.heading1}>Offer Declined!!!</Text>
            )
        }
    }

    const onReturnToHomePressed = async () => {
        navigation.navigate('Home')
    }

    const onReturnToSearchPressed = () => {
        navigation.navigate('SearchJobsNavigator', {screen:'SearchJobs'})
    }

    const onReturnToJobListPressed = () =>{
        navigation.navigate('MyJobListNavigator', {screen:'MyJobList'})
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/icon.png')} style={styles.logo} />
            {message()}
            <Text style={styles.heading2}>Thank you!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onReturnToHomePressed()}>
                <Text style={styles.buttonTitle}>RETURN TO HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onReturnToSearchPressed()}>
                <Text style={styles.buttonTitle}>RETURN TO SEARCH</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onReturnToJobListPressed()}>
                <Text style={styles.buttonTitle}>RETURN TO MY JOBS</Text>
            </TouchableOpacity>

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
    heading1:{
        marginTop: 50,
        fontSize: 30
    },
    heading2:{
        marginVertical: 20,
        fontSize: 20
    },
    message:{
        fontSize: 18,
        marginBottom: 20,
        color: '#A9A9A9'
    },
    button: {
        backgroundColor: '#0077FC',
        width: '90%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
})

