import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceProviderScreen from '../ServiceProviderScreen/ServiceProviderScreen';
import ServiceScreenNavigator from './ServiceScreenNavigator'

const ServiceProviderStack = createStackNavigator();

const ServiceProviderNavigator = () => {
    return (
        <ServiceProviderStack.Navigator initialRouteName='ServiceProviderScreen' screenOptions={{
            headerShown: true,
            title: '',
        }}>
            <ServiceProviderStack.Screen name='ServiceProviderScreen' component={ServiceProviderScreen} options={{ headerRight: () => <MenuIcon /> }} />
            <ServiceProviderStack.Screen name='' component={ServiceScreenNavigator} options={{ headerRight: () => <MenuIcon /> }} />
        </ServiceProviderStack.Navigator>
    );
};

export default ServiceProviderNavigator;