import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TextInput, SafeAreaView, Picker, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {getOnePost} from '../../../network';
import ReactNativePhoneInput from 'react-native-phone-input';

export default function ErrandPost4({ navigation, route }) {

  const [pickContactPerson, setPickContactPerson] = useState('')
  const [pickUpPhoneNumber, setPickUpPhoneNumber] = useState('')
  const [pickUpSpecialInstructions, setPickUpSpecialInstructions] = useState('')
  const [dropOffContactPerson, setDropOffContactPerson] = useState('')
  const [dropOffPhoneNumber, setDropOffPhoneNumber] = useState('')
  const [dropOffSpecialInstructions, setDropOffSpecialInstructions] = useState('')
  const [sliderValue, setSliderValue] = useState(50);
  const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, dropOffAddress, service, dropOffCity, dropOffAddressLat, dropOffAddressLng, operation, postId, pickUpCity, pickUpAddressLat, pickUpAddressLng } = route.params;

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
          {/*<TextInput style={styles.inputLine1}
            keyboardType='numeric' 
            onChangeText={(phoneNumber) => {setPickUpPhoneNumber(phoneNumber)}}
            value={pickUpPhoneNumber}
          />*/}
          <ReactNativePhoneInput
            onChangePhoneNumber={(phoneNumber) => { setPickUpPhoneNumber(phoneNumber) }}
            initialCountry={'ca'}
            //initialValue="13178675309"
            //textProps={{
            //    placeholder: '(XXX) XXX-XXXX'
            //}}
            //textComponent={TextInput}
            style={styles.inputLine1}
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
          {/*<TextInput style={styles.inputLine1}
            keyboardType='numeric' 
            onChangeText={(phoneNumber) => {setDropOffPhoneNumber(phoneNumber)}}
            value={dropOffPhoneNumber}
          />*/}
          <ReactNativePhoneInput
            onChangePhoneNumber={(phoneNumber) => { setDropOffPhoneNumber(phoneNumber) }}
            initialCountry={'ca'}
            //initialValue="13178675309"
            //textProps={{
            //    placeholder: '(XXX) XXX-XXXX'
            //}}
            //textComponent={TextInput}
            style={styles.inputLine1}
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
            pickUpAddress: pickUpAddress,
            dropOffAddress: dropOffAddress,
            pickContactPerson: pickContactPerson,
            pickUpPhoneNumber: pickUpPhoneNumber,
            pickUpSpecialInstructions: pickUpSpecialInstructions,
            pickUpCity: pickUpCity,
            pickUpAddressLat: pickUpAddressLat,
            pickUpAddressLng: pickUpAddressLng,
            dropOffContactPerson: dropOffContactPerson,
            dropOffPhoneNumber: dropOffPhoneNumber,
            dropOffSpecialInstructions: dropOffSpecialInstructions,
            dropOffCity: dropOffCity,
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

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   //alignItems: 'center',
  //   marginVertical: 20
  // },

  container: {
    display: 'flex',
    minHeight: 600,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 15,
    backgroundColor: '#f0f0f0',
  },

  screenHeading: {
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 20
  },

  inputLine1: {
    height: 25,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 30,
    paddingLeft: 16,
    width: '90%',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 30,
    paddingLeft: 16,
    width: '90%',
    height: 40,
    borderColor: '#3d3b3b',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  inputLine2: {
    height: 100,
    width: '90%',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 1.0,
    borderColor: '#BFBFBF'
  },

  button: {
    backgroundColor: '#1970d4',
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: '#0177FC',
    marginTop: 30,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5
  },

  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },

  text: {
    color: '#000000',
    marginLeft: 25,
    fontWeight: 'bold',
    marginTop: 20
  },

  containerSlider: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  pickup: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 18,
    fontWeight: 'bold'
  },

  dropOff: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 18,
    paddingTop: 20,
    fontWeight: 'bold'
  }

});
