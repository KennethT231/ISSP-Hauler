import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from "react-native";
import { signUp, createStripeAccount } from '../../../network';
import OTPInputView from "@twotalltotems/react-native-otp-input";

export default function VerificationForm({ navigation, route }) {
    const [code, setCode] = useState('');

    const onSignUpPressWithVerification = async () => {
        try {
            const response = await signUp(route.params.currentUid, route.params.firstName, route.params.lastName, route.params.image, route.params.dateOfBirth, route.params.province, route.params.city, route.params.streetAddress, route.params.unitNumber, route.params.email, route.params.contactNumber, code, route.params.vehicleType, route.params.serviceLocation)

            console.log("data: ", route.params.currentUid, route.params.firstName, route.params.lastName, route.params.image, route.params.dateOfBirth, route.params.province, route.params.city, route.params.streetAddress, route.params.unitNumber, route.params.email, route.params.contactNumber, code, route.params.vehicleType, route.params.serviceLocation);
            console.log("response in verification: ", response);
            console.log("code in verification: ", code);
            if (response.status === 201) {
                const appUrl = await Linking.getInitialURL()
                const stripeUrl = await createStripeAccount(email, appUrl, currentUid)
                console.log('stripe url', stripeUrl)
                await Linking.openURL(stripeUrl)

                navigation.navigate("Home");
                Alert.alert("You have successfully signed up!");
            } else {
                Alert.alert("Please enter the correct code");
            }
        } catch (error) {
            console.log("error in verification: ", error);
            Alert.alert(error.message);
        }
    }

    return <View style={styles.container}>
        <View style={styles.regform}>
            <Text style={styles.header}>
                2-Step Verification
            </Text>

            <View style={styles.container}>
                <OTPInputView
                    style={{ width: "100%", height: 200 }}
                    pinCount={6}
                    code={code}
                    onCodeChanged={code => setCode(code)}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                />
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
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: "black",
        fontSize: 20,
    },
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
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

