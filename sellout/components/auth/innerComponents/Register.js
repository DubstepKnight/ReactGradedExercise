import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Register = (props) => {
    return (
        <View style={styles.container}>
            <Text> Register view </Text>
            <Button title='Go to successfully registered!'
                    onPress={() => props.navigation.navigate('SuccessfulRegistration') } />
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
