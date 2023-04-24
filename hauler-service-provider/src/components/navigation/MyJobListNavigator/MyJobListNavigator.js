import React from 'react';
import MenuIcon from '../MenuIcon/MenuIcon'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import MyJobList from '../../../screens/MyJobListScreen/MyJobList';
import StatusDetails from '../../../screens/StatusDetailsScreen/StatusDetails';
import OfferConfirmation from '../../../screens/OfferConfirmationScreen/OfferConfirmation';
import JobConfirmation from '../../../screens/JobConfirmationScreen/JobConfirmationScreen';
import PostDetails from '../../../screens/PostDetailScreen/PostDetail';
import OfferDetails from '../../../screens/OfferDetailsScreen/OfferDetails';
import Map from '../../map/Map';

const MyJobListStack = createStackNavigator();

const MyJobListNavigator = () => {
    return (
        <MyJobListStack.Navigator
            initialRouteName='MyJobList'
            screenOptions={{
                headerShown: false,
            }}
        >
            <MyJobListStack.Screen
                name='MyJobList'
                component={MyJobList}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: 'Job List',
                //         }
                // }
            />
            <MyJobListStack.Screen
                name='StatusDetails'
                component={StatusDetails}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: '',
                //         }
                // }
            />
            <MyJobListStack.Screen
                name='OfferConfirmation'
                component={OfferConfirmation}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: 'Confirmation',
                //         }
                // }
            />
            <MyJobListStack.Screen
                name='PostDetails'
                component={PostDetails}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: '',
                //         }
                // }
            />
            <MyJobListStack.Screen
                name='OfferDetails'
                component={OfferDetails}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: '',
                //         }
                // }
            />
            <MyJobListStack.Screen
                name='JobConfirmation'
                component={JobConfirmation}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: 'Confirmation',
                //         }
                // }
            />
            <MyJobListStack.Screen
                name='LiveTrackingMap'
                component={Map}
                // options={
                //     Platform.OS === 'android'
                //         ? { 
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: 'Live Tracking',
                //         }
                // }
            />
        </MyJobListStack.Navigator>
    );
};

export default MyJobListNavigator;
