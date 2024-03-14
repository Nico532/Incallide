import React from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import MonsterComponent from '../components/MonsterComponent'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'


const Battle = ({ navigation }) => {

    const [monsters, setMonsters] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchMonsters = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('players_encountered_monsters')
            .select(`
            level,
            monster_id,
            created_at,
            monster (name)
            `);
        console.log(data);
        setMonsters(data);
        if (error) Alert.alert(error.message);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [monsters])

    useFocusEffect(
        React.useCallback(() => {
            fetchMonsters();
        }, [])
    );

    return (
        <ScrollView>
            {!isLoading && monsters.map(item => (
                <MonsterComponent navigation={navigation} key={item.created_at} tsid={item.created_at} level={item.level} name={item.monster.name} monster_id={item.monster_id}>
                </MonsterComponent>
            ))}
        </ScrollView>
    )
}

export default Battle