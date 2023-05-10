import React, { useContext } from 'react'
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import ServiceScreenNavigator from './ServiceScreenNavigator';
import ProfileNavigator from './ProfileNavigator';
import { Context } from '../../context/ContextProvider';



const Drawer = createDrawerNavigator();

// this is for android
export default function NavigationScreen(navigation) {

    const { currentUser } = useContext(Context)

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                )
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeNavigator}
            />
            {currentUser ? <><Drawer.Screen
                name="Post A Job"
                component={ServiceScreenNavigator}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileNavigator}
            /></> : null}
        </Drawer.Navigator>
    )
}





