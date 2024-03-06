import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AppNavigator from '../src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '../src/screens/Auth'
import { Session } from '@supabase/supabase-js';
import { supabase } from '../src/lib/supabase';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recoilEnergy, recoilStamina } from '../src/state/PlayerResources';
import { RecoilRoot } from 'recoil';

export default function SessionBase() {

    const realtime = (uid) => {
        console.log(uid)
        supabase
            .channel('player_resources')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'player_resources' }, (payload) => {
                setEnergy(payload.new.energy);
                setStamina(payload.new.stamina);
            })
            .subscribe()
    }

    const [session, setSession] = useState(null)
    const [energy, setEnergy] = useRecoilState(recoilEnergy)
    const [stamina, setStamina] = useRecoilState(recoilStamina)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    //console.log(session)
    realtime(session?.user.id)

    return (
        <NavigationContainer style={styles.container}>
            {session === null ? <Auth /> :
                <AppNavigator>
                </AppNavigator>
            }
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});