import React from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import MonsterComponent from '../components/MonsterComponent'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

const Battle = () => {

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

    useEffect(() => {
        fetchMonsters();
    }, [])

    return (
        <ScrollView>
            {!isLoading && monsters.map(item => (
                <MonsterComponent key={item.created_at} tsid={item.created_at} level={item.level} name={item.monster.name}>
                </MonsterComponent>
            ))}
            <Button title="test" onPress={fetchMonsters}></Button>
        </ScrollView>
    )
}

export default Battle