import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import Profile1 from '../ProfileScreen/Profile1'
import paymentSheet from '../SignupScreen/paymentSheet';

const PaymentStack = createStackNavigator();

const PaymentNavigator = () => {
    return (
        <PaymentStack.Navigator
            initialRouteName='Payment1'
            screenOptions={{
                headerShown: true,
                title: '',
            }}>
            <PaymentStack.Screen
                name='Payment1'
                component={paymentSheet}
            />
            
        </PaymentStack.Navigator>
    );
};

export default PaymentNavigator;
