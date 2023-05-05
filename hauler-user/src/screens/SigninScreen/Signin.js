import React, { useState, useContext, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { Context } from '../../context/ContextProvider';
import styles from './SigninCss';

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
            const userSignIn = await signin(email, password)
            // console.log('userSignIn: ', userSignIn)
            navigation.navigate('MyPostList')
        } catch {
            setError("Failed to Login")
        }
        setLoading(false)
    }

    useEffect(() => {
        // console.log('currentUser from sign in: ', currentUser)
        if (currentUser) {
            navigation.navigate('MyPostList')
        }
    }, [currentUser])

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
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
