import React, { useState, useEffect } from 'react';
import { TextInput, View, Picker, TouchableOpacity, Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function UserInfo1({ firstName, lastName, province, city, streetAddress,
    unitNumber, setCity, setStreetAddress, setUnitNumber, dateOfBirth, setDob, contactNumber, setContactNumber, setProvince, setFirstName, setLastName, setError }) {

        const [image, setImage] = useState(null)

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
//==================================== Gallery Image Display functionality ====================================//
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

    return (
        <View style={styles.container}>
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

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>First Name</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(fname) => { setError(""); setFirstName(fname) }}
                value={firstName}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Last Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Last Name'
                placeholderTextColor='#C0C0C0'
                onChangeText={(lname) => { setError(""); setLastName(lname) }}
                value={lastName}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Date Of Birth</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(date) => { setError(""); setDob(date) }}
                value={dateOfBirth}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Province</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(province) => { setError(""); setProvince(province) }}
                value={province}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>City</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(city) => { setError(""); setCity(city) }}
                value={city}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Street Address</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(streetAddress) => { setError(""); setStreetAddress(streetAddress) }}
                value={streetAddress}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Unit Number</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(unitNumber) => { setError(""); setUnitNumber(unitNumber) }}
                value={unitNumber}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Contact Number</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(number) => { setError(""); setContactNumber(number) }}
                value={contactNumber}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 15
    },
    infoKey: {
        color: '#A9A9A9',
        width: 110,
    },
    input: {
        height: 18,
        overflow: 'hidden',
        // marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        paddingLeft: 16,
        width: '65%',
        borderBottomWidth: 1.0,
        borderColor: '#BFBFBF',
        marginRight: 10
    },
    avatarView: {
        marginLeft: 15,
        marginRight: 200,
        marginTop: 35,
        flexDirection: 'row'
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

