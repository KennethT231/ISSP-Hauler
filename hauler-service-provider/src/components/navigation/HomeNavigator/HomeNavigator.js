import React, { useContext } from 'react';
import MenuIcon from '../MenuIcon/MenuIcon'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Signin from '../../../screens/SigninScreen/Signin';
import SignUp from '../../../screens/SignUpScreen/SignUp';
import Home from '../../../screens/HomeScreen/Home';
import Verification from '../../../screens/Verification/Verification';
import PaymentHistoryScreenNavigator from '../PaymentHistoryNavigator/PaymentHistoryNavigator';
import PaymentDetail from '../../../screens/PaymentHistory/PaymentDetail';
import VerificationForm from '../../../screens/SignUpScreen/VerificationForm';
import { Context } from '../../../context/ContextProvider';


const HomeStack = createStackNavigator();

const HomeNavigator = () => {
    const { currentUser } = useContext(Context)
    return (
        <HomeStack.Navigator
            initialRouteName='Signin'
            screenOptions={{
                headerShown: false,
            }}
        >
            {!currentUser ?
                <>
                    <HomeStack.Screen
                        name='Signin'
                        component={Signin}
                    // options={{ headerShown: false }}
                    />
                    <HomeStack.Screen
                        name='SignUp'
                        component={SignUp}
                        initialParams={{licenseInfo: null, backImage: null, frontImage: null}}
                    // options={{ headerShown: false }}
                    />
                    <HomeStack.Screen
                        name='Verification'
                        component={Verification}
                    // options={{ headerShown: false }}
                    />

                </>
                :
                <>
                    <HomeStack.Screen
                        name='Home1'
                        component={Home}
                    // options={
                    //     Platform.OS === 'android'
                    //         ? {
                    //             headerRight: () => <MenuIcon />,
                    //         }
                    //         : {
                    //             headerTitle: 'Home',
                    //         }
                    // }
                    />
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
