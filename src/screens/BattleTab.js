import React from 'react'
import Battle from './Battle'
import { createStackNavigator } from '@react-navigation/stack'
import Fight from './Fight';

const Stack = createStackNavigator();

const BattleTab = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Battle'>
            <Stack.Screen name="Battle" component={Battle} />
            <Stack.Screen name="Fight" component={Fight} />
        </Stack.Navigator>
    )
}

export default BattleTab