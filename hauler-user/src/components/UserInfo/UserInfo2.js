import React from 'react'
import {StyleSheet, Text, View, TextInput } from 'react-native'

export default function UserInfo2 ({ creditCardNumber, expiryDate, cvv, setCreditCardNumber, setExpiryDate,
    setCvv, setError}) {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Card Number</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(number) => { setError(""); setCreditCardNumber(number) }}
                value={creditCardNumber}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>Expiry Date</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(date) => { setError(""); setExpiryDate(date) }}
                value={expiryDate}
            />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.infoKey}>CVV</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='#C0C0C0'
                onChangeText={(cvv) => { setError(""); setCvv(cvv) }}
                value={cvv}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 15
    },
    infoKey: {
        color: '#A9A9A9',
        width: 110,
    },
    input: {
        height: 18,
        overflow: 'hidden',
        // marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        paddingLeft: 16,
        width: '65%',
        borderBottomWidth: 1.0,
        borderColor: '#BFBFBF',
        marginRight: 10
    },
})