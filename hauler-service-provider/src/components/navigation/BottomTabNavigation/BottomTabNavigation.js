import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SearchJobsNavigator from '../SearchJobsNavigator/SearchJobsNavigator';
import MyJobListNavigator from '../MyJobListNavigator/MyJobListNavigator';
import Profile from '../../../screens/ProfileScreen/Profile';
import HomeNavigator from '../HomeNavigator/HomeNavigator';
import { Context } from '../../../context/ContextProvider';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const { currentUser } = useContext(Context)
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            screenOptions={{
                "tabBarHideOnKeyboard": true,
                "tabBarShowLabel": false,
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
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
            {currentUser ?
            <>
            <BottomTab.Screen
                name='SearchJobsNavigator'
                component={SearchJobsNavigator}
                options={{
                    tabBarIcon: () =>
                        <FontAwesome name='search' size={25} color='black' />,
                    drawerLabel: 'Search Jobs',
                }}
            />
            <BottomTab.Screen
                name='MyJobListNavigator'
                component={MyJobListNavigator}
                options={{
                    tabBarIcon: () =>
                        <FontAwesome5 name="list-ul" size={25} color="black" />,
                    drawerLabel: 'My Job List',
                }}
            />
             <BottomTab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: () =>
                        <FontAwesome name="user" size={25} color="black" />,
                    drawerLabel: 'Account',
                }}
            /> </>: null}
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
