import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import styles from './AddJunkScreen2Css';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete, GooglePlacesDetailsQuery } from 'react-native-google-places-autocomplete';
//import { GOOGLE_MAP_API } from '@env';
import {getOnePost} from '../../../network'

export default function AddJunkScreen2({ navigation, route }) {

  const { image, selectedweight, selectedquantity, postHeading, description, operation, postId} = route.params;
  const [pickUpAddress, setPickUpAddress] = useState('')
  const [pickUpCity, setPickUpCity] = useState('')
  const [pickUpAddressLat, setPickUpAddressLat] = useState('')
  const [pickUpAddressLng, setPickUpAddressLng] = useState('')

  useEffect(() => {
    (async () => {
      if (operation === "edit"){
        const post = await getOnePost(postId)
        setPickUpAddress(post.pickUpAddress)
        setPickUpCity(post.pickUpCity)
        setPickUpAddressLat(post.pickUpAddressLat)
        setPickUpAddressLng(post.pickUpAddressLng)
      }
    })()
}, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Enter pick up location </Text>
      <GooglePlacesAutocomplete
        styles={{
          textInput: {
            backgroundColor: "#ffffff",
            height: 44,
            borderRadius: 30,
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginHorizontal: 20,
            fontSize: 15,
            flex: 1,
          },
          listView: {
            paddingHorizontal: 20,
          },
        }}
        placeholder={operation==="edit"? pickUpAddress : "Full Address"}
        minLength={2}
        fetchDetails={true}
        onPress={(data, details) => { 
          setPickUpAddress(details.formatted_address), 
          setPickUpCity(details.vicinity),
          setPickUpAddressLat(details.geometry.location.lat)
          setPickUpAddressLng(details.geometry.location.lng)
         }
        }
        value={pickUpAddress}
        onFail={(error) => console.error(error)}
        query={{
          key: "AIzaSyCMvEs9takJvuKNDt0RaIm-xfZH2uCUr-s",
          language: 'en', // language of the results
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AddJunkScreen3', {
        image: image,
        selectedweight: selectedweight,
        selectedquantity: selectedquantity,
        postHeading: postHeading,
        description: description,
        pickUpAddress: pickUpAddress,
        operation: operation,
        postId: postId,
        pickUpCity:pickUpCity,
        pickUpAddressLat: pickUpAddressLat,
        pickUpAddressLng: pickUpAddressLng
      })}
        style={styles.button} >
        <Text style={styles.buttonTitle}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

