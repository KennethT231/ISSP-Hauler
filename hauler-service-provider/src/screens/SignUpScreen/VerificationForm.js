import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { signUp } from '../../../network';

export default function VerificationForm({ navigation, route }) {
    const [code, setCode] = useState("")

    const onSignUpPressWithVerification = async () => {
        try {
            const response = await signUp(route.params.currentUid, route.params.firstName, route.params.lastName, route.params.image, route.params.dateOfBirth, route.params.province, route.params.city, route.params.streetAddress, route.params.unitNumber, route.params.email, route.params.vehicleType, route.params.serviceLocation, route.params.contactNumber, code)
            console.log("response in verification: ", response);
            if (response.status === 201) {
                navigation.navigate("Home");
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

            <View style={styles.codeInputContainer}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                    <TextInput
                        key={index}
                        style={styles.codeInput}
                        maxLength={1}
                        keyboardType="number-pad"
                        onChangeText={(value) => {
                            let newCode = code.split('');
                            newCode[index - 1] = value;
                            setCode(newCode.join(''));
                        }}
                        value={code[index - 1]}
                    />
                ))}
            </View>

            <Text style={styles.codeText}>Please enter the 6-digit code sent to you:</Text>

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
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    codeInput: {
        backgroundColor: '#f5f5f5',
        width: 45,
        height: 45,
        borderRadius: 10,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    codeText: {
        color: '#333',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
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

