import React, { useState, useEffect, useContext } from 'react'
import { verifyUser } from '../../../network';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform, Button, Alert } from 'react-native'
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Context } from '../../context/ContextProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './SignupCss';
import ReactNativePhoneInput from 'react-native-phone-input';

export default function Signup({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    //const [dateOfBirth, setDob] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [unitNumber, setUnitNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [image, setImage] = useState(null)
    const { signup, currentUser } = useContext(Context)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry!! We need camera roll permission to make this work.');
                }
            }
        })();
    }, []);

    const onSignUpClicked = async () => {
        if (password !== confirmPassword) {
            setError("Password does not match")
            return
        }

        try {
            setError("")

            // Call the signup function and navigate to the verification form immediately
            const response = await signup(email, password)
            const currentUid = response.user.uid
            navigation.navigate('VerificationForm', {
                currentUid,
                firstName,
                lastName,
                image,
                dateOfBirth: date.toISOString().split('T')[0],
                province,
                city,
                streetAddress,
                unitNumber,
                email,
                contactNumber
            })

            // Start the verification process in the background
            const verificationResponse = await verifyUser(contactNumber)
            setVerificationStatus(verificationResponse.status)
        } catch (err) {
            setError(err.message)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Sign Up</Text>
                </View>
                <View
                    style={{ flex: 1, width: '100%' }}>
                    <View style={styles.avatarView}>
                        {/* <TouchableOpacity onPress={() => pickImageAlbum()}>
                            <Avatar
                                size={40}
                                rounded
                                source={{ uri: image }}
                                backgroundColor='lightgrey'
                            />
                            <View style={styles.evilIcon}>
                            <View style={styles.icon1}>
                                   <FontAwesome name="user-circle" size={40} color="#000000" /></View>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    <Text > {error && alert(error)}</Text>
                    <Text > {verificationStatus === 400 && alert("Verification failed")}</Text>

                    {/*================================== Text Input fields for user================================================= */}
                    <Text style={styles.text}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(firstName) => {
                            setError('');
                            setFirstName(firstName);
                        }}
                        value={firstName}
                    />

                    <Text style={styles.text}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(lastName) => {
                            setError('');
                            setLastName(lastName);
                        }}
                        value={lastName}
                    />

                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(email) => {
                            setError('');
                            setEmail(email);
                        }}
                        value={email}
                    />

                    <Text style={styles.text}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry
                        onChangeText={(password) => {
                            setError('');
                            setPassword(password);
                        }}
                        value={password}
                    />

                    <Text style={styles.text}>Confirm Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry
                        onChangeText={(password) => {
                            setError('');
                            setConfirmPassword(password);
                        }}
                        value={confirmPassword}
                    />

                    <Text style={styles.text}>Date Of Birth:</Text>
                    {/*<TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        placeholder='YYYY-MM-DD'
                        onChangeText={(date) => {
                            setError('');
                            setDob(date);
                        }}
                        value={dateOfBirth}
                    />*/}

                    <Button style={styles.selectBtn} onPress={() => setShow(true)} title="Select a Date"/>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                    <TextInput
                        //style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        value={date.toLocaleDateString()}
                        style={styles.datePicker}
                    />

                    <Text style={styles.text}> Unit Number : </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='(e.g. 1234)'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(unitNumber) => { setError(""); setUnitNumber(unitNumber) }}
                        value={unitNumber}
                    />

                    <Text style={styles.text}> Street Address : </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='(e.g. 1234 Main Street)'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(streetAddress) => { setError(""); setStreetAddress(streetAddress) }}
                        value={streetAddress}
                    />

                    <Text style={styles.text}> City : </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='(e.g. Vancouver)'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(city) => { setError(""); setCity(city) }}
                        value={city}
                    />

                    <Text style={styles.text}> Province : </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='(e.g. British Columbia)'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(province) => { setError(""); setProvince(province) }}
                        value={province}
                    />

                    <Text style={styles.text}> Phone Number : </Text>
                    {/*<TextInput
                        style={styles.input}
                        placeholder='(XXX) XXX-XXXX'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(contactNumber) => { setError(""); setContactNumber(contactNumber) }}
                        value={contactNumber}
                    />*/}

                    <ReactNativePhoneInput
                        onChangePhoneNumber={(value) => { setError(""); setContactNumber(value)}}
                        initialCountry={'ca'}
                        //initialValue="13178675309"
                        //textProps={{
                        //    placeholder: '(XXX) XXX-XXXX'
                        //}}
                        //textComponent={TextInput}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onSignUpClicked}>
                        <Text style={styles.buttonTitle}> Complete Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

