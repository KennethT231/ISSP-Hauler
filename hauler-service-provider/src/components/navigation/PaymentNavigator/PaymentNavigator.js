import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentSheet from '../../../screens/SignUpScreen/paymentSheet';

const PaymentStack = createStackNavigator();

const PaymentNavigator = () => {
    return (
        <PaymentStack.Navigator
            initialRouteName='Payment1'
            screenOptions={{
                headerShown: false,
                title: '',
            }}>
            <PaymentStack.Screen
                name='Payment1'
                component={PaymentSheet}
            />

        </PaymentStack.Navigator>
    );
};

export default PaymentNavigator;
