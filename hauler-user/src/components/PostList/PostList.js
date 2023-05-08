import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Card, Badge, Button } from 'react-native-elements';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteOnePost } from '../../../network';
// import firebase from '../../api/firebase';
import { Context } from '../../context/ContextProvider';

// List of posts at the home screen
export default function PostsList({ posts, onActiveImagePress, onOffersPress, onAcceptedDetails, onTrackPress, onCompletePress, navigation }) {
    const [error, setError] = useState('');
    const { currentUser } = useContext(Context)
    //console.log(currentUser.uid)

    const swipeableRef = useRef(null);
    // console.log('ref!!', swipeableRef.current)

    const onDeletePress = async (postId, imageUri) => {
        setError('');
        try {
            // Delete the image from Firebase Storage
            // const regex = /%2..*%2F(.*?)\?alt/;
            // const match = imageUri.match(regex);
            // const fileName = match ? match[1] : null;

            // if (fileName) {
            //     const imageRef = firebase.storage().ref().child(`junk-post-image/${currentUser.uid}/${fileName}`);
            //     await imageRef.delete();
            // }

            // Delete the post from the database
            const res = await deleteOnePost(postId);
            if (res === "Post deleted") {
                navigation.navigate('Confirmation', { confirm: 'delete' });
            } else {
                setError(res);
            }
            console.log('delete post', postId);
        } catch (e) {
            console.log(e.message);
            setError('Error deleting post');
        }
    }


    const handleSwipeableOpen = (postId, imageUri) => {
        swipeableRef.current?.close();
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        // call the delete post API here
                        onDeletePress(postId, imageUri);
                    },
                },
            ],
        );
    };
    const renderRightActions = (postId, imageUri) => (
        <TouchableOpacity
            onPress={() => handleSwipeableOpen(postId, imageUri)}
            style={styles.rightAction}>
            <MaterialIcons
                name="delete"
                size={35}
                color="red"
                style={styles.actionIcon}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    console.log('item', item)
                    return (
                        item && (
                            // conditionally render the swipeable component dependending on the status of the post
                            item.status === 'Available' ? (
                                <Swipeable
                                    ref={swipeableRef}
                                    renderRightActions={() => renderRightActions(item._id, item.loadImages[0].imageUrl)}
                                    overshootRight={false}>
                                    <View style={styles.cardContainer}>
                                        <Card containerStyle={{ borderRadius: 10, padding: 10 }}>
                                            {(item.response.length > 1) && (item.status === 'Available' || item.status === 'Negotiating') ?
                                                <Badge
                                                    badgeStyle={{ display: 'flex' }}
                                                    status="success"
                                                    value={item.response.length - 1}
                                                    containerStyle={{ position: 'absolute', top: -20, left: -20 }}
                                                /> :
                                                <View></View>}
                                            <TouchableOpacity
                                                onPress={() => { item.status === 'Available' ? onActiveImagePress({ postId: item._id }) : onAcceptedDetails({ postId: item._id }) }}
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
                                                        {(item.status === 'Awaiting Payment') ?
                                                            <View style={styles.statusButton}>
                                                                <Button
                                                                    buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                    onPress={() => navigation.navigate('PaymentNavigator', { screen: 'Payment1', params: { post: item } })}
                                                                    title="PAY NOW"
                                                                />
                                                                <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                            </View> :
                                                            (item.status === 'In Progress') ?
                                                                <View style={styles.statusButton}>
                                                                    <Button
                                                                        buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                        onPress={() => onTrackPress({ post: item })}
                                                                        title='Track'
                                                                    />
                                                                    <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                                </View> :
                                                                (item.status === 'Driver Arrived') ?
                                                                    <View style={styles.statusButton}>
                                                                        <Button
                                                                            buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                            onPress={() => onCompletePress({ postId: item._id })}
                                                                            title='Complete'
                                                                        />
                                                                        <Text style={[styles.cardText, styles.statusText]}>Process Payment</Text>
                                                                    </View> :
                                                                    (item.status === 'Complete') ?
                                                                        <View style={styles.statusButton}>
                                                                            <Button
                                                                                buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 110 }}
                                                                                disabled={true}
                                                                                title='Completed'
                                                                            />
                                                                            <Text style={[styles.cardText, styles.statusText]}>Job Completed</Text>
                                                                        </View>
                                                                        : ((item.response.length > 1) ?
                                                                            <View style={styles.statusButton}>
                                                                                <Button
                                                                                    buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                                    onPress={() => onOffersPress({ postId: item._id })}
                                                                                    title={item.status === 'Negotiating' ? 'See Offers' : `$ ${item.acceptedPrice}`}
                                                                                />
                                                                                <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                                            </View> :
                                                                            <View>
                                                                                <Button
                                                                                    buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                                    onPress={() => onActiveImagePress({ postId: item._id })}
                                                                                    title={`$ ${item.price}`}
                                                                                />
                                                                                <Text style={[styles.cardText, styles.statusText]}>Job Posted</Text>
                                                                            </View>
                                                                        )
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>
                                </Swipeable>
                            ) : (
                                // if the post is not available, then render the card without the swipeable component
                                <View style={styles.cardContainer}>
                                    <Card containerStyle={{ borderRadius: 10, padding: 10 }}>
                                        {(item.response.length > 1) && (item.status === 'Available' || item.status === 'Negotiating') ?
                                            <Badge
                                                badgeStyle={{ display: 'flex' }}
                                                status="success"
                                                value={item.response.length - 1}
                                                containerStyle={{ position: 'absolute', top: -20, left: -20 }}
                                            /> :
                                            <View></View>}
                                        <TouchableOpacity
                                            onPress={() => { item.status === 'Available' ? onActiveImagePress({ postId: item._id }) : onAcceptedDetails({ postId: item._id }) }}
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
                                                    {(item.status === 'Awaiting Payment') ?
                                                        <View style={styles.statusButton}>
                                                            <Button
                                                                buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                onPress={() => navigation.navigate('PaymentNavigator', { screen: 'Payment1', params: { post: item } })}
                                                                title="PAY NOW"
                                                            />
                                                            <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                        </View> :
                                                        (item.status === 'In Progress') ?
                                                            <View style={styles.statusButton}>
                                                                <Button
                                                                    buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                    onPress={() => onTrackPress({ post: item })}
                                                                    title='Track'
                                                                />
                                                                <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                            </View> :
                                                            (item.status === 'Driver Arrived') ?
                                                                <View style={styles.statusButton}>
                                                                    <Button
                                                                        buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                        onPress={() => onCompletePress({ postId: item._id })}
                                                                        title='Complete'
                                                                    />
                                                                    <Text style={[styles.cardText, styles.statusText]}>Process Payment</Text>
                                                                </View> :
                                                                (item.status === 'Complete') ?
                                                                    <View style={styles.statusButton}>
                                                                        <Button
                                                                            buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 110 }}
                                                                            disabled={true}
                                                                            title='Completed'
                                                                        />
                                                                        <Text style={[styles.cardText, styles.statusText]}>Job Completed</Text>
                                                                    </View>
                                                                    : ((item.response.length > 1) ?
                                                                        <View style={styles.statusButton}>
                                                                            <Button
                                                                                buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                                onPress={() => onOffersPress({ postId: item._id })}
                                                                                title={item.status === 'Negotiating' ? 'See Offers' : `$ ${item.acceptedPrice}`}
                                                                            />
                                                                            <Text style={[styles.cardText, styles.statusText]}>{item.status}</Text>
                                                                        </View> :
                                                                        <View>
                                                                            <Button
                                                                                buttonStyle={{ borderRadius: 10, backgroundColor: '#0077FC', width: 100 }}
                                                                                onPress={() => onActiveImagePress({ postId: item._id })}
                                                                                title={`$ ${item.price}`}
                                                                            />
                                                                            <Text style={[styles.cardText, styles.statusText]}>Job Posted</Text>
                                                                        </View>
                                                                    )
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                </View>
                            )

                        )
                    )
                }}
            />
            <Text > {error && alert(error)}</Text>
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
    },
    actionIcon: {
        width: 30,
        height: 30,
    },
    rightAction: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
    },

})

