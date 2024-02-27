import React from 'react'
import { useRecoilState } from 'recoil'
import { recoilEnergy } from '../state/PlayerResources'
import { StyleSheet, View, Text, Button, Alert } from 'react-native'
import Quest from '../components/Quest'
import { supabase } from '../lib/supabase'



const Quests = () => {

    const [energy, setEnergy] = useRecoilState(recoilEnergy);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('player_resources')
            .select('energy')
        console.log(data)
        setEnergy(data[0].energy)
        if (error) Alert.alert(error.message)
    }

    return (
        <View style={styles.container}>
            <Text>{energy}</Text>
            <Button title="fetch" onPress={fetchData}></Button>
            <Quest type={"Strength"} level={1} energy={energy}></Quest>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})
export default Quests