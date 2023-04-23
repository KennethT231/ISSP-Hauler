import React from "react";
import { useContext, useState } from "react";
import { Text } from "react-native-elements";
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../context/ContextProvider";


export default SignOutButton = () => {
    const { signout, currentUser } = useContext(Context)
    const [error, setError] = useState('')

    const onSignOutClicked = async () => {
        try {
            setError("")
            await signout()
            navigation.navigate('Home')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <TouchableOpacity
            style={[styles.buttons, styles.logOutButton]}
            onPress={() => onSignOutClicked()}>
            <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttons: {
        width: '90%',
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    logOutButton: {
        backgroundColor: '#E0E0E0',
        marginTop: 12,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    }
})