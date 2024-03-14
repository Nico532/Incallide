import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { supabase } from '../lib/supabase'

const MonsterComponent = ({ navigation, name = "Test", level = 0, tsid, monster_id }) => {

    const start_fight = async () => {
        const { data, error } = await supabase.rpc("start_fight", { tsid: tsid });
        console.log(data);
        if (data.code === -1) Alert.alert("A battle is already in progress...")
        if (error) console.log(error);
        return data.code;
    }

    const end_fight = async () => {
        console.log(tsid);
        const { data, error } = await supabase.rpc("end_fight", { tsid: tsid });
        console.log(data);
        if (data.code === -1) Alert.alert("Not in a battle with this monster...")
        if (error) console.log(error);
    }

    const calcEnemyData = async () => {
        const { data, error } = await supabase
            .from("players_encountered_monsters")
            .select(`
            level,
            created_at,
            monster (name, std_health, std_damage, std_armor)
            `)
            .eq('created_at', tsid)
            .limit(1);
        if (error) console.log(error);
        console.log(data);
        return data;
    }

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{"Level: " + level}</Text>
            <Button title='Fight' onPress={async () => {
                const code = await start_fight();
                const enemyData = await calcEnemyData();
                // open Fight Screen
                if (code === 1) navigation.navigate("Fight", enemyData);
            }}></Button>
            <Button title='End (temp)' onPress={end_fight}></Button>
            <Button title='Test' onPress={calcEnemyData}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderColor: "black",
        borderWidth: 2,
        width: "100%"
    }
})

export default MonsterComponent