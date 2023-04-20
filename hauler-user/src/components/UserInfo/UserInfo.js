import React from 'react';
import { TextInput, View, Picker } from 'react-native';
import { StyleSheet } from 'react-native';

export default function UserInfo({ firstName, lastName, province, city, streetAddress,
    unitNumber, setCity, setStreetAddress, setUnitNumber, profilePicUrl, dateOfBirth, setDob, contactNumber, setContactNumber, setProvince, setFirstName, setLastName, setProfilePicUrl, setError }) {

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
        <View>
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
            <TextInput
                style={styles.input}
                placeholder='First Name'
                placeholderTextColor='#C0C0C0'
                onChangeText={(fname) => { setError(""); setFirstName(fname) }}
                value={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder='Last Name'
                placeholderTextColor='#C0C0C0'
                onChangeText={(lname) => { setError(""); setLastName(lname) }}
                value={lastName}
            />
            <TextInput
                style={styles.input}
                placeholder='Date of Birth'
                placeholderTextColor='#C0C0C0'
                onChangeText={(date) => { setError(""); setDob(date) }}
                value={dateOfBirth}
            />
            <TextInput
                style={styles.input}
                placeholder='Province'
                placeholderTextColor='#C0C0C0'
                onChangeText={(province) => { setError(""); setProvince(province) }}
                value={province}
            />
            <TextInput
                style={styles.input}
                placeholder='City'
                placeholderTextColor='#C0C0C0'
                onChangeText={(city) => { setError(""); setCity(city) }}
                value={city}
            />
            <TextInput
                style={styles.input}
                placeholder='StreetAddress'
                placeholderTextColor='#C0C0C0'
                onChangeText={(streetAddress) => { setError(""); setStreetAddress(streetAddress) }}
                value={streetAddress}
            />
            <TextInput
                style={styles.input}
                placeholder='Unit Number'
                placeholderTextColor='#C0C0C0'
                onChangeText={(unitNumber) => { setError(""); setUnitNumber(unitNumber) }}
                value={unitNumber}
            />
            <TextInput
                style={styles.input}
                placeholder='Contact Number'
                placeholderTextColor='#C0C0C0'
                onChangeText={(number) => { setError(""); setContactNumber(number) }}
                value={contactNumber}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: '1%',
        marginHorizontal: '2%',
        paddingLeft: 16
    },
    avatarView: {
        marginLeft: 25,
        marginRight: 200,
        marginTop: 40,
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

