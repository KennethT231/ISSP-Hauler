import React from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import Profile1 from '../ProfileScreen/Profile1'

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName='Profile1'
            screenOptions={{
                headerShown: false,
                title: '',
            }}>
            <ProfileStack.Screen
                name='Profile1'
                component={Profile1}
            // options={{ headerTitle: 'Profilesadfasdf', headerRight: () => <MenuIcon /> }}
            />

        </ProfileStack.Navigator>
    );
};

export default ProfileNavigator;
