import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import ServiceScreenNavigator from './ServiceScreenNavigator';
import ProfileNavigator from './ProfileNavigator';
import { Context } from '../../context/ContextProvider';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    const { currentUser } = useContext(Context)
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
            {currentUser ? <><BottomTab.Screen
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
                    // headerRight: () => <MenuIcon />,
                }}
            />
            <BottomTab.Screen
                name='Profile'
                component={ProfileNavigator}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="user" size={25} color="black" />
                    ),
                    // headerRight: () => <MenuIcon />,
                }}
            /></> : null}
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
