import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Login = (props) => {

    console.log("this should work now");
    console.log("Login props: ", props);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text> This is login page </Text>
                <Button title='Go to register'
                        onPress={() => props.navigation.navigate('Register')} />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {

    }
})
