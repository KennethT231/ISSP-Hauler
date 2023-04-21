import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Picker } from 'react-native';
import { Context } from '../../context/ContextProvider';

export default function Signin({ navigation }) {
    const { signin, currentUser } = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const onSigninClicked = async () => {
        try {
            setError("")
            setLoading(true)
            await signin(email, password)
            navigation.navigate('Home')
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={{ flex: 1, width: '100%' }}>
                        <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/haulerLogo.png')} style={styles.logo} />
                    </View>
                    <Text > {error && alert(error)}</Text>
                    <Text style={styles.text1}> Email : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='#C0C0C0'
                        onChangeText={(email) => { setError(""); setEmail(email) }}
                        value={email}
                    />
                    <Text style={styles.text1}> Password : </Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='#C0C0C0'
                        secureTextEntry
                        onChangeText={(password) => { setError(""); setPassword(password) }}
                        value={password}
                    />
                    <TouchableOpacity
                        disabled={!!loading}
                        style={styles.button}
                        onPress={() => onSigninClicked()}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.option}>
                        <Text style={styles.optionText}>
                            Create an account?
                        <Text style={styles.optionLink}
                                onPress={() => navigation.navigate('SignUp')}>
                                Register
                                </Text>
                        </Text>
                        <Text style={styles.email}>
                            Current user : {currentUser && currentUser.email}
                        </Text>
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
        paddingVertical: '2%',
        backgroundColor: 'white',
        minHeight: 600,
        justifyContent: 'center',
        paddingBottom: 180,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: 45,
        marginVertical: '1%',
        color: '#2EBCAC',
        fontWeight: "bold",
    },
    input: {
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: 1,
        height: 40,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        marginBottom: 20
    },
    email: {
        color: '#73AB84',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#0077FC',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: 50,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    option: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    optionText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    optionLink: {
        color: '#A9A9A9',
        fontWeight: 'bold',
        fontSize: 16
    },
    logoContainer: {
        marginTop: '10%',
        marginBottom: '10%'
    },
    text1: {
        color: '#BFBFBF',
        marginLeft: '5%'
    },
})

