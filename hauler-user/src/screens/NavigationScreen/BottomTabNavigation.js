import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import ServiceScreenNavigator from './ServiceScreenNavigator';
import ProfileNavigator from './ProfileNavigator';
import MenuIcon from './MenuIcon';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                ],
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="home" size={25} color="black" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Post A Job"
                component={ServiceScreenNavigator}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="post-add"
                            size={25}
                            color="black"
                        />
                    ),
                    headerRight: () => <MenuIcon />,
                }}
            />
            <BottomTab.Screen
                name='Profile'
                component={ProfileNavigator}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="user" size={25} color="black" />
                    ),
                    headerRight: () => <MenuIcon />,
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
