import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const ActionButton = ({ action }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text>{action}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        height: "90%",
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "black",
    }
})

export default ActionButton