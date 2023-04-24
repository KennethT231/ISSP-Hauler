import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuIcon from '../MenuIcon/MenuIcon';
import HomeNavigator from '../HomeNavigator/HomeNavigator';
import SearchJobsNavigator from'../SearchJobsNavigator/SearchJobsNavigator';
import MyJobListNavigator from '../MyJobListNavigator/MyJobListNavigator';
import ProfileNavigator from '../ProfileNavigator/ProfileNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        // options={{ headerTitle: 'Home', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name="Search Jobs"
        component={SearchJobsNavigator}
        // options={{ headerTitle: 'Home', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name="My JobList"
        component={MyJobListNavigator}
        // options={{ headerTitle: 'My Job List', headerRight: () => <MenuIcon /> }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
        // options={{ headerTitle: 'Profile', headerRight: () => <MenuIcon /> }}
      />
    </Drawer.Navigator>
  );
}
