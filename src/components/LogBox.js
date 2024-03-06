import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import LogComponent from './LogComponent'


const LogBox = ({ playerLog, scrollViewRef, enemyLog }) => {
    return (
        <View style={styles.logbox}>
            <ScrollView ref={scrollViewRef} style={{ flex: 1, width: "100%" }}>
                <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <LogComponent text={playerLog} textColor={"darkred"}></LogComponent>
                    </View>
                    <View style={{ width: 1, backgroundColor: "black" }}></View>
                    <View style={{ flex: 1 }}>
                        <LogComponent text={enemyLog} textColor={"green"}></LogComponent>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    logbox: {
        flex: 0.5,
        flexDirection: "row",
        width: "95%",
        height: "100%",
        margin: 10,
        padding: 5,
        backgroundColor: "grey",
        borderRadius: 10,
    },
})
export default LogBox