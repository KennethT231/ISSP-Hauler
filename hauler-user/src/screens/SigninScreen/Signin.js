import React, { useState, useContext } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { Context } from '../../context/ContextProvider';
import { StyleSheet } from 'react-native';

export default function Signin({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const { signin, currentUser } = useContext(Context)

    const onSigninClicked = async () => {

        try {
            setError("")
            setLoading(true)
            await signin(email, password)
            navigation.navigate('MyPostList')
        } catch {
            setError("Failed to Login")
        }
        setLoading(false)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                    <View
                        style={{ flex: 1, width: '100%' }}>
                        <Image source={require('../../../assets/haulerLogo.png')} style={styles.logo} />
                        <Text > {error && alert(error)}</Text>
                    <View style={styles.display}>
                        <Text style={styles.text1}> Email : </Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#C0C0C0"
                                onChangeText={(email) => { setError(""); setEmail(email) }}
                                value={email}
                            />

                        <Text style={styles.text2}> Password : </Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#C0C0C0"
                                secureTextEntry
                                onChangeText={(password) => { setError(""); setPassword(password) }}
                                value={password}
                            />
                        <TouchableOpacity
                            style={styles.button}
                            disabled={!!loading} // added !!
                            onPress={() => onSigninClicked()}>
                            <Text style={styles.buttonTitle}>Sign In</Text>
                        </TouchableOpacity>
                        <View style={styles.option}>
                            <Text style={styles.optionText}>
                                Don't have an account?
                                <Text style={styles.optionLink}
                                onPress={() => navigation.navigate('Signup')}>
                                    Register</Text>
                            </Text>
                            <Text style={styles.email}>
                                Current user : {currentUser && currentUser.email}
                            </Text>
                        </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 160,
        height: 160,
        alignSelf: 'center',
        marginTop: 100,
    },
    input: {
        height: 40,
        width: '80%',
        borderBottomWidth: 1.0,
        borderColor: '#BFBFBF',
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    email: {
        color: '#BFBFBF',
        textAlign: 'center'
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
    option: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    optionText: {
        fontSize: 16,
        color: '#BFBFBF'
    },
    optionLink: {
        color: "#BB4430",
        fontWeight: "bold",
        fontSize: 16
    },
    text1: {
        color: '#BFBFBF',
        marginLeft: 35
    },
    text2: {
        color: '#BFBFBF',
        marginLeft: 35,
        marginTop: 20
    },
    display: {
        paddingTop: 120
    }
})