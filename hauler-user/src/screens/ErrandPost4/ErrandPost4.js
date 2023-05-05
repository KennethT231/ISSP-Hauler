import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TextInput, SafeAreaView, Picker } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {getOnePost} from '../../../network';
import styles from './ErrandPost4Css';

export default function ErrandPost4({ navigation, route }) {

    const [pickContactPerson, setPickContactPerson] = useState('')
    const [pickUpPhoneNumber, setPickUpPhoneNumber] = useState('')
    const [pickUpSpecialInstructions, setPickUpSpecialInstructions] = useState('')
    const [dropOffContactPerson, setDropOffContactPerson] = useState('')
    const [dropOffPhoneNumber, setDropOffPhoneNumber] = useState('')
    const [dropOffSpecialInstructions, setDropOffSpecialInstructions] = useState('')
    const [sliderValue, setSliderValue] = useState(50);
    const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, dropOffAddress, service, dropOffCity, dropOffAddressLat, dropOffAddressLng, operation, postId, pickUpCity,pickUpAddressLat, pickUpAddressLng } = route.params;

    useEffect(() => {
      (async () => {
          if (operation === "edit") {
              const post = await getOnePost(postId)
              setPickContactPerson(post.pickUpContactPerson)
              setPickUpPhoneNumber(post.pickUpContactNumber)
              setPickUpSpecialInstructions(post.pickUpSpecialInstruction)
              setSliderValue(post.price)
              setDropOffContactPerson(post.dropOffContactPerson)
              setDropOffPhoneNumber(post.dropOffContactNumber)
              setDropOffSpecialInstructions(post.dropOffSpecialInstruction)
          }
      })()
  }, [])

    return (
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.pickup}>Pick Up Details</Text>
        <Text style={styles.text}>Contact Person</Text>
          <TextInput style={styles.inputLine1} 
            onChangeText={(contactPerson) => {setPickContactPerson(contactPerson)}}
            value={pickContactPerson}
          />
          <Text style={styles.text}>Phone Number</Text>
          <TextInput style={styles.inputLine1}
            keyboardType='numeric' 
            onChangeText={(phoneNumber) => {setPickUpPhoneNumber(phoneNumber)}}
            value={pickUpPhoneNumber}
          />
          <Text style={styles.text}>Pick up instructions</Text>
          <TextInput style={styles.inputLine1} 
          multiline
            onChangeText={(specialInstructions) => setPickUpSpecialInstructions(specialInstructions)}
            value={pickUpSpecialInstructions}
          />
          <Text style={styles.dropOff}> Drop Off Details </Text>
          <Text style={styles.text}>Contact Person</Text>
          <TextInput style={styles.inputLine1} 
            onChangeText={(contactPerson) => {setDropOffContactPerson(contactPerson)}}
            value={dropOffContactPerson}
          />
          <Text style={styles.text}>Contact Number</Text>
          <TextInput style={styles.inputLine1}
            keyboardType='numeric' 
            onChangeText={(phoneNumber) => {setDropOffPhoneNumber(phoneNumber)}}
            value={dropOffPhoneNumber}
          />
          <Text style={styles.text}> Special Instructions : </Text>
          <TextInput style={styles.inputLine1} 
          multiline 
            onChangeText={(specialInstructions) => setDropOffSpecialInstructions(specialInstructions)}
            value={dropOffSpecialInstructions}
          />
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.containerSlider}>
                {/*Text to show slider value*/}
                <Text style={{color: 'black'}}>
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
         <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ErrandSummary', {
            image: image, 
            selectedweight: selectedweight, 
            selectedquantity: selectedquantity, 
            postHeading: postHeading, 
            description: description,
            pickUpAddress:pickUpAddress, 
            dropOffAddress:dropOffAddress, 
            pickContactPerson: pickContactPerson, 
            pickUpPhoneNumber: pickUpPhoneNumber, 
            pickUpSpecialInstructions: pickUpSpecialInstructions, 
            pickUpCity:pickUpCity,
            pickUpAddressLat: pickUpAddressLat,
            pickUpAddressLng: pickUpAddressLng,
            dropOffContactPerson: dropOffContactPerson, 
            dropOffPhoneNumber: dropOffPhoneNumber, 
            dropOffSpecialInstructions: dropOffSpecialInstructions, 
            dropOffCity:dropOffCity,
            dropOffAddressLat: dropOffAddressLat,
            dropOffAddressLng: dropOffAddressLng,
            sliderValue: sliderValue,
            service: service,
            operation: operation,
            postId: postId,
          })} 
          style={styles.button}>
            <Text style={styles.buttonTitle}>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
    )
}
