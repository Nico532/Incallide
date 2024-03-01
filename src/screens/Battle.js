import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionButton from '../components/ActionButton'
import { Ionicons } from '@expo/vector-icons'

const Battle = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerbox}>
                <Text style={{ fontSize: 20 }}>Round 0/20</Text>
            </View>
            <View style={styles.battlebox}>
                <View style={styles.playerbox}>
                    <Text>Player 1</Text>
                    <Ionicons name="person" size={24} color="black" />
                </View>
                <View style={styles.playerbox}>
                    <Text>Player 2</Text>
                    <Ionicons name="person" size={24} color="black" />
                </View>
            </View>
            <View style={styles.actionbox}>
                <View style={styles.actionbox_slice}>
                    <ActionButton action={"Up"}></ActionButton>
                </View>
                <View style={styles.actionbox_slice}>
                    <ActionButton action={"Left"}></ActionButton>
                    <ActionButton action={"Right"}></ActionButton>
                </View>

                <View style={styles.actionbox_slice}>
                    <ActionButton action={"Down"}></ActionButton>
                </View>
            </View>
            <View style={styles.logbox}>
                <Text>Test</Text>
            </View>
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
        justifyContent: "center",
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
    logbox: {
        flex: 0.5,
        width: "95%",
        margin: 10,
        padding: 10,
        backgroundColor: "grey",
        borderRadius: 10,
    },
    playerbox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Battle