import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import { recoilStamina } from '../state/PlayerResources'
import { useRecoilState } from 'recoil'
import Quest from '../components/Quest'
import { supabase } from '../lib/supabase'
import TravelArea from '../components/TravelArea'

const Travel = () => {
    const [stamina, setStamina] = useRecoilState(recoilStamina);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('player_resources')
            .select('stamina')
        console.log(data)
        setStamina(data[0].stamina)
        if (error) Alert.alert(error.message)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <Text>{stamina}</Text>
            <Button title="fetch" onPress={fetchData}></Button>
            <TravelArea></TravelArea>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})
export default Travel