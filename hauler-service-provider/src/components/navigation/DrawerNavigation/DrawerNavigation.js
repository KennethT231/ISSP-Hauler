import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from '../HomeNavigator/HomeNavigator';
import SearchJobsNavigator from '../SearchJobsNavigator/SearchJobsNavigator';
import MyJobListNavigator from '../MyJobListNavigator/MyJobListNavigator';
import ProfileNavigator from '../ProfileNavigator/ProfileNavigator';
import { Context } from '../../../context/ContextProvider';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { currentUser } = useContext(Context)
  return (
    <Drawer.Navigator
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
      // options={{ headerTitle: 'Home', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name="SearchJobsNavigator"
        component={SearchJobsNavigator}
        options={{
          headerTitle: 'Search Jobs',
          drawerLabel: 'Search Jobs',
          // , headerRight: () => <MenuIcon />
        }}
      />
      <Drawer.Screen
        name="MyJobListNavigator"
        component={MyJobListNavigator}
        options={{
          headerTitle: 'My Job List',
          drawerLabel: 'My Job List',
          // , headerRight: () => <MenuIcon /> 
        }}
      />
      {currentUser ? <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          drawerLabel: 'Account',
          //headerTitle: 'Profile', headerRight: () => <MenuIcon /> 
        }}
      /> : null}
    </Drawer.Navigator>
  );
}
