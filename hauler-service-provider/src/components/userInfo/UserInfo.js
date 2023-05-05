import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function UserInfo({ firstName, lastName, province, city, streetAddress,
    unitNumber, setCity, setStreetAddress, setUnitNumber, profilePicUrl, dateOfBirth, setDob, contactNumber, setContactNumber, setProvince, setFirstName, setLastName, setProfilePicUrl, setError }) {
    return (
        <View>
             {/* <Text style={styles.text1}> profilePicUrl : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(profilePic) => { setError(""); setProfilePicUrl(profilePic) }}
                value={profilePicUrl}
            /> */}
             <Text style={styles.text1}> First Name : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(fname) => { setError(""); setFirstName(fname) }}
                value={firstName}
            />
             <Text style={styles.text1}> Last Name : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(lname) => { setError(""); setLastName(lname) }}
                value={lastName}
            />
             {/* <Text style={styles.text1}> Date of Birth : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(date) => { setError(""); setDob(date) }}
                value={dateOfBirth}
            /> */}
             <Text style={styles.text1}> Province : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(province) => { setError(""); setProvince(province) }}
                value={province}
            />
             <Text style={styles.text1}> City : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(city) => { setError(""); setCity(city) }}
                value={city}
            />
             <Text style={styles.text1}> StreetAddress : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(streetAddress) => { setError(""); setStreetAddress(streetAddress) }}
                value={streetAddress}
            />
             <Text style={styles.text1}> Unit Number : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(unitNumber) => { setError(""); setUnitNumber(unitNumber) }}
                value={unitNumber}
            />
             <Text style={styles.text1}> Contact Number : </Text>
            <TextInput
                style={styles.input}
                onChangeText={(number) => { setError(""); setContactNumber(number) }}
                value={contactNumber}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: 1,
        height: 40,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        marginBottom: 20
    },
    text1: {
        color: '#BFBFBF',
        marginLeft: '5%'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
        datePicker: {
        height: 40,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop: 20
    },
})

