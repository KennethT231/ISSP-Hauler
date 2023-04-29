import React, { useState, useEffect, useContext } from "react";
import { createPaymentIntent, markPostPaid, getOneServiceProvider } from "../../../network";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

const getServiceProvider = async (uid) => {
  const serviceProvider = await getOneServiceProvider(uid)
  return serviceProvider //make this set the state and call it in use effect instead?
}

// Payment Sheet Screen
export default function PaymentSheet({ navigation, route }) {
  const post = route.params.post;
  console.log('post from payment sheet', post)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null)

  // need to add servive provider strip account id to schem and post here
  const fetchPaymentSheetParams = async () => {
    const serviceProviderFetch = await getServiceProvider(post.acceptedServiceProvider)
    // get service provider after payment made
    console.log({ serviceProviderFetch })
    setServiceProvider(serviceProviderFetch)
    const intent = await createPaymentIntent(
      post._id,
      post.acceptedPrice,
      serviceProviderFetch.stripeAcc
    );
    console.log({ intent })
    return intent;
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams();
    console.log({ paymentIntent })
    setSecret(paymentIntent);
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Hauler",
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    console.log('secret', secret);
    const { error } = await presentPaymentSheet({
      clientSecret: secret,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      await markPostPaid(post._id)
      //Alert.alert("Success", "Your order is confirmed!");
      navigation.navigate('Confirmation', { confirm: 'paid' });
    }
  };
  return (
    <StripeProvider
      publishableKey="pk_test_51M23WVAZXbnAuaLLQ0DTyBlLUIlAiEfXDMG08JJnObkdAfPcWosN99cklgD4fmgsnfqAt8ZDFYzCpjAyXwxwRid00007njU21F"
      merchantIdentifier="hauler-app"
    >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoKey}>Post Details:</Text>
          <Text style={styles.infoValue}>{post.postHeading}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoKey}>Transaction amount:</Text>
          <Text style={styles.infoValue}>{post.acceptedPrice}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoKey}>Driver for this job:</Text>
          {serviceProvider && <Text style={styles.infoValue}>{serviceProvider.firstName}</Text>}
        </View>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </View>
    </StripeProvider>);
}

//     const { signup, currentUser } = useContext(Context)
//     const [creditCardNumber, setCreditCardNumber] = useState('')
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState('')
//     const [expiryDate, setExpiryDate] = useState('')
//     const [cvv, setCvv] = useState('')
//     const [cardHolderName, setCardHolderName] = useState('')
//     const number = creditCardNumber
//     const cvc = cvv
//     const { image, firstName, lastName, email, password, confirmPassword, contactNumber, province, city, streetAddress, unitNumber, dateOfBirth} = route.params ? route.params : {image: "http://2019wcsg.ca/wp-content/uploads/2018/01/profile-placeholder.png", firstName: "test", lastName: "test", email: 'test@test.com', password: "123456", confirmPassword: "123456", contactNumber: "1234567890", province:  "test", city: "test", streetAddress: "123 test drive", unitNumber: "1234", dateOfBirth: "idk" }

//     const onSignUpClicked = async () => {
//         if (password !== confirmPassword) {
//             setError("Password does not match")
//             return
//         }
//         try {
//             setError("")
//             setLoading(true)
//             const response = await signup(email, password)
//             const currentUid = response.user.uid
//             await signUp(
//                 currentUid,
//                 firstName,
//                 lastName,
//                 image,
//                 dateOfBirth,
//                 province,
//                 city,
//                 streetAddress,
//                 unitNumber,
//                 email,
//                 contactNumber,
//                 cardHolderName,
//                 creditCardNumber,
//                 expiryDate,
//                 cvv
//             )
//             navigation.navigate('MyPostList')
//         } catch (err) {
//             setError(err.message)
//         }
//         setLoading(false)
//     }

//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <View
//                     style={{ flex: 1, width: '100%' }}>

//                     <Text > {error && alert(error)}</Text>
//                     <Text style={styles.text1}> Add Your Card Details </Text>

//                     <View style={styles.details}>
//                     <Text style={styles.text}> Card Holder Name : </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholderTextColor="#C0C0C0"
//                         onChangeText={(name) => { setError(""); setCardHolderName(name) }}
//                         value={cardHolderName}
//                     />
//                     <Text style={styles.text}> Card Number : </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholderTextColor="#C0C0C0"
//                         keyboardType='numeric'
//                         maxLength={16}
//                         onChangeText={(number) => { setError(""); setCreditCardNumber(number) }}
//                         value={creditCardNumber}
//                     />

//                     <Text style={styles.text}> Expiry Date : </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholderTextColor="#C0C0C0"
//                         keyboardType='numeric'
//                         maxLength={4}
//                         onChangeText={(date) => { setError(""); setExpiryDate(date) }}
//                         value={expiryDate}
//                     />

//                     <Text style={styles.text}> CVV : </Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholderTextColor="#C0C0C0"
//                         secureTextEntry
//                         keyboardType='numeric'
//                         maxLength={4}
//                         onChangeText={(cvv) => { setError(""); setCvv(cvv) }}
//                         value={cvv}
//                     />

// {/*==========================================functionality to display and validate the card type======================= */}
//                     <View style={styles.card}>
//                     <CreditCardDisplay
//                         number={number}
//                         cvc={cvc}
//                         expiration="00/00"
//                         name="XXXXXXXXXXXXXXXXXXX"
//                         since="XXXX"
//                         height = {200}
//                         width = {350}
//                         flipped = {false}
//                         fontSize = {18}
//                     />
//                     </View>
//                     </View>

//                     <TouchableOpacity
//                         style={styles.button}
//                         disabled={loading}
//                         onPress={() => onSignUpClicked()}>
//                         <Text style={styles.buttonTitle}>Create account</Text>
//                     </TouchableOpacity>
//                     <View style={styles.option}>
//                         <Text style={styles.optionText}>
//                             Already have an account?
//                         <Text style={styles.optionLink}
//                                 onPress={() => navigation.navigate('Signin')}>
//                                 Log in</Text>
//                         </Text>
//                         <Text style={styles.email}>
//                             Current user : {currentUser && currentUser.email}
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </ScrollView>
//     )
// }

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  infoContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  infoKey: {
    color: "#A9A9A9",
    width: 140,
  },
  infoValue: {
    marginRight: 10,
    width: "65%",
    fontWeight: "bold",
  },
  infoValue1: {
    marginRight: 10,
    fontWeight: "bold",
    paddingTop: 8,
  },
});
