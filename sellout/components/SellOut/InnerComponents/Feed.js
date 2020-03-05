import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Feed = () => {
    return (
        <View style={styles.container}>
            <Text> This is the feed you will see</Text>
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
