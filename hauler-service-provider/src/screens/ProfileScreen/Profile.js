import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import UserInfo from '../../components/userInfo/UserInfo';
import { Context } from '../../context/ContextProvider';
import { getOneServiceProvider, updateOneServiceProvider } from '../../../network';
import firebase from "../../api/firebase"

export default function Profile({ navigation }) {
    const { signout, currentUser } = useContext(Context)

    const [serviceProvider, setServiceProvider] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [profilePicUrl, setProfilePicUrl] = useState(null)
    const [dateOfBirth, setDob] = useState()
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [unitNumber, setUnitNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const [reload, setReload] = useState(true)
    // image which will be from the gallery
    const [image, setImage] = useState(null)
    // image loading state for user profile image
    const [imageLoading, setImageLoading] = useState(false)

    const onSignOutClicked = async () => {
        try {
            setError("")
            setLoading(true)
            await signout()
            navigation.navigate('Home')
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }
    const uploadImage = async () => {
        try {
            if (!image) {
                return null; // if no image is selected, return null
            }
            setImageLoading(true);
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`profile-image/${currentUser.uid}${image.uri.substring(image.uri.lastIndexOf('/') + 1)}`);
            const snapshot = await ref.put(blob);
            setImageLoading(false);
            return snapshot;
        } catch (e) {
            console.log(e.message);
            setImageLoading(false);
        }
    };
    const onEditClicked = async () => {
        setModalVisible(true)
    }
    const onEditSubmitted = async () => {
        try {
            const response = await uploadImage(); // upload image first and get the response
            let profilePicUrl = serviceProvider.profilePicUrl; // default to previous profile image
            if (response) { // if a new image was selected, get the download URL of the uploaded image
                profilePicUrl = await response.ref.getDownloadURL();
            }
            await updateOneServiceProvider(
                currentUser.uid,
                firstName,
                lastName,
                profilePicUrl,
                dateOfBirth,
                province,
                city,
                streetAddress,
                unitNumber,
                contactNumber
            )
        setReload(!reload)
        setModalVisible(!modalVisible)
        Alert.alert('Profile Updated Successfully!');
        } catch (err) {
            console.log('onEditSubmitted error:', err);
        }
    }

    useEffect(() => {
        currentUser &&
            (async () => {
                const profile = await getOneServiceProvider(currentUser.uid)
                setServiceProvider(profile)
                setCity(profile.city)
                setStreetAddress(profile.streetAddress)
                setUnitNumber(profile.unitNumber)
                setDob(profile.dateOfBirth)
                setContactNumber(profile.contactNumber)
                setProvince(profile.province)
                setFirstName(profile.firstName)
                setLastName(profile.lastName)
                setProfilePicUrl(profile.profilePicUrl)
            })()
    }, [reload])

    return (
        <ScrollView>
            {serviceProvider ?
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <Text > {error && alert(error)}</Text>
                        <View style={styles.avatar}>
                        {imageLoading || !serviceProvider.profilePicUrl ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : (
                                <Avatar
                                    title='name'
                                    size='xlarge'
                                    source={{
                                        uri:
                                            serviceProvider?.profilePicUrl || 'https://www.w3schools.com/howto/img_avatar.png',
                                    }}
                                    containerStyle={{ borderRadius: 30, overflow: 'hidden' }}
                                />
                            )}
                        </View>

                        <Text style={styles.user}>
                            {serviceProvider.firstName}
                        </Text>
                        <View style={styles.headerContainer} >
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome style={styles.infoIcon} name='user' size={24} color='black' />
                            <Text style={styles.userInfo}>
                                {serviceProvider.firstName} {serviceProvider.lastName}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome style={styles.infoIcon} name='birthday-cake' size={24} color='black' />
                            <Text style={styles.userInfo}>
                                {serviceProvider.dateOfBirth}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome style={styles.infoIcon} name='envelope' size={24} color='black' />
                            <Text style={styles.userInfo}>
                                {currentUser && currentUser.email}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome style={styles.infoIcon} name='phone' size={24} color='black' />
                            <Text style={styles.userInfo}>
                                {serviceProvider.contactNumber}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome style={styles.infoIcon} name='address-card' size={24} color='black' />
                            <Text style={styles.userInfo}>
                                {serviceProvider.unitNumber}, {serviceProvider.streetAddress}, {serviceProvider.city}, {serviceProvider.province}
                            </Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <FontAwesome style={styles.infoIcon} name='truck' size={24} color='black' />
                            <FlatList
                                data={serviceProvider.vehicleType}
                                keyExtractor={(result) => result._id}
                                renderItem={({ item }) => {
                                    return (
                                        <Text style={styles.userInfo}>
                                            {item.vehicle}
                                        </Text>
                                    )
                                }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <Modal
                            animationType='slide'
                            transparent={false}
                            opacity={0.5}
                            visible={modalVisible}
                            backdropOpacity={0.5}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <ScrollView style={styles.modalContainer}>
                                <UserInfo
                                    firstName={firstName}
                                    uid={currentUser.uid}
                                    lastName={lastName}
                                    province={province}
                                    city={city}
                                    streetAddress={streetAddress}
                                    unitNumber={unitNumber}
                                    profilePicUrl={profilePicUrl}
                                    dateOfBirth={dateOfBirth}
                                    contactNumber={contactNumber}
                                    setCity={setCity}
                                    setStreetAddress={setStreetAddress}
                                    setUnitNumber={setUnitNumber}
                                    setDob={setDob}
                                    setContactNumber={setContactNumber}
                                    setProvince={setProvince}
                                    setFirstName={setFirstName}
                                    setLastName={setLastName}
                                    setProfilePicUrl={setProfilePicUrl}
                                    setError={setError}
                                    image={image}
                                    setImage={setImage}
                                    imageLoading={imageLoading}
                                />
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.buttons, styles.editButton]}
                                        onPress={() => onEditSubmitted()}>
                                        <Text style={[styles.buttonTitle, styles.editTitle]}>Submit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttons, styles.logOutButton]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.buttonTitle}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </Modal>
                    </View>
                        <TouchableOpacity
                            style={[styles.buttons, styles.editButton]}
                            disabled={!!loading}
                            onPress={() => onEditClicked()}>
                            <Text style={[styles.buttonTitle, styles.editTitle]}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttons, styles.logOutButton]}
                            disabled={!!loading}
                            onPress={() => onSignOutClicked()}>
                            <Text style={styles.buttonTitle}>Log Out</Text>
                        </TouchableOpacity>

                </View>
                : <View></View>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%',
        backgroundColor: 'white'
    },
    profileContainer: {
        flex: 1,
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatar: {
        alignItems: 'center'
    },
    user: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 35,
        color: '#5C5C5C',
        marginBottom: 10
    },
    infoContainer: {
        flexDirection: 'row'
    },
    infoIcon: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    userInfo: {
        color: 'black',
        fontSize: 20,
        marginVertical: 20,
    },
    modalContainer: {
        margin: 20
    },
    buttons: {
        width: '90%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    editButton: {
        backgroundColor: '#E0E0E0',
    },
    editTitle:{
color: 'black'
    },
    logOutButton: {
        backgroundColor: '#0077FC',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})

