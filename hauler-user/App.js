import React from 'react';
import  NavigationScreen from './src/screens/NavigationScreen/NavigationScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {AuthProvider } from './src/context/ContextProvider';
import { Platform } from 'react-native';
import BottomTabNavigation from './src/screens/NavigationScreen/BottomTabNavigation'
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();

const PlatformSpecificNavigator = Platform.select({
  ios: () => BottomTabNavigation,
  android: () => NavigationScreen,
})();

export default function App() {
  return (
      <SafeAreaProvider>
        <StripeProvider
      publishableKey="pk_test_51M23WVAZXbnAuaLLQ0DTyBlLUIlAiEfXDMG08JJnObkdAfPcWosN99cklgD4fmgsnfqAt8ZDFYzCpjAyXwxwRid00007njU21F"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.HAULER" // required for Apple Pay
    >
         <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name = 'Root' component = {PlatformSpecificNavigator} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
        </StripeProvider>
      </SafeAreaProvider>
  );
}
