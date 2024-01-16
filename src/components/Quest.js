import React from 'react'
import { StyleSheet, View, Button, Text, Alert } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const Quest = ({ energy, type, level }) => {

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('player_resources')
            .update({ energy: energy - (8 + 2 * level) })
            .eq("energy", energy)
            .select()
        console.log(data)
        if (error) Alert.alert(error.message)
    }

    return (
        <View style={styles.container}>
            <Text>{type} Gem</Text>
            <Button title={8 + 2 * level + "E"} onPress={fetchData}></Button>
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

export default Quest