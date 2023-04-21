import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home({navigation}) {

    const onSearchJobsPressed = async () => {
        navigation.navigate('SearchJobsNavigator')
    }
    const onMyJobListPressed = async () => {
        navigation.navigate('MyJobListNavigator')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onSearchJobsPressed()}>
                <Text style={styles.buttonTitle}>Search Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onMyJobListPressed()}>
                <Text style={styles.buttonTitle}>My Job List</Text>
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
        height: '100%',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#0077FC',
        width: '90%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
})

