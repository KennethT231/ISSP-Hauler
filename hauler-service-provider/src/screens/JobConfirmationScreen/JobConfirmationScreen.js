import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import PostInfo from '../../components/postInfo/PostInfo';
import { markOnePostInProgress } from '../../../network';

export default function JobConfirmation({ navigation, route }) {
    const { posts, actionPrice } = route.params;
    const contact = "show"
    const onJobListPressed = () => {
        navigation.navigate('MyJobListNavigator', { screen: 'MyJobList' })
    }

    const onSearchPressed = () =>{
        navigation.navigate('SearchJobsNavigator', {screen:'SearchJobs'})
    }

    const startRoute = (post) => {
        try {
        markOnePostInProgress(post._id)
        navigation.navigate('MyJobListNavigator', {screen:'LiveTrackingMap', params: {targetPost: post}})
        } catch (err){
            console.log(err)
        }
    }

    const onStartRoutePressed = (post) => {
        try {
            Alert.alert(
                "Alert",
                "This will begin live tracking and notify the customer that you are en route. Continue?",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "Continue", onPress: () => startRoute(post) }
                ]
              );
        
        } catch (err) {
        console.log(err)
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <PostInfo
                    posts={posts}
                    contact={contact}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.infoKey}>Total Earning</Text>
                    <Text style={styles.infoValue}>$ {posts.acceptedPrice ? posts.acceptedPrice : actionPrice}</Text>
                </View>
                { (posts.status === "Paid") &&
                <TouchableOpacity
                    style={[styles.button, styles.startRouteButton]}
                    onPress={() => onStartRoutePressed(posts)}>
                    <Text style={[styles.buttonTitle, styles.listTitle]}>Start Route</Text>
                </TouchableOpacity>
                    }
                <TouchableOpacity
                    style={[styles.button, styles.listButton]}
                    onPress={() => onJobListPressed()}>
                    <Text style={[styles.buttonTitle, styles.listTitle]}>My Job List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSearchPressed()}>
                    <Text style={styles.buttonTitle}>Search More Jobs</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#0077FC',
        marginVertical: 10,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '95%'
    },
    infoKey: {
        color: '#A9A9A9',
        width: 140,
    },
    infoValue: {
        marginRight: 10,
        width: '65%',
        fontWeight: 'bold'
    },
    listButton:{
backgroundColor: '#E0E0E0'
    },
    listTitle:{
        color: 'black'
    },
    startRouteButton: {
backgroundColor: "#06C167"
    }
})