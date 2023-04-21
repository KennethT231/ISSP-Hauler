import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { postItem, updateOnePost } from '../../../network';
import PostInfo from '../../components/PostInfo/PostInfo';
import { Context } from '../../context/ContextProvider';

export default function AddJunkSummary({ navigation, route }) {

    const { image, selectedweight, selectedquantity, postHeading, description, pickUpAddress, pickContactPerson, pickUpPhoneNumber, pickUpSpecialInstructions, pickUpCity,
        pickUpAddressLat, pickUpAddressLng, sliderValue, operation, postId } = route.params;

    const service = "Junk"
    const { currentUser } = useContext(Context)

    const [error, setError] = useState('')

    return (
        <ScrollView>
            <View style={styles.container}>
                <PostInfo
                    postHeading={postHeading}
                    description={description}
                    pickUpAddress={pickUpAddress}
                    image={image}
                    selectedweight={selectedweight}
                    selectedquantity={selectedquantity}
                    pickContactPerson={pickContactPerson}
                    pickUpPhoneNumber={pickUpPhoneNumber}
                    pickUpSpecialInstructions={pickUpSpecialInstructions}
                    sliderValue={sliderValue}
                    dropOffAddress=''
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItemScreen')}><Text style={styles.buttonTitle}> Edit </Text></TouchableOpacity>
                {operation === "create" ?
                    <TouchableOpacity style={styles.button}
                        onPress={async () => {
                            await postItem(
                                currentUser.uid,
                                service,
                                postHeading,
                                description,
                                selectedweight,
                                selectedquantity,
                                image,
                                sliderValue,
                                pickUpAddress,
                                pickUpCity,
                                pickUpAddressLat,
                                pickUpAddressLng,
                                pickContactPerson,
                                pickUpPhoneNumber,
                                pickUpSpecialInstructions,
                            ); navigation.navigate('Confirmation', { confirm: 'Post' })
                        }}><Text style={styles.buttonTitle}>Post a Job</Text></TouchableOpacity> :
                    <TouchableOpacity style={styles.button}
                        onPress={async () => {
                            setError('')
                            const res = await updateOnePost(
                                postId,
                                // service,
                                postHeading,
                                description,
                                selectedweight,
                                selectedquantity,
                                // imageUrl,
                                sliderValue,
                                pickUpAddress,
                                pickUpCity,
                                pickUpAddressLat,
                                pickUpAddressLng,
                                pickContactPerson,
                                pickUpPhoneNumber,
                                pickUpSpecialInstructions,
                            );
                            if (res === 'Post updated') {
                                navigation.navigate('Confirmation', { confirm: 'Edit' })
                            } else {
                                setError(res)
                            }
                        }}><Text style={styles.buttonTitle}>Submit Edited Post</Text></TouchableOpacity>}
            </View>
            <Text > {error && alert(error)}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        minHeight: 600,
        paddingVertical: 10
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
    view: {
        flexDirection: 'row'
    }
})