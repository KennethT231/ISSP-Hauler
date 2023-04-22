import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default function PostsList({ posts, onViewDetailsPress, response, onStatusDeailsPress, onAcceptedDetails }) {

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        item &&
                        <View style={styles.cardContainer}>
                            <Card containerStyle={{ borderRadius: 10, padding: 10 }}>
                                {/* <Card.Title style={styles.cardTitle}>
                                {item.service}</Card.Title> */}
                                {(response.length > 0) ?
                                    <Badge
                                        badgeStyle={{ display: response[index] && response[index].length>0 && response[index][0].notificationOnServiceProvider }}
                                        status="success"
                                        value={response[index] && response[index].length>0 && response[index][0].serviceProviderResponseSchema[response[index][0].serviceProviderResponseSchema.length - 1].serviceProviderResponse}
                                        containerStyle={{ position: 'absolute', top: -20, left: -30 }}
                                    /> :
                                    <View></View>}
                                <TouchableOpacity
                                    onPress={() => {response[index] && response[index].length>0 && (response[index][0].responseStatus === 'Awaiting Payment')? onAcceptedDetails({ posts: item }): onViewDetailsPress({ postId: item._id })}}
                                >
                                    <Image
                                        style={styles.cardImage} source={{ uri: item.loadImages[0].imageUrl }}
                                    /></TouchableOpacity>
                                <View style={styles.cardTextContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.cardHeadingText}>
                                            {item.postHeading}
                                        </Text>
                                        <Text style={styles.cardText}>
                                            {item.pickUpCity}
                                            {item.dropOffCity &&
                                                <Text style={styles.cardText}> to {item.dropOffCity} ({item.distance} km)
                                                </Text>} 
                                        </Text>
                                    </View>
                                    <View style={styles.cardButton}>
                                        <Text style={styles.cardButtonContainer}>
                                            {(response[index] && response[index].length>0) ?
                                                <View style={styles.statusButton}>
                                                    <Button
                                                        buttonStyle={{ borderRadius: 5, backgroundColor: '#0077FC', width: 100 }}
                                                        onPress={() => onStatusDeailsPress({ postId: item._id, jobStatus: item.status, post: item, price: item.actionPrice})}//make this take you to tracking if its in progress 
                                                        title={`$ ${response[index][0].userResponseSchema.length > 0 ? response[index][0].userResponseSchema[response[index][0].userResponseSchema.length - 1].userResponsePrice : item.price}`}
                                                    />
                                                    <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                </View>
                                                :
                                                <View>
                                                    <Button
                                                        buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                        onPress={() => onViewDetailsPress({ postId: item._id })}
                                                        title={`$${item.price}`}
                                                    />
                                                    <Text style={[styles.cardText, styles.statusText]}>Job Available</Text>
                                                </View>
                                                }
                                            </Text>  
                                    </View>
                                </View>
                            </Card>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 130,
    },
    cardContainer: {
        width: '95%',
        alignSelf: 'center',
        position: 'relative',
        marginTop: 5,
    },
    cardTextContainer: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    textContainer: {
        width: '60%'
    },
    cardButton: {
        width: '40%',
        overflow: 'hidden',
    },
    cardButtonContainer: {
        alignSelf: 'flex-end',
    },
    statusButton: {
        width: '100%'
    },
    cardImage: {
        width: '95%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 10,
    },
    cardText: {
        color: '#A9A9A9',
        fontSize: 12,
    },
    statusText: {
        textAlign: 'center'
    }
})

