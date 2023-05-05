import React, { useContext } from 'react';
import MenuIcon from './MenuIcon';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../SigninScreen/Signin';
import MyPostList from '../MyPostListScreen/MyPostList';
import Signup from '../SignupScreen/Signup';
import JobOffers from '../JobOffers/JobOffers';
import AddJunkNavigator from '../NavigationScreen/AddJunkNavigator';
import PaymentSheet from '../SignupScreen/paymentSheet';
import OfferDetails from '../OfferDetailsScreen/OfferDetails';
import PostDetails from '../PostDetailsScreen/PostDetails';
import ErrandScreenNavigator from './ErrandNavigator';
import { Context } from '../../context/ContextProvider';
import Confirmation from '../ConfirmationScreen/Confirmation';
import PaymentNavigator from './PaymentNavigator';
import Map from '../../components/Map/Map';
import PaymentHistoryScreenNavigator from './PaymentHistoryNavigator';
import PaymentDetail from '../PaymentHistory/PaymentDetail';
import VerificationForm from '../SignupScreen/VerificationForm';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
    const { currentUser } = useContext(Context)
    console.log('currentUser: ', currentUser)
    return (
        <HomeStack.Navigator
            initialRouteName='Signin'
            screenOptions={{
                headerShown: true,
                title: 'Hauler',
            }}>
            {!currentUser ?
                <>
                    <HomeStack.Screen
                        name='Signin'
                        component={Signin}
                        options={{ headerShown: false }}
                    />
                    <HomeStack.Screen
                        name='Signup'
                        component={Signup}
                        options={{ headerShown: false }}
                    />
                    <HomeStack.Screen
                        name='SignUpScreen2'
                        component={PaymentSheet}
                        options={{ headerShown: false }}
                    />
                </>
                :
                <>
                    <HomeStack.Screen
                        name='MyPostList'
                        component={MyPostList}
                        options={{
                            headerTitle: 'My Posts',
                            // headerRight: () => <MenuIcon />
                        }}
                    />
                    <HomeStack.Screen
                        name='PostDetails'
                        component={PostDetails}
                        options={{
                            headerTitle: 'Details',
                            // headerRight: () => <MenuIcon />
                        }}
                    />
                    <HomeStack.Screen
                        name='JobOffers'
                        component={JobOffers}
                        options={{
                            headerTitle: 'Offers',
                            // headerRight: () => <MenuIcon />
                        }}
                    />
                    <HomeStack.Screen
                        name='OfferDetails'
                        component={OfferDetails}
                        options={{
                            headerTitle: 'Offers Details',
                            // headerRight: () => <MenuIcon />
                        }}
                    />
                    <HomeStack.Screen
                        name='AddJunkNavigator'
                        component={AddJunkNavigator}
                        options={{ headerShown: false }}
                    />
                    <HomeStack.Screen
                        name='ErrandNavigator'
                        component={ErrandScreenNavigator}
                        options={{ headerShown: false }}
                    />
                    <HomeStack.Screen
                        name='PaymentNavigator'
                        component={PaymentNavigator}
                    // options={{ headerRight: () => <MenuIcon /> }}
                    />
                    <HomeStack.Screen
                        name='Confirmation'
                        component={Confirmation}
                    // options={{ headerRight: () => <MenuIcon /> }}
                    />
                    <HomeStack.Screen
                        name='TrackingMap'
                        component={Map} />
                    <HomeStack.Screen
                        name='PaymentHistory'
                        component={PaymentHistoryScreenNavigator}
                        options={{
                            headerTitle: 'Payment History',
                        }}
                    />
                    <HomeStack.Screen
                        name='PaymentDetail'
                        component={PaymentDetail}
                        options={{
                            headerTitle: 'Payment Detail',
                        }}
                    />
                    <HomeStack.Screen
                        name='VerificationForm'
                        component={VerificationForm}
                        options={{
                            headerShown: false,
                        }}
                    />
                </>
            }
        </HomeStack.Navigator>
    );
};

export default HomeNavigator;
