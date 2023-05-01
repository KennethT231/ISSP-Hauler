import React, { useContext } from 'react';
import MenuIcon from '../MenuIcon/MenuIcon'
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Signin from '../../../screens/SigninScreen/Signin';
import SignUp from '../../../screens/SignUpScreen/SignUp';
import Home from '../../../screens/HomeScreen/Home';
import Verification from '../../../screens/Verification/Verification';
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
                        name='Home'
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
                </>
            }
        </HomeStack.Navigator>
    );
};

export default HomeNavigator;
