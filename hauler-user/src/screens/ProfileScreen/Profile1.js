import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import UserInfo1 from '../../components/UserInfo/UserInfo1';
import UserInfo2 from '../../components/UserInfo/UserInfo2';
import { Context } from '../../context/ContextProvider';
import { getOneUser, updateOneUser } from '../../../network';
import firebase from '../../api/firebase';

export default function Profile1({ navigation }) {
    const { signout, currentUser } = useContext(Context)

    const [userInformation, setUserInformation] = useState({})
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
    const [creditCardNumber, setCreditCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const [reload, setReload] = useState(true)

    // image which will be from the gallery
    const [image, setImage] = useState(null)
    // image loading state for user profile image
    const [imageLoading, setImageLoading] = useState(false)

    // console.log('currentUser from profile: ', currentUser)
    useEffect(() => {
        console.log('userInformation: ', userInformation)
    }, [userInformation])

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

    const onEditClicked = async () => {
        setModalVisible(true)
    }

    const uploadImage = async () => {
        try {
            if (!image) {
                return null; // if no image is selected, return null
            }
            setImageLoading(true);
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const ref = firebase.storage().ref().child(`user-profile-image/${currentUser.uid}${image.uri.substring(image.uri.lastIndexOf('/') + 1)}`);
            const snapshot = await ref.put(blob);
            setImageLoading(false);
            return snapshot;
        } catch (e) {
            console.log(e.message);
            setImageLoading(false);
        }
    };

    const onEditSubmitted = async () => {
        try {
            const response = await uploadImage(); // upload image first and get the response
            let profilePicUrl = userInformation.profilePicUrl; // default to previous profile image
            if (response) { // if a new image was selected, get the download URL of the uploaded image
                profilePicUrl = await response.ref.getDownloadURL();
            }
            await updateOneUser(
                currentUser.uid,
                firstName,
                lastName,
                profilePicUrl,
                dateOfBirth,
                province,
                city,
                streetAddress,
                unitNumber,
                contactNumber,
                creditCardNumber,
                expiryDate,
                cvv
            );
            setReload(!reload);
            setModalVisible(!modalVisible);
            Alert.alert('Profile Updated Successfully!');
        } catch (err) {
            console.log('onEditSubmitted error:', err);
        }
    };

    const onPaymentHistoryClicked = () => {
        navigation.navigate('PaymentHistory')
    }

    useEffect(() => {
        currentUser &&
            (async () => {
                const profile = await getOneUser(currentUser.uid)
                setUserInformation(profile)
                setCity(profile.city)
                setStreetAddress(profile.streetAddress)
                setUnitNumber(profile.unitNumber)
                setDob(profile.dateOfBirth)
                setContactNumber(profile.contactNumber)
                setProvince(profile.province)
                setFirstName(profile.firstName)
                setLastName(profile.lastName)
                setProfilePicUrl(profile.profilePicUrl)
                setCreditCardNumber(profile.creditCardNumber)
                setExpiryDate(profile.expiryDate)
                setCvv(profile.cvv)
            })()
    }, [reload])

    return (
        <ScrollView>
            {userInformation ?
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <Text > {error && alert(error)}</Text>
                        <View style={styles.avatar}>
                            {imageLoading || !userInformation.profilePicUrl ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : (
                                <Avatar
                                    title='name'
                                    size='xlarge'
                                    source={{
                                        uri:
                                            userInformation?.profilePicUrl || 'https://www.w3schools.com/howto/img_avatar.png',
                                    }}
                                    containerStyle={{ borderRadius: 30, overflow: 'hidden' }}
                                />
                            )}
                        </View>

                        <Text style={styles.user}>
                            {userInformation.firstName}
                        </Text>
                        <View style={styles.headerContainer} >
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                            <FontAwesome name='star' size={20} color='#FCC742' />
                        </View>
                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <View style={styles.infoContainer}>
                                <FontAwesome style={styles.infoIcon} name='user' size={24} color='black' />
                                <Text style={styles.userInfo}>
                                    {userInformation.firstName} {userInformation.lastName}
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <FontAwesome style={styles.infoIcon} name='birthday-cake' size={24} color='black' />
                                <Text style={styles.userInfo}>
                                    {userInformation.dateOfBirth}
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
                                    {userInformation.contactNumber}
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <FontAwesome style={styles.infoIcon} name='address-card' size={24} color='black' />
                                <Text style={styles.userInfo}>
                                    {userInformation.unitNumber}, {userInformation.streetAddress}
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <FontAwesome style={styles.infoIcon} name='address-card' size={24} color='black' />
                                <Text style={styles.userInfo}>
                                    {userInformation.city}
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <FontAwesome style={styles.infoIcon} name='address-card' size={24} color='black' />
                                <Text style={styles.userInfo}>
                                    {userInformation.province}
                                </Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <FontAwesome style={styles.infoIcon} name='credit-card' size={24} color='black' />
                                <Text style={styles.userInfo}>
                                    {userInformation.cardNumber} {userInformation.expiryDate}
                                </Text>
                            </View>
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
                                <UserInfo1
                                    firstName={firstName}
                                    lastName={lastName}
                                    province={province}
                                    city={city}
                                    streetAddress={streetAddress}
                                    unitNumber={unitNumber}
                                    profilePicUrl={profilePicUrl}
                                    dateOfBirth={dateOfBirth}
                                    contactNumber={contactNumber}
                                    uid={currentUser.uid}
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
                                <UserInfo2
                                    creditCardNumber={creditCardNumber}
                                    expiryDate={expiryDate}
                                    cvv={cvv}
                                    setCreditCardNumber={setCreditCardNumber}
                                    setExpiryDate={setExpiryDate}
                                    setCvv={setCvv}
                                    setError={setError}
                                />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.buttons, styles.editButton]}
                                        onPress={() => onEditSubmitted()}>
                                        <Text style={styles.buttonTitle}>Submit</Text>
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
                    {/* payment history */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.paymentHistoryButton}
                            disabled={!!loading} // added !!
                            onPress={() => onPaymentHistoryClicked()}
                        >
                            <Text style={styles.buttonTitle}>
                                Payment History
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttonContainer, { flex: 1 }]}>
                        <TouchableOpacity
                            style={[styles.buttons, styles.editButton]}
                            disabled={!!loading} // added !!
                            onPress={() => onEditClicked()}
                        >
                            <Text style={styles.buttonTitle}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttons, styles.logOutButton]}
                            disabled={!!loading} // added !!
                            onPress={() => onSignOutClicked()}
                        >
                            <Text style={styles.buttonTitle}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                : <View></View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        width: '90%',
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
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        height: 70,
        borderRadius: 5,
        backgroundColor: 'white',
        marginVertical: '1%',
        paddingLeft: 16,
        marginTop: 30,
        width: '90%',
        marginLeft: '5%',
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
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // Removed marginRight: 8
    },
    editButton: {
        backgroundColor: '#0177FC',
        width: 150,
        // Removed marginBottom: 30
    },

    logOutButton: {
        backgroundColor: '#585858',
        width: 150,
        // Removed marginBottom: 30
    },

    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
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
        paddingLeft: 16,
    },

    paymentHistoryButton: {
        backgroundColor: 'navy',
        minWidth: '90%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

