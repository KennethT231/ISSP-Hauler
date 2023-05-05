import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import { GOOGLE_MAP_API } from '@env';
import {getOnePost} from '../../../network'

export default function ErrandPost3({ navigation, route }) {

  const [dropOffAddress, setdropOffAddress] = useState('')
  const [dropOffCity, setDropOffCity] = useState('')
  const [dropOffAddressLat, setDropOffAddressLat] = useState('')
  const [dropOffAddressLng, setDropOffAddressLng] = useState('')

  const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, service, operation, postId, pickUpCity,pickUpAddressLat, pickUpAddressLng } = route.params;

  useEffect(() => {
    (async () => {
      if (operation === "edit") {
        const post = await getOnePost(postId)
        setdropOffAddress(post.dropOffAddress)
        setDropOffCity(post.dropOffCity)
        setDropOffAddressLat(post.dropOffAddressLat)
        setDropOffAddressLng(post.dropOffAddressLng)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter drop off location</Text>
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
          setdropOffAddress(details.formatted_address), 
          setDropOffCity(details.vicinity),
          setDropOffAddressLat(details.geometry.location.lat)
          setDropOffAddressLng(details.geometry.location.lng)
         }
        }
        value={dropOffAddress}
        onFail={(error) => console.error(error)}
        query={{
          key: "AIzaSyCMvEs9takJvuKNDt0RaIm-xfZH2uCUr-s",
          language: 'en', // language of the results
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ErrandPost4', {
        image: image,
        selectedweight: selectedweight,
        selectedquantity: selectedquantity,
        postHeading: postHeading,
        description: description,
        pickUpAddress: pickUpAddress,
        pickUpCity:pickUpCity,
        pickUpAddressLat: pickUpAddressLat,
        pickUpAddressLng: pickUpAddressLng,
        dropOffAddress: dropOffAddress,
        service: service,
        dropOffCity:dropOffCity,
        dropOffAddressLat: dropOffAddressLat,
        dropOffAddressLng: dropOffAddressLng,
        operation: operation,
        postId: postId,
      })}
        style={styles.button} >
        <Text style={styles.buttonTitle}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  text: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },

  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
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
    marginTop:30,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5
  },

});
