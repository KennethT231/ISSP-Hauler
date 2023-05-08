import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button, ScrollView, Picker, Linking } from 'react-native';
import UserInfo from '../../../src/components/userInfo/UserInfo';
import { Context } from '../../../src/context/ContextProvider';
import { signUp, createStripeAccount, verifyProvider } from '../../../network';
import RNPickerSelect from 'react-native-picker-select-updated';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativePhoneInput from 'react-native-phone-input';

export default function Signup({ navigation, route }) {

    const { signup, currentUser } = useContext(Context)

    const [uid, setUid] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    //const [profilePicUrl, setProfilePicUrl] = useState('')
    const [dateOfBirth, setDob] = useState('')
    const [image, setImage] = useState(null)
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [unitNumber, setUnitNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [driverLicenseExpiry, setExpiryDate] = useState('')
    const [serviceLocation, setLocationOfService] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const {licenseInfo, frontImage, backImage} = route.params;

    console.log('license info', licenseInfo)
    console.log('front image', frontImage)
    console.log('back image', backImage)

    const printUrl = async () => {
        const appUrl = await Linking.getInitialURL()
    }

    printUrl()
    const onSignUpClicked = async () => {
        if (password !== confirmPassword) {
            setError("Password does not match")
            return
        }
        try {
            setError("")
            setLoading(true)
            const response = await signup(email, password)
            const currentUid = response.user.uid
            const dateOfBirth = date.toLocaleDateString()
            setDob(dateOfBirth)
            setUid(currentUid)
            navigation.navigate('VerificationForm', {
                currentUid,
                firstName,
                lastName,
                // profilePicUrl,
                image,
                dateOfBirth,
                province,
                city,
                streetAddress,
                unitNumber,
                email,
                contactNumber,
                vehicleType,
                // driverLicenseExpiry,
                serviceLocation,
            })
            const appUrl = await Linking.getInitialURL()
            const stripeUrl = await createStripeAccount(email, appUrl, currentUid)
            console.log('stripe url', stripeUrl)
            await Linking.openURL(stripeUrl)

            // Start the verification process in the background
            const verificationResponse = await verifyProvider(contactNumber)
            console.log('verification response', verificationResponse)
            setVerificationStatus(verificationResponse.status)
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
        setLoading(false)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    // useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry!! We need camera roll permission to make this work.');
    //             }
    //         }
    //     })();
    // }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={{ flex: 1, width: '100%' }}>
                    <Text style={styles.heading}>Register</Text>
                    <Text > {error && alert(error)}</Text>
                    <Text style={styles.text1}> Email : </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(email) => { setError(""); setEmail(email) }}
                        value={email}
                    />
                    <Text style={styles.text1}> Password : </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(password) => { setError(""); setPassword(password) }}
                        value={password}
                    />
                    <Text style={styles.text1}> Confirm Password : </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(password) => { setError(""); setConfirmPassword(password) }}
                        value={confirmPassword}
                    />
                    <Text style={styles.text1}> Phone Number : </Text>
                    {/*<TextInput
                        style={styles.input}
                        placeholder='(XXX) XXX-XXXX'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(contactNumber) => { setError(""); setContactNumber(contactNumber) }}
                        value={contactNumber}
                    />*/}

                    <ReactNativePhoneInput
                        onChangePhoneNumber={(value) => { setError(""); setContactNumber(value) }}
                        initialCountry={'ca'}
                        //initialValue="13178675309"
                        //textProps={{
                        //    placeholder: '(XXX) XXX-XXXX'
                        //}}
                        //textComponent={TextInput}
                        style={styles.input}
                    />
                    <UserInfo
                        province={province}
                        city={city}
                        streetAddress={streetAddress}
                        unitNumber={unitNumber}
                        contactNumber={contactNumber}
                        firstName={firstName}
                        lastName={lastName}
                        // profilePicUrl={profilePicUrl}
                        setProvince={setProvince}
                        setCity={setCity}
                        setStreetAddress={setStreetAddress}
                        setUnitNumber={setUnitNumber}
                        //setProfilePicUrl={setProfilePicUrl}
                        setLastName={setLastName}
                        //setDob={setDob}
                        //setContactNumber={setContactNumber}
                        setFirstName={setFirstName}
                        setError={setError}
                    />
                    <Text style={styles.text1}>Date Of Birth:</Text>
                    <View style={styles.date}>
                        <Button onPress={() => setShow(true)} title="Select a Date" />
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                onChange={onChange}
                                onChangeText={(date) => { setError(""); setDob(date) }}
                            />
                        )}
                    </View>
                    <TextInput
                        placeholderTextColor="#C0C0C0"
                        value={date.toLocaleDateString()}
                        style={styles.datePicker}
                    />

                    <View style={styles.picker}>
                        <RNPickerSelect
                            value={vehicleType}
                            useNativeAndroidPickerStyle={true}
                            style={{
                                placeholder: {
                                    color: 'black'
                                },
                                inputIOS: {
                                    fontSize: 14,
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    color: 'black'
                                },
                                inputAndroid: {
                                    fontSize: 14,
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    color: 'black',
                                },
                            }}
                            onValueChange={(type) => { setError(""); setVehicleType(type) }}
                            placeholder={{ label: 'Select Vehicle type', value: null }}
                            items={[
                                { label: 'SUV', value: 'SUV' },
                                { label: 'VAN', value: 'VAN' },
                                { label: 'PICKUP', value: 'PICKUP' },
                            ]}
                        />
                    </View>
                    <View style={styles.picker}>
                        <RNPickerSelect
                            value={serviceLocation}
                            useNativeAndroidPickerStyle={true}
                            style={{
                                placeholder: {
                                    color: 'black'
                                },
                                inputIOS: {
                                    fontSize: 14,
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    color: 'black'
                                },
                                inputAndroid: {
                                    fontSize: 14,
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    color: 'black',
                                },
                            }}
                            onValueChange={(locationOfService) => { setError(""); setLocationOfService(locationOfService) }}
                            placeholder={{ label: 'Select Location Of Service', value: null }}
                            items={[
                                { label: 'Abbotsford', value: 'Abbotsford' },
                                { label: 'Burnaby', value: 'Burnaby' },
                                { label: 'Chilliwack', value: 'Chilliwack' },
                                { label: 'Coquitlam', value: 'Coquitlam' },
                                { label: 'Delta', value: 'Delta' },
                                { label: 'Hope', value: 'Hope' },
                                { label: 'Vancouver', value: 'Vancouver' },
                                { label: 'Richmond', value: 'Richmond' },
                                { label: 'New Westminster', value: 'New Westminster' },
                                { label: 'Surrey', value: 'Surrey' },
                            ]}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity
                            style={styles.buttons}>
                            <Text style={styles.buttonTitle}>Upload Void Cheque</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={styles.buttons} onPress={
                                () => navigation.navigate('Verification')}>

                            <Text style={styles.buttonTitle}>Upload Driver License</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttons}>
                            <Text style={styles.buttonTitle}>Driver Abstract</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text1}> Driver Licence Expiry : </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(date) => { setError(""); setExpiryDate(date) }}
                        value={driverLicenseExpiry}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        disabled={!!loading}
                        onPress={() => onSignUpClicked()}>
                        <Text style={styles.buttonTitle1}>Create account</Text>
                    </TouchableOpacity>

                    <View style={styles.option}>
                        <Text style={styles.optionText}>
                            Already have an account?
                            <Text style={styles.optionLink}
                                onPress={() => navigation.navigate('Signin')}>
                                Log in
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: '2%',
        backgroundColor: 'white'
    },
    date: {
        marginLeft: '10%',
        marginRight: '2%',
        width: '80%',
        marginTop: 20,
    },

    datePicker: {
        height: 40,
        width: '80%',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: '10%',
        marginRight: '2%',
    },
    logo: {
        width: 200,
        height: 100,
        alignSelf: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: 45,
        marginVertical: '1%',
        color: "black",
    },
    input: {
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: 1,
        height: 40,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        marginBottom: 20
    },
    email: {
        color: '#73AB84',
        textAlign: 'center'
    },
    buttonContainer: {
        marginHorizontal: '2%',
        marginVertical: '1%',
    },
    button: {
        backgroundColor: '#2196f3',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: 50,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    buttons: {
        backgroundColor: '#E0E0E0',
        width: '90%',
        height: 48,
        borderRadius: 10,
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    buttonTitle1: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold"
    },
    option: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    optionText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    optionLink: {
        color: "#A9A9A9",
        fontWeight: "bold",
        fontSize: 16
    },
    text1: {
        color: '#BFBFBF',
        marginLeft: '5%'
    },
    picker: {
        width: '90%',
        alignSelf: 'center'
    }
})

