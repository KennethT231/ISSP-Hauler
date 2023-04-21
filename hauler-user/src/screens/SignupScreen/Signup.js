import React, { useState, useEffect, useContext } from 'react'
import { signUp } from '../../../network';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from 'react-native'
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import {Context} from '../../context/ContextProvider'

export default function Signup({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDob] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [unitNumber, setUnitNumber] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [image, setImage] = useState(null)
    const { signup, currentUser } = useContext(Context)

    useEffect(() => {
        (async () => {
            if(Platform.OS !=='web'){
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status !== 'granted'){
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
            aspect:[1,1],
            quality: 1,
        });
        console.log(result);
        if(!result.cancelled){
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
                    const currentUid = response.user.uid
                    await signUp(
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
                    navigation.navigate('MyPostList')
                } catch (err) {
                    setError(err.message)
                }
            }
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={{ flex: 1, width: '100%' }}>
                        <View style={styles.avatarView}>
                            <TouchableOpacity onPress={() => pickImageAlbum()}>
                                <Avatar
                                size={125}
                                rounded 
                                source={{uri: image}}
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
                    <Text style={styles.text}> First Name : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(firstName) => { setError(""); setFirstName(firstName) }}
                        value={firstName}
                    />

                    <Text style={styles.text}> Last Name : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(lastName) => { setError(""); setLastName(lastName) }}
                        value={lastName}
                    />

                    <Text style={styles.text}> Email : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(email) => { setError(""); setEmail(email) }}
                        value={email}
                    />

                    <Text style={styles.text}> Password : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry
                        onChangeText={(password) => { setError(""); setPassword(password) }}
                        value={password}
                    />

                    <Text style={styles.text}> Confirm Password : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        secureTextEntry
                        onChangeText={(password) => { setError(""); setConfirmPassword(password) }}
                        value={confirmPassword}
                    />

                    <Text style={styles.text}> Date Of Birth : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(date) => { setError(""); setDob(date) }}
                        value={dateOfBirth}
                    />

                    <Text style={styles.text}> Unit Number : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(unitNumber) => { setError(""); setUnitNumber(unitNumber) }}
                        value={unitNumber}
                    />

                    <Text style={styles.text}> Street Address : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(streetAddress) => { setError(""); setStreetAddress(streetAddress) }}
                        value={streetAddress}
                    />

                    <Text style={styles.text}> City : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(city) => { setError(""); setCity(city) }}
                        value={city}
                    />

                    <Text style={styles.text}> Province : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#C0C0C0"
                        onChangeText={(province) => { setError(""); setProvince(province) }}
                        value={province}
                    />
                    
                    <Text style={styles.text}> Phone Number : </Text>                    
                    <TextInput
                        style={styles.input}
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
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        marginTop: 30,
    },
    input: {
        height: 25,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        width: '80%',
        borderBottomWidth: 1.0,
        borderColor: '#BFBFBF',
    },
    button: {
        backgroundColor: '#0177FC',
        alignSelf: 'center',
        marginVertical: 10,
        width: '90%',
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
      },
      buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
      },
    option: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    avatarView: {
        marginLeft: 25,
        marginRight: 200,
        marginTop: 40,
        flexDirection: 'row'
    },
    text: {
        color: '#BFBFBF',
        marginLeft: 35
    },
    evilIcon: {
        flexDirection:'row',
        marginTop: -30,
        marginLeft: 10
    },
    icon1:{
        marginLeft: -39,
        marginTop: 0.4
    }
})