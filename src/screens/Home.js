import React from 'react'
import { View, Button } from 'react-native'
import { supabase } from '../lib/supabase'

const Home = () => {

    async function signOut() {
        //setLoading(true)
        let { error } = await supabase.auth.signOut()

        if (error) Alert.alert(error.message)
        //setLoading(false)
    }

    return (
        <View>
            <Button title="Logout" onPress={signOut}></Button>
        </View>
    )
}

export default Home