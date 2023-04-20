import React, { useState }from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import SearchByLocation from '../../components/SearchByLocation/SearchByLocation';
import SearchByService from '../../components/SearchByService/SearchByService';
import { Avatar, Card, Button, ListItem } from 'react-native-elements';

export default function ServiceProviderScreen({ navigation }) {

    const [location, setLocation] = useState('')
    const [service, setService] = useState('')

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text>Service Providers List </Text>
                <View style={styles.serviceContainer}>
                    <SearchByService 
                        service={service}
                        setService={setService}
                    />
                    <SearchByLocation 
                        location={location}
                        setLocation={setLocation}
                    />
                    <View style={styles.cardContainer}>
                        <Card>
                            <ListItem> 
                                <Avatar 
                                    size='large'
                                    rounded
                                    source={{uri: 'https://siddharthagarwalclasses.com/wp-content/uploads/2020/05/Human-Face-6.png'}}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>John Doe </ListItem.Title>
                                    <ListItem.Subtitle>Errand</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </Card>

                        <Card>
                            <ListItem> 
                                <Avatar 
                                    size='large'
                                    rounded
                                    source={{uri: 'https://cdn5.vectorstock.com/i/thumb-large/91/29/friendly-smile-on-face-a-guy-vector-27339129.jpg'}}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>Nick Fury </ListItem.Title>
                                    <ListItem.Subtitle>Junk Removal</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </Card>
                    </View>
                    <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Post A Job')} style={styles.button}><Text style={styles.btnText}> Post A Job </Text></TouchableOpacity></View>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    serviceContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '10%',
        width: '100%',
        height: '100%'
    },
    cardContainer: {
        width: '100%',
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#0177FC',
        borderRadius: 20,
        display: 'flex',
        width: '80%'
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        textAlign: 'center'
    },
})