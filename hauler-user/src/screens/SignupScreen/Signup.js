import React, { useState, useEffect, useContext } from 'react'
import { signUp } from '../../../network';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform, Button } from 'react-native'
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Context } from '../../context/ContextProvider'
import DateTimePicker from '@react-native-community/datetimepicker';

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

    //===============================function for the image display from phone gallery =======================//
    const pickImageAlbum = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.uri)
        }
    };

    const onSignUpClicked = async () => {
        if (password !== confirmPassword) {
            setError("Password does not match")
            return
        }
        try {
            setError("")
            const response = await signup(email, password)
            console.log('response', response)
            const currentUid = response.user.uid
            const dateOfBirth = date.toLocaleDateString()
            const usersignUp = await signUp(
                currentUid,
                firstName,
                lastName,
                image,
                dateOfBirth,
                province,
                city,
                streetAddress,
                unitNumber,
                email,
                contactNumber
            )
            // get correct data here
            console.log('usersignUp', usersignUp)
            navigation.navigate('MyPostList')
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
                        <TouchableOpacity onPress={() => pickImageAlbum()}>
                            <Avatar
                                size={40}
                                rounded
                                source={{ uri: image }}
                                backgroundColor='lightgrey'
                            />
                            <View style={styles.evilIcon}>
                                <FontAwesome name="user-circle-o" size={38} color="white" />
                                <View style={styles.icon1}>
                                    <FontAwesome name="user-circle" size={40} color="#1177FC" /></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text > {error && alert(error)}</Text>

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

                    <Button onPress={() => setShow(true)} title="Select a Date"/>
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
                    <TextInput
                        style={styles.input}
                        placeholder='(XXX) XXX-XXXX'
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(contactNumber) => { setError(""); setContactNumber(contactNumber) }}
                        value={contactNumber}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onSignUpClicked()}>
                        <Text style={styles.buttonTitle}> Complete Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1177FC',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1177FC',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    datePicker: {
        height: 40,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop: 20
    }
});