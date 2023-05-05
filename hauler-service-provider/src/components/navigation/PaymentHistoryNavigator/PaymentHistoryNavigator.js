import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentHistory from '../../../screens/PaymentHistory/PaymentHistory'

const PaymentHistoryScreenStack = createStackNavigator()
export default function PaymentHistoryScreenNavigator() {
    return (
        <PaymentHistoryScreenStack.Navigator initialRouteName='PaymentHistory' screenOptions={{
            headerShown: true,
            title: 'PaymentHistory',
        }}>
            <PaymentHistoryScreenStack.Screen name='PaymentHistory' component={PaymentHistory} options={{
                headerTitle: '',
                headerShown: false
            }} />
        </PaymentHistoryScreenStack.Navigator>
    )
}