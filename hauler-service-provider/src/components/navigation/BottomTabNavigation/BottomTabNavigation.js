import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SearchJobsNavigator from '../SearchJobsNavigator/SearchJobsNavigator';
import MyJobListNavigator from '../MyJobListNavigator/MyJobListNavigator';
import Profile from '../../../screens/ProfileScreen/Profile';
import HomeNavigator from '../HomeNavigator/HomeNavigator';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                goBack: 'history',
                style: {
                    backgroundColor: 'grey',
                    height: '8%',
                },
            }}
        >
            <BottomTab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: () =>
                        <FontAwesome name="home" size={25} color="black" />,
                }}
            />
            <BottomTab.Screen
                name='SearchJobsNavigator'
                component={SearchJobsNavigator}
                options={{
                    tabBarIcon: () =>
                        <FontAwesome name='search' size={25} color='black' />,
                }}
            />
            <BottomTab.Screen
                name='MyJobListNavigator'
                component={MyJobListNavigator}
                options={{
                    tabBarIcon: () =>
                    <FontAwesome5 name="list-ul" size={25} color="black" />
                }}
            />
            <BottomTab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: () =>
                    <FontAwesome name="user" size={25} color="black" />
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
