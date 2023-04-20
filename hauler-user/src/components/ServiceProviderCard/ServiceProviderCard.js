import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

export default function ServiceProviderCard({ post, serviceProviders, onStatusDetailsPress }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={post && post.response.slice(1)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        item &&
                        <View style={styles.cardContainer}>
                            <Card containerStyle={{ borderRadius: 10, padding: 10 }}>
                                <Badge
                                    badgeStyle={{ display: item.notificationOnUser }}
                                    status="success"
                                    value={item.serviceProviderResponseSchema[item.serviceProviderResponseSchema.length - 1] && item.serviceProviderResponseSchema[item.serviceProviderResponseSchema.length - 1].serviceProviderResponse}
                                    containerStyle={{ position: 'absolute', top: -20, left: -30 }}
                                />
                                <View style={styles.cardContent}>
                                    <Avatar
                                        rounded
                                        title='name'
                                        size='large'
                                        source={{
                                            uri:
                                                serviceProviders[index] && serviceProviders[index].profilePicUrl,
                                        }}
                                    />
                                    <View style={styles.infoContainer}>
                                        <Text>{serviceProviders[index] && serviceProviders[index].firstName} {serviceProviders[index] && serviceProviders[index].lastName}</Text>
                                        <Text>{serviceProviders[index] && serviceProviders[index].vehicleType[0].vehicle}</Text>
                                        <Text>
                                            {[...Array(serviceProviders[index] && serviceProviders[index].stars)].map((e, i) =>
                                                <View key={i}>
                                                    <FontAwesome name='star' size={18} color='#FCC742' />
                                                </View>
                                            )
                                            }
                                        </Text>
                                    </View>
                                    <Text style={styles.price}>$ {item.serviceProviderResponseSchema[item.serviceProviderResponseSchema.length - 1] && item.serviceProviderResponseSchema[item.serviceProviderResponseSchema.length - 1].serviceProviderActionPrice}</Text>
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                        onPress={() => onStatusDetailsPress({ serviceProviderId: item.serviceProviderId, postId: post._id })}
                                        title={item.responseStatus}
                                    />
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
    cardContent: {
        flexDirection: 'row'
    },
    infoContainer: {
        marginLeft: 20,
        width: '50%'
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    price: {
        width: '20%',
        textAlign: 'right',
    },
    button: {
        alignSelf: 'flex-end'
    }

})

