import React, { useContext, useState, useRef } from 'react'
import { Text, View, Dimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../context/ContextProvider';
import { postItem, updateOnePost } from '../../../network';
import PostInfo from '../../components/PostInfo/PostInfo'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { GOOGLE_MAP_API } from '@env';
import firebase from '../../api/firebase';

export default function ErrandSummary({ navigation, route }) {
    const { width, height } = Dimensions.get('window');
    const mapView = useRef();
    const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress,
        dropOffAddress, pickContactPerson, pickUpPhoneNumber, pickUpSpecialInstructions,
        dropOffContactPerson, dropOffPhoneNumber, dropOffSpecialInstructions, sliderValue, service, dropOffCity, dropOffAddressLat, dropOffAddressLng, operation, postId, pickUpCity, pickUpAddressLat, pickUpAddressLng } = route.params;

    const { currentUser } = useContext(Context)

    const [error, setError] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [coordinates, setCoordinates] = useState([
        {
            latitude: pickUpAddressLat,
            longitude: pickUpAddressLng,
        },
        {
            latitude: dropOffAddressLat,
            longitude: dropOffAddressLng,
        }
    ])

    const [isLoading, setIsLoading] = useState(false);


    const uploadImage = async () => {
        try {
            if (!image) {
                return null; // if no image is selected, return null
            }
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`errand-moving-post-image/${currentUser.uid}${image.uri.substring(image.uri.lastIndexOf('/') + 1)}`);
            const snapshot = await ref.put(blob);
            return snapshot;
        } catch (e) {
            console.log(e.message);
        }
    };


    const onPostJobSubmitted = async () => {
        setIsLoading(true); // set isLoading to true to display the loading indicator
        try {
            const response = await uploadImage(); // upload image first and get the response
            if (response === null) {
                Alert.alert('Please select an image');
                setIsLoading(false);
                return;
            }
            const image = await response.ref.getDownloadURL(); // then get the image url from the response
            console.log('post image url:', image);
            await postItem(
                currentUser.uid,
                service,
                postHeading,
                description,
                selectedweight,
                selectedquantity,
                image,
                sliderValue,
                pickUpAddress,
                pickUpCity,
                pickUpAddressLat,
                pickUpAddressLng,
                pickContactPerson,
                pickUpPhoneNumber,
                pickUpSpecialInstructions,
                dropOffAddress,
                dropOffCity,
                dropOffAddressLat,
                dropOffAddressLng,
                dropOffContactPerson,
                dropOffPhoneNumber,
                dropOffSpecialInstructions,
                distance
            );
            setIsLoading(false); // set isLoading to false to hide the loading indicator
            navigation.navigate('Confirmation', { confirm: 'Post' })
        } catch (err) {
            Alert.alert('Error', 'Please login to post a job');
            navigation.navigate('Signin')
            console.log('onPostJobSubmitted error:', err);
        } finally {
            setIsLoading(false); // set isLoading to false to hide the loading indicator
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0177FC" />
                    </View>
                    : (
                        <>
                            <PostInfo
                                postHeading={postHeading}
                                description={description}
                                selectedweight={selectedweight}
                                selectedquantity={selectedquantity}
                                pickUpAddress={pickUpAddress}
                                image={image}
                                pickContactPerson={pickContactPerson}
                                pickUpPhoneNumber={pickUpPhoneNumber}
                                pickUpSpecialInstructions={pickUpSpecialInstructions}
                                dropOffAddress={dropOffAddress}
                                dropOffContactPerson={dropOffContactPerson}
                                dropOffContactNumber={dropOffPhoneNumber}
                                dropOffSpecialInstruction={dropOffSpecialInstructions}
                                sliderValue={sliderValue}
                                distance={distance}
                                duration={duration}
                                errandSummaryRoute={route}
                            />
                            <MapView
                                style={styles.map}
                                ref={mapView}
                            >
                                {coordinates.map((coordinate, index) =>
                                    <Marker key={`coordinate_${index}`} coordinate={coordinate}
                                    />
                                )}
                                <MapViewDirections
                                    apikey={GOOGLE_MAP_API}
                                    origin={coordinates[0]}
                                    waypoints={coordinates}
                                    destination={coordinates && coordinates[coordinates.length - 1]}
                                    strokeWidth={3}
                                    strokeColor='#DE0303'
                                    optimizeWaypoints={true}
                                    onReady={result => {
                                        setDistance(result.distance)
                                        setDuration(result.duration)
                                        mapView.current.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: (width / 20),
                                                bottom: (height / 20),
                                                left: (width / 20),
                                                top: (height / 20),
                                            }
                                        }
                                        );
                                    }}
                                    onError={(errorMessage) => {
                                        Alert.alert('Error', 'Please check pick up and drop off address');
                                        console.log(`Error: ${errorMessage}`);
                                    }}
                                />
                            </MapView>
                            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ErrandPost1')}><Text style={styles.buttonTitle}> Edit </Text></TouchableOpacity> */}

                            {operation === "create" ?
                                <TouchableOpacity style={styles.button} onPress={onPostJobSubmitted}
                                ><Text style={styles.buttonTitle}> Post the Job </Text></TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.button}
                                    onPress={async () => {
                                        setError('')
                                        const res = await updateOnePost(
                                            postId,
                                            // service,
                                            postHeading,
                                            description,
                                            selectedweight,
                                            selectedquantity,
                                            imageUrl ? imageUrl : image,
                                            sliderValue,
                                            pickUpAddress,
                                            pickUpCity,
                                            pickUpAddressLat,
                                            pickUpAddressLng,
                                            pickContactPerson,
                                            pickUpPhoneNumber,
                                            pickUpSpecialInstructions,
                                            dropOffAddress,
                                            dropOffCity,
                                            dropOffAddressLat,
                                            dropOffAddressLng,
                                            dropOffContactPerson,
                                            dropOffPhoneNumber,
                                            dropOffSpecialInstructions,
                                            distance,
                                        );
                                        if (res === 'Post updated') {
                                            navigation.navigate('Confirmation', { confirm: 'Edit' })
                                        } else {
                                            setError(res)
                                        }
                                    }}><Text style={styles.buttonTitle}>Submit Edited Post</Text></TouchableOpacity>}
                        </>
                    )}
            </View>
            <Text > {error && alert(error)}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 600,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenHeading: {
        fontSize: 30,
        fontWeight: '500',
        marginLeft: 20
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    imageDisplay: {
        width: 150,
        height: 150,
        margin: 5,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#1970d4',
        alignSelf: 'center',
        marginVertical: 10,
        width: '90%',
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: '#0177FC',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 5
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    text1: {
        color: '#BFBFBF',
        marginLeft: 25,
        fontWeight: 'bold',
        marginTop: 20
    },
    text2: {
        color: 'black',
        marginLeft: 20,
        fontWeight: 'bold',
        marginTop: 20,
        position: 'relative'
    },
    containerMap: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 20
    },
})