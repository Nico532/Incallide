import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { supabase } from '../lib/supabase'

const MonsterComponent = ({ name = "Test", level = 0, tsid }) => {

    const start_fight = async () => {
        console.log(tsid);
        const { data, error } = await supabase.rpc("start_fight", { tsid: tsid });
        console.log(data);
        if (data.code === -1) Alert.alert("A battle is already in progress...")
        if (error) console.log(error);
    }

    const end_fight = async () => {
        console.log(tsid);
        const { data, error } = await supabase.rpc("end_fight", { tsid: tsid });
        console.log(data);
        if (data.code === -1) Alert.alert("Not in a battle with this monster...")
        if (error) console.log(error);
    }

    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{"Level: " + level}</Text>
            <Button title='Fight' onPress={start_fight}></Button>
            <Button title='End (temp)' onPress={end_fight}></Button>
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