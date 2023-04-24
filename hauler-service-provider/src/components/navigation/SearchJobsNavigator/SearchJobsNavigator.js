import React from 'react';
import MenuIcon from '../MenuIcon/MenuIcon'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import SearchJobs from '../../../screens/SearchJobsScreen/SearchJobs';
import PostDetails from '../../../screens/PostDetailScreen/PostDetail';
import JobConfirmation from '../../../screens/JobConfirmationScreen/JobConfirmationScreen';
import OfferConfirmation from '../../../screens/OfferConfirmationScreen/OfferConfirmation';
import OfferDetails from '../../../screens/OfferDetailsScreen/OfferDetails';

const SearchStack = createStackNavigator();

const SearchJobsNavigator = () => {
    return (
        <SearchStack.Navigator
            initialRouteName='SearchJobs'
            screenOptions={{
                headerShown: false,
            }}
        >
            <SearchStack.Screen
                name='SearchJobs'
                component={SearchJobs}
                // options={
                //     Platform.OS === 'android'
                //         ? {
                //             headerRight: () => <MenuIcon />,
                //         }
                //         : {
                //             headerTitle: 'Search',
                //         }
                // }
            />
            <SearchStack.Screen
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
            <SearchStack.Screen
                name='JobConfirmation'
                component={JobConfirmation}
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
            <SearchStack.Screen
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
            <SearchStack.Screen
                name='OfferConfirmation'
                component={OfferConfirmation}
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
        </SearchStack.Navigator>
    );
};

export default SearchJobsNavigator;
