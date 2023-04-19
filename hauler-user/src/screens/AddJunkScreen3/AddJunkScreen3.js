import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TextInput, SafeAreaView, Picker } from 'react-native'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {getOnePost} from '../../../network'

export default function AddJunkScreen3({ navigation, route }) {

    const [pickContactPerson, setPickContactPerson] = useState('')
    const [pickUpPhoneNumber, setPickUpPhoneNumber] = useState('')
    const [pickUpSpecialInstructions, setPickUpSpecialInstructions] = useState('')
    const [sliderValue, setSliderValue] = useState(50);
    const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, pickUpCity,
        pickUpAddressLat, pickUpAddressLng, operation, postId } = route.params;

    useEffect(() => {
        (async () => {
            if (operation === "edit") {
                const post = await getOnePost(postId)
                setPickContactPerson(post.pickUpContactPerson)
                setPickUpPhoneNumber(post.pickUpContactNumber)
                setPickUpSpecialInstructions(post.pickUpSpecialInstruction)
                setSliderValue(post.price)
            }
        })()
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.text}>Pick up contact person</Text>
                <TextInput style={styles.inputLine1}
                    onChangeText={(contactPerson) => { setPickContactPerson(contactPerson) }}
                    value={pickContactPerson}
                />

                <Text style={styles.text}>Pick up contact number</Text>
                <TextInput style={styles.inputLine1}
                    keyboardType='numeric'
                    onChangeText={(phoneNumber) => { setPickUpPhoneNumber(phoneNumber) }}
                    value={pickUpPhoneNumber}
                />

                <Text style={styles.text}>Pick up instructions</Text>
                <TextInput style={styles.inputLine1}
                    multiline
                    onChangeText={(specialInstructions) => setPickUpSpecialInstructions(specialInstructions)}
                    value={pickUpSpecialInstructions}
                />


                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.containerSlider}>
                        {/*Text to show slider value*/}
                        <Text style={{ color: 'black' }}>
                            Your Price Value : $ {sliderValue}
                        </Text>
                        {/*Slider with max, min, step and initial value*/}
                        <Slider
                            maximumValue={1000}
                            minimumValue={50}
                            minimumTrackTintColor="#307ecc"
                            maximumTrackTintColor="#000000"
                            step={1}
                            value={sliderValue}
                            onValueChange={
                                (sliderValue) => setSliderValue(sliderValue)
                            }
                        />
                    </View>
                </SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate('AddJunkSummary', {
                    image: image,
                    selectedweight: selectedweight,
                    selectedquantity: selectedquantity,
                    postHeading: postHeading,
                    description: description,
                    pickUpAddress: pickUpAddress,
                    pickContactPerson: pickContactPerson,
                    pickUpPhoneNumber: pickUpPhoneNumber,
                    pickUpSpecialInstructions: pickUpSpecialInstructions,
                    pickUpCity: pickUpCity,
                    pickUpAddressLat: pickUpAddressLat,
                    pickUpAddressLng: pickUpAddressLng,
                    sliderValue: sliderValue,
                    operation: operation,
                    postId: postId,
                })}
                    style={styles.button}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minHeight: 600,
        width: '100%',
        backgroundColor: 'white',
    },
    inputLine1: {
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 30,
        paddingLeft: 16,
        width: '90%',
        borderBottomWidth: 1.0,
        borderColor: '#BFBFBF',
    },
    text: {
        color: '#BFBFBF',
        marginLeft: 25,
        fontWeight: 'bold',
        marginTop: 20
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
    text: {
        color: '#BFBFBF',
        marginLeft: 25,
        fontWeight: 'bold',
        marginTop: 20
    },
    containerSlider: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',

    },
})