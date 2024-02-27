import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ActionButton from '../components/ActionButton'

const Battle = () => {
    return (
        <View style={styles.container}>
            <View style={styles.battlebox}>
                <Text>Battle</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    battlebox: {
        flex: 1.8,
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
    }
})

export default Battle