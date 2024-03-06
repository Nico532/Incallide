import React from 'react'
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

const TravelArea = () => {
    const [goldEarned, setGoldEarned] = useState(0)
    const [expEarned, setExpEarned] = useState(0);
    const [isTraveling, setIsTraveling] = useState(false);

    useEffect(() => {
        let interval;

        if (isTraveling) {
            interval = setInterval(() => {
                doTravelStep();
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isTraveling]);

    const doTravelStep = async () => {
        const { data, error } = await supabase.rpc('do_travel_step', { type: 0 });
        if (data[0] === 0) {
            setGoldEarned((prevGoldEarned) => prevGoldEarned + data[1]);
            console.log("test")
        }
        else if (data[0] === 1) {
            setExpEarned((prevExpEarned) => prevExpEarned + data[1]);
            console.log("test")
        }
        else if (data[0] === -1) Alert.alert("Not enough stamina!");
        if (error) Alert.alert(error.message);
    }

    return (
        <View style={styles.container}>
            <Button title={isTraveling ? "Traveling..." : "Start"} onPress={
                () => setIsTraveling(!isTraveling)
            }></Button>
            <Text>Gold: {goldEarned}</Text>
            <Text>Exp: {expEarned}</Text>
            <Text>Monsters: </Text>
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

export default TravelArea