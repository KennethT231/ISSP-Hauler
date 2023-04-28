import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import SearchByService from '../../components/SearchByService/SearchByService';
import SearchByLocation from '../../components/SearchByLocation/SearchByLocation';
import PostsList from '../../components/PostList/PostList'
import { Context } from '../../context/ContextProvider'
import { useIsFocused } from "@react-navigation/native";
import { getAllPosts, getPostsByIdAndLocation, getPostsByIdAndService,markJobComplete} from '../../../network';


export default function MyPostList({ navigation }) {
    const { currentUser } = useContext(Context)
    const isFocused = useIsFocused();

    const [location, setLocation] = useState('')
    const [service, setService] = useState('')
    const [posts, setPosts] = useState('')

    const searchService = async (value) => {
        if(service === null || service === ''){
            const posts = await getAllPosts(currentUser.uid)
            setPosts(posts)
        } else {
            const posts = await getPostsByIdAndService(currentUser && currentUser.uid, value.service)
            setPosts(posts)
        }
        //setPosts(posts)
    }

    const searchLocation = async (value) => {
        if(location === null || location === ''){
            const posts = await getAllPosts(currentUser.uid)
            setPosts(posts)
        } else {
            const posts = await getPostsByIdAndLocation(currentUser && currentUser.uid, value.location)
            setPosts(posts)
        }
    }
    
    const onActiveImagePress = async (value) => {
        navigation.navigate('PostDetails', {postId: value.postId})
    }

    const onAcceptedDetails = async (value) => {
        navigation.navigate('PostDetails', {postId: value.postId})
    }

    const onOffersPress = async (value) => {
        navigation.navigate('JobOffers', {postId: value.postId})
    }

    const onTrackPress = async (value) => {
        navigation.navigate('TrackingMap', {post: value.post})
    }

    const onCompletePress = async (value) => {
        console.log(value)
        Alert.alert(
            "Alert",
            "Comfirm the driver picked up load",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Continue",
               onPress: async() =>{
                await markJobComplete(value.postId)
                navigation.navigate('Confirmation',{confirm:'complete'})
            }}
            ]
          );
    }

    useEffect(() => {
        currentUser &&
            (async () => {
                const posts = await getAllPosts(currentUser.uid)
                setPosts(posts)
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
                onActiveImagePress={onActiveImagePress}
                onAcceptedDetails={onAcceptedDetails}
                onOffersPress={onOffersPress}
                onTrackPress={onTrackPress}
                onCompletePress= {onCompletePress}
                navigation={navigation}
            />
        </View>
    )
};

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
