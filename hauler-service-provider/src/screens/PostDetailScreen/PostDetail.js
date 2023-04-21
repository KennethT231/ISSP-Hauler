import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { addServiceProviserResponse, getOnePost, updatePostVisibility } from '../../../network';
import PostInfo from '../../components/postInfo/PostInfo';
import { Context } from '../../context/ContextProvider';

export default function PostDetails({ navigation, route }) {
    const { currentUser } = useContext(Context)

    const [posts, setPosts] = useState('')
    const [error, setError] = useState('')
    const { postId } = route.params;

    const onAccept = async () => {
        setError('')
        res = await addServiceProviserResponse(
            'Awaiting Payment',
            postId,
            currentUser.uid,
            'Accepted',
            true,
            'Accepted',
            posts.price,
            true
        );
        if (res.data === "Response sent") {
            await updatePostVisibility(postId, posts.price, currentUser.uid);
            navigation.navigate('JobConfirmation', { posts: posts, actionPrice: posts.price })
        } else (
            setError(res.data)
        )
    }

    const onOffer = () => {
        navigation.navigate('OfferDetails', { uid: currentUser.uid, postId: postId })
    }

    useEffect(() => {
        (async () => {
            setError('')
            const post = await getOnePost(postId)
            setPosts(post)
        })()
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text > {error && alert(error)}</Text>
                <PostInfo
                    posts={posts}
                    contact= ""
                />
                <View style={styles.priceContainer}>
                    <Text style={styles.infoKey}>Quoted Price</Text>
                    <Text style={styles.infoValue}> ${posts.price}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    onPress={() => onAccept()}>
                    <Text style={[styles.buttonTitle, styles.acceptTitle]}>ACCEPT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.offerButton]}
                    onPress={() => onOffer()}>
                    <Text style={styles.buttonTitle}>OFFER</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '2%',
        width: '100%',
        height: '100%'
    },
    priceContainer: {
        width: '95%',
        flexDirection: 'row',
        marginVertical: 10
    },
    infoKey: {
        color: '#A9A9A9',
        width: 140,
    },
    infoValue: {
        overflow: 'hidden',
        marginRight: 10,
        width: '65%',
        fontWeight: 'bold'
    },
    button: {
        marginVertical: 10,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    acceptButton: {
        backgroundColor: '#E0E0E0',
    },
    offerButton: {
        backgroundColor: '#0077FC',
    },
    buttonTitle: {
        color: 'white',
        fontWeight: "bold"
    },
    acceptTitle:{
        color: 'black'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: '1%',
        marginHorizontal: '2%',
        paddingHorizontal: 10
    },
})