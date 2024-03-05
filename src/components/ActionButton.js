import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const ActionButton = ({ action, onPress, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{
            ...styles.container,
            backgroundColor: disabled ? "lightgrey" : "white",
        }}>
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