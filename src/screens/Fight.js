import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import ActionButton from '../components/ActionButton'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'
import { useEffect, useState, useRef } from 'react'
import LogBox from '../components/LogBox'

const AttackType = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
};

const Fight = () => {

    const scrollViewRef = useRef()
    const [playerStats, setPlayerStats] = useState({
        "armor": Math.floor(4 + Math.random() * 3),
        "damage": Math.floor(8 + Math.random() * 5),
        "health": Math.floor(40 + Math.random() * 21),
    });
    const [enemyStats, setEnemyStats] = useState({
        "armor": Math.floor(4 + Math.random() * 3),
        "damage": Math.floor(8 + Math.random() * 5),
        "health": Math.floor(40 + Math.random() * 21),
    });
    const [playerLoading, setPlayerLoading] = useState(true);
    const [enemyLoading, setEnemyLoading] = useState(true);
    const [playerLog, setPlayerLog] = useState("");
    const [enemyLog, setEnemyLog] = useState("");
    const [round, setRound] = useState(1);
    const [fightDone, setFightDone] = useState(false);

    const fetchPlayerStats = async () => {
        setPlayerLoading(true)
        const { data, error } = await supabase
            .from('player_resources')
            .select('health,damage,armor');
        setPlayerStats(data[0]);
        if (error) Alert.alert(error.message);
    }
    const initRandomEnemy = () => {
        setEnemyLoading(true)
        setEnemyStats({
            "armor": Math.floor(4 + Math.random() * 3),
            "damage": Math.floor(8 + Math.random() * 5),
            "health": Math.floor(40 + Math.random() * 21),
        })
    }

    const startBattle = () => {
        fetchPlayerStats()
        initRandomEnemy()
        setPlayerLog("")
        setEnemyLog("")
        setRound(0)
        setFightDone(false)
    }

    const newRound = () => {
        setRound(round + 1)
    }

    const calculateRound = (playerAttackType) => {
        newRound();
        const attackTypes = ["Up", "Left", "Right", "Down"]
        var playerAttackModifier = 1;
        var enemyAttackModifier = 1;
        const enemyAttackType = attackTypes[Math.floor(Math.random() * 3)];
        if (playerAttackType === enemyAttackType) {
            // do nothing
        } else if (
            (playerAttackType === "Up" && enemyAttackType === "Left") ||
            (playerAttackType === "Left" && enemyAttackType === "Right") ||
            (playerAttackType === "Right" && enemyAttackType === "Up")
        ) {
            playerAttackModifier = 1.5;
            enemyAttackModifier = 0.5;
        } else {
            playerAttackModifier = 0.5;
            enemyAttackModifier = 1.5;
        }

        // Player 
        let playerDmgTaken = enemyStats.damage * enemyAttackModifier
        setPlayerLog(prevPlayerLog => prevPlayerLog + "Player used " + playerAttackType + "\n-" + playerDmgTaken + "\n");
        setPlayerStats(prevPlayerStats => ({
            ...prevPlayerStats,
            health: playerStats.health - playerDmgTaken
        }));

        // Enemy
        let enemyDmgTaken = playerStats.damage * playerAttackModifier
        setEnemyLog(prevEnemyLog => prevEnemyLog + "Enemy used " + enemyAttackType + "\n-" + enemyDmgTaken + "\n");
        setEnemyStats(prevEnemyStats => ({
            ...prevEnemyStats,
            health: enemyStats.health - enemyDmgTaken
        }));

    }

    useEffect(() => {
        setPlayerLoading(false)
        scrollViewRef.current.scrollToEnd()
        if (playerStats.health <= 0) {
            setFightDone(true)
        }
    }, [playerStats])

    useEffect(() => {
        setEnemyLoading(false)
        scrollViewRef.current.scrollToEnd()
        if (enemyStats.health <= 0) {
            setFightDone(true);
        }
    }, [enemyStats])

    useEffect(() => {
        if (fightDone) {
            if (enemyStats.health <= 0) {
                Alert.alert("Player won!")
            } else {
                Alert.alert("Enemy won!")
            }
        }
    }, [fightDone])

    useEffect(() => {
        fetchPlayerStats()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerbox}>
                <Text style={{ fontSize: 20 }}>{"Round " + round + "/20"}</Text>
                <ActionButton onPress={startBattle} action={"Start Battle"}></ActionButton>
            </View>
            <View style={styles.battlebox}>
                <View style={styles.playerbox}>
                    {!playerLoading && <Text>{playerStats["health"]}</Text>}
                    <Text>Player</Text>
                    <Ionicons name="person" size={24} color="black" />
                </View>
                <View style={styles.playerbox}>
                    {!enemyLoading && <Text>{enemyStats["health"]}</Text>}
                    <Text>Enemy</Text>
                    <Ionicons name="person" size={24} color="black" />
                </View>
            </View>
            <View style={styles.actionbox}>
                <View style={styles.actionbox_slice}>
                    <ActionButton disabled={fightDone && true} onPress={() => calculateRound(AttackType.Up)} action={"Up"}></ActionButton>
                </View>
                <View style={styles.actionbox_slice}>
                    <ActionButton disabled={fightDone && true} onPress={() => calculateRound(AttackType.Left)} action={"Left"}></ActionButton>
                    <ActionButton disabled={fightDone && true} onPress={() => calculateRound(AttackType.Right)} action={"Right"}></ActionButton>
                </View>

                <View style={styles.actionbox_slice}>
                    <ActionButton disabled={true} onPress={() => calculateRound(AttackType.Down)} action={"Down"}></ActionButton>
                </View>
            </View>
            <LogBox scrollViewRef={scrollViewRef} playerLog={playerLog} enemyLog={enemyLog}></LogBox>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    headerbox: {
        flex: 0.4,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    battlebox: {
        flex: 1.8,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "black",
        width: "100%",
        backgroundColor: "grey",
    },
    actionbox: {
        flex: 1,
        width: "100%"
    },
    actionbox_slice: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    playerbox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Fight