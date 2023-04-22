import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddJunkScreen2 from '../AddJunkScreen2/AddJunkScreen2'
import AddJunkScreen3 from '../AddJunkScreen3/AddJunkScreen3'
import MenuIcon from './MenuIcon';
import AddItemScreen from '../AddItemScreen/AddItemScreen';
import Confirmation from '../ConfirmationScreen/Confirmation';
import AddJunkSummary from '../AddJunkSummary/AddJunkSummary';

const JunkScreenStack = createStackNavigator()
export default function JunkScreenNavigator() {
    return (
        <JunkScreenStack.Navigator initialRouteName='AddItemScreen' screenOptions={{
            headerShown: true,
            title: 'Junk Removal',
        }}>
            <JunkScreenStack.Screen name='AddItemScreen' component={AddItemScreen} options={{
                headerTitle: 'Page 1'
                // , headerRight: () => <MenuIcon />
            }} />
            <JunkScreenStack.Screen name='AddJunkScreen2' component={AddJunkScreen2} options={{
                headerTitle: 'Page 2',
                // headerRight: () => <MenuIcon />
            }} />
            <JunkScreenStack.Screen name='AddJunkScreen3' component={AddJunkScreen3} options={{
                headerTitle: 'Page 3',
                // headerRight: () => <MenuIcon />
            }} />
            <JunkScreenStack.Screen name='AddJunkSummary' component={AddJunkSummary} options={{
                headerTitle: 'Review',
                // headerRight: () => <MenuIcon />
            }} />
            <JunkScreenStack.Screen name='Confirmation' component={Confirmation} options={{
                headerTitle: 'Confirmation Screen',
                // headerRight: () => <MenuIcon />
            }} />
        </JunkScreenStack.Navigator>
    )
}