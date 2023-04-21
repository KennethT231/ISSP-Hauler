import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchByService from '../../components/searchByService/SearchByService';
import SearchByLocation from '../../components/searchByLocation/SearchByLocation';
import PostsList from '../../components/postList/PostList';
import { Context } from '../../context/ContextProvider';
import { getPostsByServiceProviderId, getPostsByServiceProviderAndService, getPostsByServiceProviderIdAndLocation, getResponseByServiseProviderId } from '../../../network';
import { useIsFocused } from "@react-navigation/native";

export default function MyJobList({ navigation }) {
    const { currentUser } = useContext(Context)
    const isFocused = useIsFocused();

    const [posts, setPosts] = useState('')
    const [response, setResponse] = useState('')
    const [location, setLocation] = useState('')
    const [service, setService] = useState('')

    const onViewDetailsPress = (value) => {
        navigation.navigate('PostDetails', { postId: value.postId })
    }

    const onStatusDeailsPress = (value) => {
        value.jobStatus !== 'Available' || value.jobStatus !== 'Negotiating' ?
        navigation.navigate('JobConfirmation', {posts: value.post, actionPrice: value.price}):
        navigation.navigate('StatusDetails', { uid: currentUser.uid, postId: value.postId, jobStatus: value.jobStatus })
    }

    const searchService = async (value) => {
        const posts = await getPostsByServiceProviderAndService(currentUser && currentUser.uid, value.service)
        setPosts(posts)
    }

    const searchLocation = async (value) => {
        const posts = await getPostsByServiceProviderIdAndLocation(currentUser && currentUser.uid, value.location)
        setPosts(posts)
    }
    const onAcceptedDetails = (value) =>{
        navigation.navigate('JobConfirmation', { posts: value.posts, actionPrice: value.posts.acceptedPrice })
    }

    useEffect(() => {
        currentUser &&
            (async () => {
                const posts = await getPostsByServiceProviderId(currentUser.uid)
                setPosts(posts)
                const postIds = [posts.map(a => { return a._id })]

                const newResponse = await Promise.all(postIds[0].map(async (a) => {
                    if (!!a) {
                        return await getResponseByServiseProviderId(currentUser.uid, a);
                    } else { return null }
                }))
                setResponse(newResponse)
            })()
    }, [isFocused])

    return (
        <View style={styles.container}>
            <SearchByLocation
                location={location}
                setLocation={setLocation}
                searchLocation={searchLocation}
            />
            <SearchByService
                service={service}
                setService={setService}
                searchService={searchService}
            />
            <PostsList
                posts={posts}
                onViewDetailsPress={onViewDetailsPress}
                onAcceptedDetails={onAcceptedDetails}
                response={response}
                onStatusDeailsPress={onStatusDeailsPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%'
    }
})
