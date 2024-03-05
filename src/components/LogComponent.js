import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogComponent = ({ text, textColor }) => {
    // Split the text into lines
    const lines = text.split('\n');

    return (
        <View style={{ alignItems: "center" }}>
            {lines.map((line, index) => (
                <Text key={index} style={index % 2 === 0 ? styles.evenLine : { color: textColor }}>
                    {line}
                </Text>
            ))}
        </View>
    );

};

const styles = StyleSheet.create({
    evenLine: {
        color: "black", // or any color you prefer
    },
    oddLine: {
        color: 'green', // or any color you prefer
    },
});

export default LogComponent;