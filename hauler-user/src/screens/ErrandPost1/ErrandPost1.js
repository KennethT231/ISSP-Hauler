import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, Picker, ScrollView, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import SelectWeight from '../../components/SelectWeight/SelectWeight'
import { Ionicons } from '@expo/vector-icons';
import { getOnePost } from '../../../network';

// Post A Job Page1 Screen - First page of the post a job process(Moving, Errand)
export default function ErrandPost1({ navigation, route }) {

  const { service, operation, postId } = route.params;
  const [selectedweight, setSelectedWeight] = useState('')
  const [selectedquantity, setSelectedQuantity] = useState(1)
  const [image, setImage] = useState(null);
  const [postHeading, setPostHeading] = useState('')
  const [description, setDescription] = useState('')

  const [disable, setDisable] = useState(false)
  const onPlusPress = () => {
    setDisable(false)
    let newNum = selectedquantity + 1
    setSelectedQuantity(newNum)
  }
  const onMinusPress = () => {
    if (selectedquantity > 1) {
      let newNum = selectedquantity - 1
      setSelectedQuantity(newNum)
    }
    else {
      setDisable(true)
    }
  }

  useEffect(() => {
    (async () => {
      if (operation === "edit") {
        const post = await getOnePost(postId)
        setSelectedWeight(post.loadWeight)
        setSelectedQuantity(post.numberOfItems)
        setPostHeading(post.postHeading)
        setDescription(post.postDescription)
      }
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      const source = { uri: result.assets[0].uri }
      console.log(source)
      setImage(source)
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.text}> Post Headings : </Text>
        <TextInput style={styles.inputLine1}
          onChangeText={(postHeading) => { setPostHeading(postHeading) }}
          value={postHeading}
        />

        <Text style={styles.text}> Post Description : </Text>
        <TextInput style={styles.inputLine1}
          multiline
          onChangeText={(description) => { setDescription(description) }}
          value={description}
        />

        <SelectWeight
          selectedweight={selectedweight}
          setSelectedWeight={setSelectedWeight}
        />

        <View style={styles.view}>
          <Text style={styles.text}> Number of Items : </Text>
          <TouchableOpacity activeOpacity={0.5} disabled={disable} onPress={() => onMinusPress()} style={styles.TouchableOpacityStyle}>
            <Ionicons name="remove-circle-outline" size={24} color="#0177FC" /></TouchableOpacity>
          <Text style={styles.numberDisplay}> {selectedquantity} </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={() => onPlusPress()} style={styles.TouchableOpacityStyle}>
            <Ionicons name="add-circle-outline" size={24} color="#0177FC" />
          </TouchableOpacity>

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
            <Text style={styles.buttonTitle}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image?.uri }} style={styles.imageDisplay} />}
        </View>


        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ErrandPost2', {
            selectedweight: selectedweight,
            image: image,
            selectedquantity: selectedquantity,
            postHeading: postHeading,
            description: description,
            service: service,
            operation: operation,
            postId: postId
          })} style={styles.button}><Text style={styles.buttonTitle}>Next</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    minHeight: 600,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },

  inputLine1: {
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

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageDisplay: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },

  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
  },

  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },

  text: {
    color: '#000000',
    marginLeft: 25,
    fontWeight: 'bold',
    marginTop: 20
  },

  TouchableOpacityStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginLeft: 10
  },

  view: {
    flexDirection: 'row',
    marginTop: 25,
    height: 60,
    width: '90%',
    borderColor: '#3d3b3b',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 30,
    paddingLeft: 16,
  },

  numberDisplay: {
    color: 'black',
    fontSize: 20,
    paddingTop: 15,
    marginLeft: 10
  },

  footerContainer: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },

});