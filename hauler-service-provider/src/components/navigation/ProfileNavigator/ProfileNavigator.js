import React from 'react';
import MenuIcon from '../MenuIcon/MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../screens/ProfileScreen/Profile';

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName='ProfileS'
            screenOptions={{
                headerShown: true,
                title: '',
            }}>
            <ProfileStack.Screen
                name='Profile'
                component={Profile}
                // options={{headerTitle: 'Profile', headerRight: () => <MenuIcon /> }}
            />
        </ProfileStack.Navigator>
    );
};

export default ProfileNavigator;
