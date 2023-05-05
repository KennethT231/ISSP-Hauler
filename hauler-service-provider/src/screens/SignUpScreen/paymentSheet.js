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
