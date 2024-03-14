import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Quests from '../screens/Quests';
import Battle from '../screens/Battle';
import Travel from '../screens/Travel';
import BattleTab from '../screens/BattleTab';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ session }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}></Tab.Screen>
            <Tab.Screen name="Quests" children={() => <Quests session={session}></Quests>}></Tab.Screen>
            <Tab.Screen name="BattleTab" component={BattleTab}></Tab.Screen>
            <Tab.Screen name="Travel" component={Travel}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default AppNavigator