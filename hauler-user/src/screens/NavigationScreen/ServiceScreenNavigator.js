import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceScreen from '../ServiceScreen/ServiceScreen';
import MenuIcon from './MenuIcon';
import AddJunkNavigator from './AddJunkNavigator';
import ErrandNavigator from './ErrandNavigator';

const ServiceScreenStack = createStackNavigator()
export default function ServiceScreenNavigator() {
    return (
        <ServiceScreenStack.Navigator
            initialRouteName='Post A Job1'
            screenOptions={{
                headerShown: false,
                title: '',
            }}
        >
            <ServiceScreenStack.Screen
                name='Post A Job1'
                component={ServiceScreen}
            // options={{ headerRight: () => <MenuIcon /> }}
            />
            <ServiceScreenStack.Screen name='AddJunkNavigator' component={AddJunkNavigator} options={{ headerShown: false }} />
            <ServiceScreenStack.Screen name='ErrandNavigator' component={ErrandNavigator} options={{ headerShown: false }} />
        </ServiceScreenStack.Navigator>

    )
}