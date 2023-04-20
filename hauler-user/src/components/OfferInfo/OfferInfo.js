import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native';

export default function OfferInfo({ response, setOffer, onSendOffer, offer, onAccept, onDecline }) {

    return (
        <View style={styles.container}>
            {response ?
                <View>
                    <FlatList
                        style={styles.flatListContainer}
                        data={response.serviceProviderResponseSchema}
                        keyExtractor={(result) => result._id}
                        renderItem={({ item, index }) => {
                            return (
                                item &&
                                <View style={styles.listContainer}>

                                    <View style={styles.response}>
                                        <Text style={styles.heading}>Response </Text>
                                        <Text style={styles.mainResponse}>{item.serviceProviderResponse}: ${item.serviceProviderActionPrice}</Text>
                                        <Text style={styles.responseTime}>{item.timeStamp}</Text>
                                    </View>
                                    {response.userResponseSchema[index] ?
                                        <View style={[styles.response, styles.uResponse]}>
                                            <Text style={styles.heading}>You </Text>
                                            <Text style={styles.mainResponse}>{response.userResponseSchema[index].userResponse}: ${response.userResponseSchema[index].userResponsePrice}</Text>
                                            <Text style={styles.responseTime}>{response.userResponseSchema[index].timeStamp}</Text>
                                        </View> : <View></View>}
                                </View>
                            )
                        }}

                    />
                </View> : <View></View>}
            <View style={styles.footerContainer}>
                <View style={styles.offerContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter offer price'
                        placeholderTextColor='#C0C0C0'
                        onChangeText={(price) => { setOffer(price) }}
                        value={offer}
                    />

                    <TouchableOpacity
                        disabled={response ? response.userActionButtons : false}
                        style={[styles.button, styles.offerButton]}
                        onPress={() => onSendOffer()}>
                        <Text style={[styles.buttonTitle, styles.offerButtonTitle]}>SEND OFFER</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <>
                        <TouchableOpacity
                            disabled={response.userActionButtons}
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => onAccept()}>
                            <Text style={styles.buttonTitle}>ACCEPT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={response.userActionButtons}
                            style={[styles.button, styles.declineButton]}
                            onPress={() => onDecline()}>
                            <Text style={styles.buttonTitle}>DECLINE</Text>
                        </TouchableOpacity>
                    </>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingVertical: '2%',
        width: '100%',
        height: '100%'
    },
    flatListContainer: {
        height: '80%',
        padding: 10,
    },
    response: {
        borderWidth: 5,
        borderColor: '#EAEAEA',
        borderRadius: 20,
        width: 120,
        padding: 6,
        fontSize: 16,
        textAlign: 'center'
    },
    mainResponse: {
        fontSize: 16
    },
    uResponse: {
        alignSelf: 'flex-end',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 16
    },
    responseTime: {
        fontSize: 10,
        color: '#A9A9A9'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    footerContainer:
    {
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    button: {
        marginVertical: 10,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        marginHorizontal: '2%',
    },
    offerButton: {
        backgroundColor: '#E0E0E0',
    },
    acceptButton: {
        backgroundColor: '#0077FC',
    },
    declineButton: {
        backgroundColor: '#DE0303',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    offerButtonTitle: {
        color: 'black'
    },
    offerContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 48,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: '2%',
        paddingHorizontal: 10,
        width: '62%'
    },
})