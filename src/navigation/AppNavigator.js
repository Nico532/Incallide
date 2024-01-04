import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Quests from '../screens/Quests';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}></Tab.Screen>
            <Tab.Screen name="Quests" component={Quests}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default AppNavigator