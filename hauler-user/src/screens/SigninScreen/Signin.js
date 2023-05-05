import React, { useState, useContext, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, StyleSheet } from 'react-native'
import { Context } from '../../context/ContextProvider';

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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: -20,
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
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#8f8f8f',
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 16,
    paddingLeft: 16,
  },

  email: {
    color: '#BFBFBF',
    textAlign: 'center',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#1970d4',
    alignSelf: 'center',
    marginVertical: 10,
    width: '80%',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0177FC',
    marginTop: 40,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 5,
    marginRight: 20,
  },

  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  option: {
    flex: 1,
    minWidth: '100%',
    alignItems: 'center',
    marginTop: 20,
  },

  optionText: {
    fontSize: 16,
    color: '#BFBFBF',
    marginRight: 10,
  },

  optionLink: {
    color: '#BB4430',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },

  text1: {
    color: '#1f1919',
    marginLeft: 35,
    fontSize: 16,
  },

  text2: {
    color: '#1f1919',
    marginLeft: 35,
    marginTop: 20,
    fontSize: 16,
  },

  display: {
    paddingTop: 120,
  }

});
