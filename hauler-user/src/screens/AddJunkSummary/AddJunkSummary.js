import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { postItem, updateOnePost } from '../../../network';
import PostInfo from '../../components/PostInfo/PostInfo';
import { Context } from '../../context/ContextProvider';
import firebase from '../../api/firebase';

// Post A Job Summary Screen - Summary page of the post a job process
export default function AddJunkSummary({ navigation, route }) {

    const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, pickContactPerson, pickUpPhoneNumber, pickUpSpecialInstructions, pickUpCity,
        pickUpAddressLat, pickUpAddressLng, sliderValue, operation, postId } = route.params;

    const service = "Junk"
    const { currentUser } = useContext(Context)

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    const uploadImage = async () => {
        try {
            if (!image) {
                return null; // if no image is selected, return null
            }
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`junk-post-image/${currentUser.uid}${image.uri.substring(image.uri.lastIndexOf('/') + 1)}`);
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
            );
            console.log(currentUser.uid)
            setIsLoading(false); // set isLoading to false to hide the loading indicator
            navigation.navigate('Confirmation', { confirm: 'Post' })
        } catch (err) {
            Alert.alert('Error', 'Please login to post a job');
            navigation.navigate('Signin')
            console.log('onPostJobSubmitted error:', err.message);
        } finally {
            setIsLoading(false); // set isLoading back to false to hide the loading indicator
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {isLoading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    : (
                        <>
                            <PostInfo
                                postHeading={postHeading}
                                description={description}
                                pickUpAddress={pickUpAddress}
                                image={image}
                                selectedweight={selectedweight}
                                selectedquantity={selectedquantity}
                                pickContactPerson={pickContactPerson}
                                pickUpPhoneNumber={pickUpPhoneNumber}
                                pickUpSpecialInstructions={pickUpSpecialInstructions}
                                sliderValue={sliderValue}
                                dropOffAddress=''
                                junkSummaryRoute={route}
                            />
                            {operation === "create" ?
                                <TouchableOpacity style={styles.button}
                                    onPress={onPostJobSubmitted}>
                                    <Text style={styles.buttonTitle}>Post a Job</Text>
                                </TouchableOpacity>
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
        backgroundColor: '#f0f0f0',
        flex: 1,
        width: '100%',
        minHeight: 600,
        paddingVertical: 10
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 20,
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

    view: {
        flexDirection: 'row'
    }

})