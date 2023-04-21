import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { deleteOnePost, getOnePost, getOneServiceProvider } from '../../../network';
import { Context } from '../../context/ContextProvider';
import PostInfo from '../../components/PostInfo/PostInfo';
import { Card, Avatar, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function PostDetails({ navigation, route }) {
    const { currentUser } = useContext(Context)

    const [posts, setPosts] = useState('')
    const [error, setError] = useState('')
    const [serviceProvider, setServiceProvider] = useState('')

    const { postId } = route.params;

    const onEditPressed = () => {
        if (posts.service === "Junk") {
            navigation.navigate('AddJunkNavigator', { screen: 'AddItemScreen', params: { operation: "edit", postId: posts._id } })
        }
        else if (posts.service === "Moving") {
            navigation.navigate('ErrandNavigator', { screen: 'ErrandPost1', params: { service: "Moving", operation: "edit", postId: posts._id } })
        }
        else if (posts.service === "Errand") {
            navigation.navigate('ErrandNavigator', { screen: 'ErrandPost1', params: { service: "Errand", operation: "edit", postId: posts._id } })
        }
    }

    const onDeletePress = async () => {
        setError('')
        const res = await deleteOnePost(postId)
        if (res === "Post deleted") {
            navigation.navigate('Confirmation', { confirm: 'delete' })
        } else {
            setError(res)
        }
    }
    const onCallPress = () => {
        console.log("call pressed")
    }

    useEffect(() => {
        (async () => {
            setError('')
            const post = await getOnePost(postId)
            setPosts(post)
            if (post.status === "In Progress") {
                const res = await getOneServiceProvider(post.acceptedServiceProvider)
                setServiceProvider(res)
            }
        })()
    }, [])

    const postComponent = () => {
        if (!! posts ){
        return (
            <PostInfo
                image=''
                selectedweight={posts.loadWeight}
                selectedquantity={posts.numberOfItems}
                postHeading={posts.postHeading}
                description={posts.postDescription}
                pickUpAddress={posts.pickUpAddress}
                pickContactPerson={posts.pickUpContactPerson}
                pickUpPhoneNumber={posts.pickUpContactNumber}
                pickUpSpecialInstructions={posts.pickUpSpecialInstruction}
                sliderValue={posts.price}
                dropOffAddress={posts.dropOffAddress && posts.dropOffAddress}
                dropOffContactPerson={posts.dropOffContactPerson && posts.dropOffContactPerson}
                dropOffContactNumber={posts.dropOffContactNumber && posts.dropOffContactNumber}
                dropOffSpecialInstruction={posts.dropOffSpecialInstruction && posts.dropOffSpecialInstruction}
                distance={posts.distance && posts.distance}
            />
        )
        }
        return

    }
    return (
        <ScrollView>
            <View style={styles.container}>
                {posts && serviceProvider ?
                    <View>
                        <Text style={styles.title}>Service Provider Info</Text>
                        <Card containerStyle={{ borderRadius: 10, padding: 10, marginBottom: 10 }}>
                            <View style={styles.cardContent}>
                                <Avatar
                                    rounded
                                    title='name'
                                    size='large'
                                    source={{
                                        uri:
                                            serviceProvider.profilePicUrl,
                                    }}
                                />
                                <View style={styles.infoContainer}>
                                    <Text>{serviceProvider.firstName} {serviceProvider.lastName}</Text>
                                    <Text>{serviceProvider.vehicleType[0].vehicle}</Text>
                                    <Text>
                                        {[...Array(serviceProvider.stars)].map((e, i) =>
                                            <View key={i}>
                                                <FontAwesome name='star' size={18} color='#FCC742' />
                                            </View>
                                        )
                                        }
                                    </Text>
                                </View>
                                <View style={styles.phoneButton}>
                                    <Button
                                        buttonStyle={{ borderRadius: 10, backgroundColor: 'white' }}
                                        onPress={() => onCallPress()}
                                        title={<Text style={styles.iconStyle}><Feather name='phone' size={24} color='white' /></Text>}
                                    />
                                </View>
                            </View>

                        </Card></View> : <View></View>}
                {postComponent()}
                {posts && posts.status === "Active" ?
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.editButton]}
                            onPress={() => onEditPressed()}>
                            <Text style={styles.buttonTitle}>EDIT POST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={() => onDeletePress()}>
                            <Text style={styles.buttonTitle}>DELETE POST</Text>
                        </TouchableOpacity>
                    </View>
                    : <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => navigation.navigate('MyPostList')}
                    >
                    <Text style={styles.buttonTitle}>My Post List</Text>
                </TouchableOpacity>

                }

                <Text > {error && alert(error)}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: '2%',
        width: '100%',
        minHeight: 600,
        paddingVertical: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginTop: 30
    },
    button: {
        marginVertical: 10,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '46%',
        marginHorizontal: '2%',
    },
    editButton: {
        backgroundColor: '#0077FC',
    },
    deleteButton: {
        backgroundColor: '#DE0303',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    title: {
        marginHorizontal: 10,
        color: '#A9A9A9',
        width: 140,
    },
    cardContent: {
        flexDirection: 'row',
    },
    infoContainer: {
        marginLeft: 20,
        width: '50%'
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    iconStyle: {
        backgroundColor: '#0077FC',
        borderRadius: 50,
        padding: 10,
        overflow: 'hidden'
    },
    phoneButton: {
        marginLeft: '6%'
    },
    listButton:{
        backgroundColor: '#0077FC',
        marginVertical: 10,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginHorizontal: '5%',
    }
})