import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { signUp } from '../../../network';

export default function VerificationForm({ navigation, route }) {
    const [code, setCode] = useState("")

    // console.log("route.params in verification: ", route.params)

    const onSignUpPressWithVerification = async () => {
        try {
            const response = await signUp(route.params.currentUid, route.params.firstName, route.params.lastName, route.params.image, route.params.dateOfBirth, route.params.province, route.params.city, route.params.streetAddress, route.params.unitNumber, route.params.email, route.params.contactNumber, code)
            console.log("response in verification: ", response);
            if (response.status === 201) {
                navigation.navigate("MyPostList");
                Alert.alert("You have successfully signed up!");
            } else {
                Alert.alert("Please enter the correct code");
            }
        } catch (error) {
            console.log("error in verification: ", error);
        }
    }

    return <View style={styles.container}>
        <View style={styles.regform}>
            <Text style={styles.header}>
                2-Step Verification
            </Text>

            <TextInput style={styles.textinput}
                placeholder="Enter the code sent to you"
                value={code}
                onChangeText={setCode}
            ></TextInput>

            <TouchableOpacity
                style={styles.button}
                onPress={onSignUpPressWithVerification}>
                <Text style={styles.btntext}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View >
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingLeft: 60,
        paddingRight: 60,
    },
    regform: {
        alignSelf: "stretch",
    },
    header: {
        fontSize: 24,
        color: "#000",
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: "#199187",
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: "stretch",
        height: 40,
        marginBottom: 30,
        color: "#000",
        borderBottomColor: "navy",
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: "stretch",
        alignItems: "center",
        padding: 20,
        backgroundColor: "navy",
        borderBottomWidth: 1,
    },
    btntext: {
        color: "#fff",
        fontWeight: "bold",
    },
});





