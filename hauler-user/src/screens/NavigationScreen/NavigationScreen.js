import React, { Fragment } from 'react'
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import ServiceScreenNavigator from './ServiceScreenNavigator';
import ProfileNavigator from './ProfileNavigator';
import SignOutButton from '../../components/SignOutButton';
import { useContext, useState } from "react";
import { Context } from '../../context/ContextProvider';



const Drawer = createDrawerNavigator();

// this is for android
export default function NavigationScreen(navigation) {

    const { signin, currentUser } = useContext(Context)

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        {/*<SignOutButton />*/}
                    </DrawerContentScrollView>
                )
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeNavigator}
            />
            <Drawer.Screen
                name="Post A Job"
                component={ServiceScreenNavigator}
            />
            {currentUser ? <Drawer.Screen
                name="Profile"
                component={ProfileNavigator}
            /> : null}
        </Drawer.Navigator>
    )
}





