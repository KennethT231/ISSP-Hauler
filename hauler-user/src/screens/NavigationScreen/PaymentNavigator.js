import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import Profile1 from '../ProfileScreen/Profile1'
import PaymentSheet from '../SignupScreen/paymentSheet';

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
