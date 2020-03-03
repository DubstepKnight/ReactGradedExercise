import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SuccessfulRegistration = () => {
    return (
        <View style={styles.container}>
            <Text> You were successfully registered! </Text>
            <Text> Congratulations! </Text>
        </View>
    )
}

export default SuccessfulRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
