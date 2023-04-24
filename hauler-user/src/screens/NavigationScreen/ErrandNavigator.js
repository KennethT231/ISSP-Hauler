import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuIcon from './MenuIcon';
import Confirmation from '../ConfirmationScreen/Confirmation';
import ErrandPost1 from '../ErrandPost1/ErrandPost1';
import ErrandPost2 from '../ErrandPost2/ErrandPost2';
import ErrandPost3 from '../ErrandPost3/ErrandPost3';
import ErrandPost4 from '../ErrandPost4/ErrandPost4';
import ErrandSummary from '../ErrandSummary/ErrandSummary';

const ErrandScreenStack = createStackNavigator()
export default function ErrandScreenNavigator() {
    return (
        <ErrandScreenStack.Navigator initialRouteName='ErrandPost1' screenOptions={{
            headerShown: true,
            title: 'Errand Service',
        }}>
            <ErrandScreenStack.Screen name='ErrandPost1' component={ErrandPost1} options={{
                headerTitle: 'Page 1',
                // headerRight: () => <MenuIcon />
            }} />
            <ErrandScreenStack.Screen name='ErrandPost2' component={ErrandPost2} options={{
                headerTitle: 'Page 2',
                // headerRight: () => <MenuIcon />
            }} />
            <ErrandScreenStack.Screen name='ErrandPost3' component={ErrandPost3} options={{
                headerTitle: 'Page 3',
                // headerRight: () => <MenuIcon />
            }} />
            <ErrandScreenStack.Screen name='ErrandPost4' component={ErrandPost4} options={{
                headerTitle: 'Page 4',
                // headerRight: () => <MenuIcon />
            }} />
            <ErrandScreenStack.Screen name='ErrandSummary' component={ErrandSummary} options={{
                headerTitle: 'Review',
                // headerRight: () => <MenuIcon />
            }} />
            <ErrandScreenStack.Screen name='Confirmation' component={Confirmation} options={{
                headerTitle: 'Confirmation',
                // headerRight: () => <MenuIcon />
            }} />
        </ErrandScreenStack.Navigator>
    )
}